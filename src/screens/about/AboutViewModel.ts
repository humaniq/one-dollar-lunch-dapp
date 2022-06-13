import { makeAutoObservable } from "mobx";

export class AboutViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
