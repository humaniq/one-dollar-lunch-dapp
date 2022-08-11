import { makeAutoObservable, reaction } from "mobx";
import { Donation } from "../models/contracts/Donation";
import { BigNumber, ethers } from "ethers";
import { getProviderStore } from "../App";
import { currencyFormat } from "../utils/number";
import { ApiService } from "../services/apiService/apiService";
import {
  API_HUMANIQ_TOKEN,
  API_HUMANIQ_URL,
  HUMANIQ_ROUTES,
} from "../constants/api";
import { GetUsersResponse } from "../services/apiService/requests";
import { UsersStore } from "./usersStore";
import { TRANSACTION_STATUS } from "../components/transaction-message/TransactionMessage";
import { t } from "i18next";

export class Transaction {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  api = new ApiService();

  displayConfirmView = false;
  transactionDialogVisible = false;
  transactionMessageVisible = false;
  feedbackDialogVisible = false;
  transactionMessageStatus = TRANSACTION_STATUS.PENDING;
  transactionMessage = "";
  contract: Donation;
  inputFiat = true;
  symbol = getProviderStore.currentNetwork.nativeSymbol.toUpperCase();
  tokenAddress = "";
  selectedAddresses: string[] = [];
  lastVal: string;

  txData = {
    data: undefined,
    chainId: 0,
    gasLimit: 21000,
    gasPrice: "",
    nonce: 0,
    value: "0",
    to: "",
    from: "",
  };

  get donationCountPeopleTittle() {
    if (UsersStore.selectedUsers.size === 0) {
      if (this.selectedAddresses.length === 1) {
        return t("transactionDialog.randomlyLaunch");
      } else {
        return t("transactionDialog.randomlyLaunches", {
          0: this.selectedAddresses.length,
        });
      }
    } else if (UsersStore.selectedUsers.size === 1) {
      const user = UsersStore.users.list.find(
        (u) => u.uid === UsersStore.selectedUsersList[0]
      );
      if (this.selectedAddresses.length === 1) {
        return t("transactionDialog.chosenLaunchOne", {
          0: `${user?.firstName || ""} ${user?.lastName || ""}`,
        });
      } else {
        return `${t("transactionDialog.chosenLaunchOne", {
          0: `${user?.firstName || ""} ${user?.lastName || ""}`,
        })} ${t("transactionDialog.and")} ${t(
          "transactionDialog.randomlyLaunches",
          { 0: this.selectedAddresses.length - 1 }
        )}`;
      }
    } else {
      if (this.selectedAddresses.length === UsersStore.selectedUsers.size) {
        return t("transactionDialog.chosenLaunches", {
          0: UsersStore.selectedUsers.size,
        });
      } else {
        return `${t("transactionDialog.chosenLaunches", {
          0: UsersStore.selectedUsers.size,
        })} ${t("transactionDialog.and")} ${t(
          "transactionDialog.randomlyLaunches",
          { 0: this.selectedAddresses.length - UsersStore.selectedUsers.size }
        )}`;
      }
    }
  }

  setTransactionDialogVisibility = (visibility: boolean) => {
    this.transactionDialogVisible = visibility;
  };

  setFeedBackDialogVisibility = (visibility: boolean) => {
    this.feedbackDialogVisible = visibility;
  };

  init = async () => {
    this.api.init(API_HUMANIQ_URL, { "x-auth-token": API_HUMANIQ_TOKEN });

    reaction(
      () => this.transactionDialogVisible,
      async (val) => {
        if (!val) return;
        this.setValueByCountUsers();
        await this.getUsersInfo();
        await this.getTransactionData();
      }
    );

    // reaction(()=> getProviderStore.currentAccount, async (val) => {
    //   if(!val) return
    //   this.setValueByCountUsers();
    //   await this.getUsersInfo();
    //   await this.getTransactionData();
    // })

    reaction(
      () => this.txData.value,
      async (val) => {
        if (val === this.lastVal) return;
        this.lastVal = val;
        if (!this.enoughUsersForDonate) return;
        await this.getUsersInfo();
        await this.getTransactionData();
      },
      {
        scheduler: (run) => {
          setTimeout(run, 400);
        },
      }
    );
  };

  setValueByCountUsers = () => {
    this.txData.value = this.inputFiat
      ? UsersStore.selectedUsersList.length
        ? UsersStore.selectedUsersList.length.toFixed(2).toString()
        : "1"
      : UsersStore.selectedUsersList.length
      ? (UsersStore.selectedUsersList.length / getProviderStore.nativePrice)
          .toFixed(6)
          .toString()
      : (1 / getProviderStore.nativePrice).toFixed(6).toString();
  };

  getUsersInfo = async () => {
    const result = await this.api.post<GetUsersResponse>(
      HUMANIQ_ROUTES.POST_DONATE_LIST,
      {
        size: +this.countUsersForDonate,
        selected: UsersStore.selectedUsersList,
      }
    );
    if (result.isOk) {
      this.selectedAddresses = result.data.payload.map(
        (u) => u.wallet as string
      );
    }
  };

  closeDialog = () => {
    this.transactionDialogVisible = false;
    this.displayConfirmView = false;
  };

