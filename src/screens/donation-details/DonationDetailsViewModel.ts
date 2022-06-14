import { makeAutoObservable } from "mobx";

export class DonationDetailsViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
