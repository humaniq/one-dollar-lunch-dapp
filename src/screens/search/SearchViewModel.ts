import { makeAutoObservable } from "mobx";

export class SearchViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
