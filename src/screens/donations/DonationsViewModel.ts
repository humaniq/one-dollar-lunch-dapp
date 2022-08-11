import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { DonationsStore } from "../../App";
import { app } from "../../stores/appStore/appStore";

export class DonationsViewModel {
  initialized = false;
  firstReactionDispose: IReactionDisposer;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  destroy = () => {
    this.firstReactionDispose();
  };

  init = () => {
    this.firstReactionDispose = reaction(
      () => app.bottom,
      (val) => {
        if (!val) return;
        DonationsStore.donations.fetchList();
      }
    );
  };
}
