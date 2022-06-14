import { makeAutoObservable } from "mobx";

export class DonationsViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
