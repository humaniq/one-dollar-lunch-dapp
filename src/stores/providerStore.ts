import { makeAutoObservable } from "mobx";
import Logcat from "../utils/logcat";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { rpc } from "../constants/api";
import { getProviderStore } from "../App";
import { EVM_NETWORKS, EVM_NETWORKS_NAMES } from "constants/network";

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
  currentNetworkName = EVM_NETWORKS_NAMES.BSC_TESTNET;

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
          this.currentProvider = provider;
          await this.initProvider();
          break;
        case PROVIDERS.WEB3:
        default:
          this.currentProvider = window.ethereum;
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
    this.currentProvider.on("accountsChanged", (accounts: any) => {
      this.currentAccount = accounts[0];
    });

    this.currentProvider.on("disconnect", () => {
      Logcat.info("disconnect");
      this.currentAccount = null;
    });

    this.currentProvider.on("connect", (accounts: any) => {
      this.currentAccount = accounts[0];
    });

    this.currentProvider.on("chainChanged", (chainId: number) => {
      Logcat.log({ chainId });
      this.chainId = chainId;
    });

    this.currentProvider.on("message", (payload: any) => {
      Logcat.info("message", payload);
    });
  };

  init = async () => {
    this.initialized = true;
    const provider = localStorage.getItem("connected");
    if (provider) {
      await this.setProvider(provider as PROVIDERS);
    }
  };

  connectToWeb3 = async () => {
    try {
      const accounts = await this.currentProvider.request({
        method: "eth_requestAccounts",
      });
      this.currentAccount = accounts[0];
    } catch (e) {
      Logcat.info("ERROR", e);
    }
  };

  personalMessageRequest = (message: any): any => {
    if (!this.currentProvider) return null;

    return this.currentProvider.request({
      method: "personal_sign",
      params: [
        `0x${Buffer.from(message, "utf-8").toString("hex")}`,
        this.currentAccount,
      ],
    });
  };

  connect = async () => {
    if (!this.currentProvider || this.currentProvider?.currentAccount) return;
    try {
      const accounts = await this.currentProvider.request({
        method: "eth_requestAccounts",
      });
      this.currentAccount = accounts[0];
    } catch (e) {
      Logcat.info("ERROR", e);
    }
  };
  disconnect = () => {
    this.currentAccount = null;
    this.disconnectDialog = false;
    try {
      localStorage.removeItem("connected");
      localStorage.removeItem("walletconnect");
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

export const ETHProvider = new ProviderStore();
