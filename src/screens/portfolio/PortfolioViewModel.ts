import { makeAutoObservable } from "mobx";

export class PortfolioViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
