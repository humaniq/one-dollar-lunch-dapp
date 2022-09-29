import { makeAutoObservable } from "mobx";
import Logcat from "../utils/logcat";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { API_FINANCE, FINANCE_ROUTES, rpc } from "../constants/api";
import { getProviderStore, transactionStore } from "../App";
import { EVM_NETWORKS, EVM_NETWORKS_NAMES } from "constants/network";
import { ethers, Signer } from "ethers";
import { ApiService } from "../services/apiService/apiService";
import { GetCoinCostResponse } from "../services/apiService/requests";
import { beautifyNumber, preciseRound } from "../utils/number";
import { CURRENCIES } from "../constants/general";

export enum PROVIDERS {
  WEB3 = "WEB3",
  WC = "WC",
}

export class ProviderStore {
  initialized = false;
  currentAccount: any = null;
  hasProvider = false;
  currentProvider: any;
  chainId: number;
  connectDialog = false;
  disconnectDialog = false;
  connectedProvider: PROVIDERS;
  currentNetworkName = EVM_NETWORKS_NAMES.BSC;
  signer: Signer;
  balance: string;
  nativePrice: number;
  notSupportedNetwork = false;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get currentNetwork() {
    return this.networks[this.currentNetworkName];
  }

  get networks() {
    return EVM_NETWORKS;
  }

  setCurrentNetwork = (network: any) => {
    this.currentNetworkName = network;
  };

  setProvider = async (type: PROVIDERS) => {
    try {
      switch (type) {
        case PROVIDERS.WC:
          const provider = new WalletConnectProvider({ rpc });
          const result = await provider.enable();
          this.currentAccount = result[0];
          this.currentProvider = new ethers.providers.Web3Provider(provider);
          await this.initProvider();
          break;
        case PROVIDERS.WEB3:
        default:
          this.currentProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );
          await this.initProvider();
          await this.connectToWeb3();
      }
      this.connectedProvider = type;
      localStorage.setItem("connected", type);
      this.connectDialog = false;
    } catch (e) {
      Logcat.error("ERROR", e);
    }
  };

  initProvider = async () => {
    if (!this.currentProvider) return;

    const { provider: ethereum } = this.currentProvider;

    ethereum.removeAllListeners && ethereum.removeAllListeners();

    ethereum.on("accountsChanged", async (accounts: any) => {
      console.log(accounts, this.currentAccount);
      this.currentAccount = accounts[0];
      await this.updateBalances();
      await transactionStore.init();
    });

    ethereum.on("disconnect", () => {
      console.info("disconnect");
      this.currentAccount = null;
      this.balance = "";
      window.location.reload();
    });

    ethereum.on("connect", async (info: any) => {
      if (parseInt(info.chainId, 16) === this.currentNetwork.chainID) return;
      console.log("connect");
      await this.updateBalances();
      await transactionStore.init();
    });

    ethereum.on("chainChanged", async (chainId: string) => {
      if (parseInt(chainId, 16) === this.chainId) return;
      this.chainId = parseInt(chainId, 16);
      await this.init();
      await transactionStore.init();
    });

    ethereum.on("message", (payload: any) => {
      console.info("message", payload);
    });
  };

  init = async () => {
    this.initialized = true;
    const provider = localStorage.getItem("connected");
    if (provider) {
      await this.setProvider(provider as PROVIDERS);
      await this.updateBalances();
    }
  };

  updateBalances = async () => {
    this.signer = this.currentProvider.getSigner();
    this.balance = (await this.signer.getBalance()).toString();
    await this.getFiatBalances();
  };

  getFiatBalances = async () => {
    const api = new ApiService();
    api.init(API_FINANCE);
    const result = await api.get<GetCoinCostResponse>(
      FINANCE_ROUTES.GET_PRICES,
      {},
      {
        params: {
          symbol: `${getProviderStore.currentNetwork.nativeSymbol}`,
          currency: "usd",
        },
      }
    );
    if (result.isOk) {
      this.nativePrice =
        result.data.payload[getProviderStore.currentNetwork.nativeSymbol][
          "usd"
        ].price;
    }
  };

  get valBalance() {
    return this.balance
      ? preciseRound(
          +ethers.utils.formatEther(
            ethers.BigNumber.from(this.balance.toString())
          )
        )
      : 0;
  }

  get fiatBalance() {
    try {
      return this.nativePrice
        ? preciseRound(this.nativePrice * this.valBalance)
        : 0;
    } catch (e) {
      return 0;
    }
  }

  get formatFiatBalance() {
    return this.fiatBalance
      ? `${beautifyNumber(+this.fiatBalance, CURRENCIES.USD)}`
      : `--/--`;
  }

  connectToWeb3 = async () => {
    try {
      const chainId = await this.currentProvider.provider.request({
        method: "eth_chainId",
      });

      const chain = Object.values(EVM_NETWORKS).find(
        (item) => item.chainID === +chainId
      );

      if (chain) {
        this.notSupportedNetwork = false;
        this.chainId = chain.chainID;
        this.currentNetworkName = chain.name;

        const accounts = await this.currentProvider.provider.request({
          method: "eth_requestAccounts",
        });

        this.currentAccount = accounts[0];
        await this.updateBalances();
      } else {
        this.chainId = +chainId;
        this.notSupportedNetwork = true;
        this.currentAccount = null;
      }
    } catch (e) {
      Logcat.info("ERROR", e);
    }
  };

  personalMessageRequest = (message: any): any => {
    if (!this.currentProvider) return null;

    return this.currentProvider.provider.request({
      method: "personal_sign",
      params: [
        `0x${Buffer.from(message, "utf-8").toString("hex")}`,
        this.currentAccount,
      ],
    });
  };

  disconnect = () => {
    this.currentAccount = null;
    this.disconnectDialog = false;
    try {
      localStorage.removeItem("connected");
      localStorage.removeItem("walletconnect");
      window.location.reload();
    } catch (e) {
      Logcat.error("ERROR", e);
    }
  };
  toggleConnectDialog = () => {
    this.connectDialog = !this.connectDialog;
  };
  toggleDisconnectDialog = () => {
    this.disconnectDialog = !this.disconnectDialog;
  };
}