  sendTransaction = async () => {
    try {
      const { hash } = await this.contract.donateNativeMultiAddress(
        ethers.utils.parseUnits(this.parsedValue.toString(), 18).toString(),
        this.selectedAddresses
      );
      if (hash) {
        this.closeDialog();
        this.transactionMessageVisible = true;
        try {
          await this.contract.waitForTransaction(hash);
          this.setFeedBackDialogVisibility(true);
          this.transactionMessageVisible = false;
          // this.transactionMessageStatus = TRANSACTION_STATUS.SUCCESS;
        } catch (e: any) {
          this.transactionMessageStatus = TRANSACTION_STATUS.ERROR;
        }
      }
    } catch (e: any) {
      if (e.code === 4001) {
        this.transactionMessage = t("transactionMessage.denied");
      }
      this.closeDialog();
      this.transactionMessageStatus = TRANSACTION_STATUS.ERROR;
      this.transactionMessageVisible = true;
    } finally {
      setTimeout(() => {
        this.transactionMessageVisible = false;
        this.transactionMessage = "";
      }, 3000);
    }
  };

  getTransactionData = async () => {
    this.txData.chainId = getProviderStore.currentNetwork.chainID;

    try {
      this.contract = new Donation(getProviderStore.signer);
      const [nonce, gasPrice, gasLimit] = await Promise.all([
        await getProviderStore.currentProvider.getTransactionCount(
          getProviderStore.currentAccount,
          "pending"
        ),
        await getProviderStore.currentProvider.getGasPrice(),
        await this.contract.getEstimateGas(
          "DonateNativeMultiAddress",
          this.selectedAddresses,
          {
            value: ethers.utils
              .parseUnits(this.parsedValue.toString(), 18)
              .toHexString(),
          }
        ),
      ]);
      this.txData.nonce = nonce;
      this.txData.gasPrice = gasPrice;
      this.txData.gasLimit = gasLimit.toNumber();
    } catch (e) {
      console.log(e);
    }
  };

  get inputTitle() {
    return this.inputFiat ? "USD" : "BNB";
  }

  get inputPrice() {
    return this.inputFiat ? "BNB" : "USD";
  }

  setMaxValue = () => {
    this.txData.value = this.inputFiat
      ? (
          (+getProviderStore.valBalance - this.transactionFee) *
          getProviderStore.nativePrice
        )
          .toFixed(2)
          .toString()
      : (+getProviderStore.valBalance - this.transactionFee)
          .toFixed(6)
          .toString();
  };

  get enoughBalance() {
    try {
      return getProviderStore.balance
        ? BigNumber.from(getProviderStore.balance).gt(
            ethers.utils
              .parseUnits(this.parsedValue.toString(), 18)
              .add(
                BigNumber.from(
                  (this.txData.gasLimit * +this.txData.gasPrice).toString()
                )
              )
          )
        : false;
    } catch (e) {
      console.log("ERROR-enough-balance", e);
      return false;
    }
  }

  get transactionFee() {
    try {
      return +ethers.utils.formatUnits(
        (+this.txData.gasPrice * this.txData.gasLimit).toString(),
        18
      );
    } catch (e) {
      console.log("ERROR-FEE", e);
      return 0;
    }
  }

  get transactionFiatFee() {
    return this.transactionFee * this.price;
  }

  get price() {
    return getProviderStore.nativePrice;
  }

  get enoughUsersForDonate() {
    return UsersStore.selectedUsersList.length <= +this.countUsersForDonate;
  }

  get countUsersForDonate() {
    try {
      return Number(this.txData.value)
        ? this.inputFiat
          ? Number(this.txData.value).toFixed(0)
          : Number(+this.txData.value * this.price).toFixed(0)
        : 0;
    } catch (e) {
      return 0;
    }
  }

  get parsedValue() {
    try {
      return Number(this.txData.value)
        ? this.inputFiat
          ? (Number(this.txData.value) / this.price).toFixed(6).toString()
          : Number(this.txData.value).toString()
        : "0";
    } catch (e) {
      return "0";
    }
  }

  get transactionTotalAmount() {
    return this.txData.gasPrice ? +this.parsedValue + this.transactionFee : 0;
  }

  get parsedPrice() {
    try {
      return Number(this.txData.value)
        ? this.inputFiat
          ? (Number(this.txData.value) / this.price).toFixed(6).toString()
          : (Number(this.txData.value) * this.price).toFixed(2).toString()
        : "0";
    } catch (e) {
      console.log("ERROR", e);
      return "0";
    }
  }

  swapInputType() {
    this.txData.value =
      this.parsedPrice !== "0"
        ? Number(this.parsedPrice)
            .toFixed(this.inputFiat ? 6 : 2)
            .toString()
        : "";
    this.inputFiat = !this.inputFiat;
  }

  get txHumanReadable() {
    try {
      return {
        value: this.parsedValue,
        valueFiat: this.parsedValue
          ? currencyFormat(+this.parsedValue * this.price, "usd")
          : currencyFormat(0, "usd"),
        fee: this.transactionFee,
        feeFiat: currencyFormat(
          this.transactionFee * getProviderStore.nativePrice,
          "usd"
        ),
        totalFiat: currencyFormat(
          +this.parsedValue * this.price +
            this.transactionFee * getProviderStore.nativePrice,
          "usd"
        ),
        total: this.transactionTotalAmount,
      };
    } catch (e) {
      console.log("ERROR", e);
      return {};
    }
  }
}
