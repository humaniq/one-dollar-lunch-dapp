import { makeAutoObservable, reaction } from "mobx";
import { BaseList } from "../utils/baseList";
import {
  GetDonationsRequest,
  UserDonation,
} from "../services/apiService/requests";
import { HUMANIQ_ROUTES } from "../constants/api";
import { formatRoute } from "../utils/network";
import { getProviderStore } from "../App";

export class Donations {
  donations: BaseList<UserDonation, GetDonationsRequest>;

  init = async () => {
    this.donations = new BaseList<UserDonation, GetDonationsRequest>({
      listUrl: formatRoute(HUMANIQ_ROUTES.GET_DONATIONS, {
        wallet: getProviderStore.currentAccount,
      }),
    });

    reaction(
      () => getProviderStore.currentAccount,
      (val) => {
        if (!val) return;
        this.initList();
      }
    );

    reaction(
      () => getProviderStore.currentNetworkName,
      () => {
        this.initList();
      }
    );
    await this.initList();
  };

  initList = async () => {
    this.donations = new BaseList<UserDonation, GetDonationsRequest>({
      listUrl: formatRoute(HUMANIQ_ROUTES.GET_DONATIONS, {
        wallet: getProviderStore.currentAccount,
      }),
    });
    await this.donations.fetchList();
  };

  get total() {
    return this.donations?.other?.totals?.bnb?.count || 0;
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
