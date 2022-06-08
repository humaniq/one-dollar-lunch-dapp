import { makeAutoObservable } from "mobx";

export class TransactionViewModel {
  inputValue = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init = () => {};

  get getInputValue() {
    return this.inputValue;
  }

  get getInputFontSize() {
    return this.getInputValue.length < 8 ? "50px" : "32px";
  }

  setInputValue = (value: string) => {
    if (!/^([0-9]+)?(\.)?([0-9]+)?$/.test(value)) {
      return;
    }

    if (this.inputValue.length === 0 && value === ".") {
      this.inputValue = "0.";
      return;
    }

    this.inputValue = value;
  };
}
