import { makeAutoObservable } from "mobx";
import { transactionStore } from "../../App";

export class TransactionViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get getInputValue() {
    return transactionStore.txData.value;
  }

  get displayConfirmView() {
    return transactionStore.displayConfirmView;
  }

  closeDialog = () => {
    transactionStore.transactionDialogVisible = false;
    transactionStore.displayConfirmView = false;
  };

  get getInputFontSize() {
    return this.getInputValue.length < 8 ? "50px" : "32px";
  }
}
