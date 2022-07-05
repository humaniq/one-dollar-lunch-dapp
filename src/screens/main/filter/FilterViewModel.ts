import { makeAutoObservable } from "mobx";

export enum RadioButtons {
  RECENTLY_ADDED,
  YOUNGER,
  OLDER,
}

export class FilterViewModel {
  selectedIndex = -1;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSelectedIndex = (index: number) => {
    this.selectedIndex = index;
  };
}
