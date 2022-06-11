import { makeAutoObservable } from "mobx";
import { getProviderStore } from "App";

export class MainViewModel {
  filterVisible = false;
  selectedTabIndex = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isFirstTabSelected() {
    return this.selectedTabIndex === 0;
  }

  get isSecondTabSelected() {
    return this.selectedTabIndex === 1;
  }

  setFilterVisibility = (visibility: boolean) => {
    this.filterVisible = visibility;
  };

  setSelectedTabIndex = (index: number) => {
    this.selectedTabIndex = index;
  };

  toggleDialogOrDisconnectWallet = () => {
    if (!getProviderStore.currentAccount) {
      getProviderStore.connectDialog = !getProviderStore.connectDialog;
    } else {
      getProviderStore.toggleDisconnectDialog();
    }
  };
}
