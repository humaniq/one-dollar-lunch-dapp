import { DonationContract } from "../abi/DonationContract";
import { getProviderStore } from "../../App";
import { Signer } from "ethers";

export class Donation {
  account: Signer;
  contract: any;

  constructor(account: Signer) {
    this.account = account;
    this.contract = DonationContract(this.account);
  }

  getEstimateGas = (method: any, ...props: any) => {
    return this.contract.estimateGas[method](...props);
  };

  waitForTransaction = (transactionHash: string) => {
    return getProviderStore.currentProvider.waitForTransaction(transactionHash);
  };

  donateNativeMultiAddress = async (amount: any, receivers: string[]) => {
    return this.contract.DonateNativeMultiAddress(receivers, { value: amount });
  };

  donateNativeSingleAddress = async (amount: string, receiver: string) => {
    return this.contract.DonateNativeSingleAddress(amount, receiver);
  };

  donateTokenMultiAddress = async (
    token: string,
    receivers: string[],
    amount: string,
    permit?: Buffer
  ) => {
    return this.contract.DonateTokenMultiAddress(
      token,
      receivers,
      amount,
      permit
    );
  };

  donateTokenSingleAddress = async (
    token: string,
    receivers: string[],
    amount: string,
    permit?: Buffer
  ) => {
    return this.contract.DonateTokenSingleAddress(
      token,
      receivers,
      amount,
      permit
    );
  };
}
