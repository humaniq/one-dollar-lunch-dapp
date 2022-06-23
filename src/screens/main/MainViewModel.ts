import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { getProviderStore } from "App";
import { UsersStore } from "../../stores/usersStore/usersStore";
import { app } from "../../stores/appStore/appStore";
import { NavigateFunction } from "react-router-dom";
import { DONATION_CLICK_TYPE } from "../../components/donation-balance-card/DonationBalanceCard";
import routes from "../../utils/routes";
import { SyntheticEvent } from "react";

export enum SORT {
  NAME = "name",
  AGE = "age",
  ADDED_AT = "added_at",
}

export enum ORDER {
  DESC = "desc",
  ASC = "asc",
}

export class MainViewModel {
  transactionDialogVisible = false;
  filterVisible = false;
  selectedTabIndex = 0;
  sort: SORT;
  order: ORDER;
  search: "";
  navigate: NavigateFunction;
  firstReactionDispose: IReactionDisposer;
  secondReactionDispose: IReactionDisposer;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  destroy = () => {
    this.firstReactionDispose();
    this.secondReactionDispose();
  };

  init = (nav: NavigateFunction) => {
    this.navigate = nav;

    UsersStore.users.fetchList({ ...this.filter });

    this.firstReactionDispose = reaction(
      () => app.bottom,
      (val) => {
        if (!val) return;
        UsersStore.users.fetchList({ ...this.filter });
      }
    );

    this.secondReactionDispose = reaction(
      () => this.filter,
      (val) => {
        if (!Object.values(val).length) return;
        UsersStore.users.fetchList({ ...this.filter });
      }
    );
  };

  get filter() {
    const filter = {};
    if (this.sort) {
      Object.assign(filter, { sort: this.sort });
    }
    if (this.order) {
      Object.assign(filter, { order: this.order });
    }
    if (this.search) {
      Object.assign(filter, { search: this.search });
    }
    Object.assign(filter, this.filterHotRequest);
    return filter;
  }

  changeSort = (index: number) => {
    switch (index) {
      case 0:
        this.sort = SORT.ADDED_AT;
        this.order = ORDER.DESC;
        break;
      case 1:
        this.sort = SORT.AGE;
        this.order = ORDER.DESC;
        break;
      case 2:
        this.sort = SORT.AGE;
        this.order = ORDER.ASC;
        break;
    }
    this.filterVisible = false;
  };

  get filterHotRequest() {
    return { filter_hot_request: this.isFirstTabSelected };
  }

  get isFirstTabSelected() {
    return this.selectedTabIndex === 0;
  }

  get isSecondTabSelected() {
    return this.selectedTabIndex === 1;
  }

  setTransactionDialogVisibility = (visibility: boolean) => {
    this.transactionDialogVisible = visibility;
  };

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

  onCardClick = (type?: DONATION_CLICK_TYPE) => {
    if (type === DONATION_CLICK_TYPE.DEFAULT) {
      this.navigate(routes.donations.path);
    } else if (type === DONATION_CLICK_TYPE.DONATE_RANDOMLY) {
    } else {
      this.navigate(routes.profiles.path);
    }
  };

  onSearchClick = () => {
    this.navigate(routes.search.path);
  };
  handleChange = (event: SyntheticEvent, newValue: number) => {
    this.setSelectedTabIndex(newValue);
  };
}
