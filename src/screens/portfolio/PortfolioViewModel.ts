import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { HUMANIQ_ROUTES } from "../../constants/api";
import {
  GetDonationsRequest,
  User,
  UserDonation,
} from "../../services/apiService/requests";
import { BaseList } from "../../utils/baseList";
import { formatRoute } from "../../utils/network";
import { getProviderStore, transactionStore } from "../../App";
import { UsersStore } from "../../stores/usersStore";
import { app } from "../../stores/appStore/appStore";

export class PortfolioViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  donations: BaseList<UserDonation, GetDonationsRequest>;
  userId = "";
  firstReactionDispose: IReactionDisposer;

  destroy = () => {
    this.firstReactionDispose();
  };

  init = async (uid: string = "") => {
    this.userId = uid;

    this.firstReactionDispose = reaction(
      () => app.bottom,
      (val) => {
        if (!val) return;
        this.donations.fetchList();
      }
    );

    await this.initList();
  };

  initList = async () => {
    this.donations = new BaseList<UserDonation, GetDonationsRequest>({
      listUrl: formatRoute(HUMANIQ_ROUTES.GET_DONATIONS_FROM_UID, {
        uid: this.userId,
      }),
    });
    await this.donations.fetchList();
  };

  get profile(): User {
    return this.donations?.other?.profile;
  }

  get total() {
    return this.donations?.other?.totals?.bnb?.count || 0;
  }

  get initialized() {
    return this?.donations?.initialized;
  }

  onClickCard = (userId?: string) => {
    if (!getProviderStore.currentAccount)
      return (getProviderStore.connectDialog = !getProviderStore.connectDialog);
    if (UsersStore.multiselectMode) {
      userId && UsersStore.selectedUsers.add(userId);
    } else {
      UsersStore.selectedUsers.clear();
      userId && UsersStore.selectedUsers.add(userId);
      transactionStore.setTransactionDialogVisibility(true);
    }
  };
}
