import { makeAutoObservable } from "mobx";

export class CurrencyViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
