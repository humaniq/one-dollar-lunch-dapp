import { makeAutoObservable } from "mobx";
import {
  UserDonation,
  UserDonationResponse,
} from "../../services/apiService/requests";
import { ApiService } from "../../services/apiService/apiService";
import {
  API_HUMANIQ_TOKEN,
  API_HUMANIQ_URL,
  HUMANIQ_ROUTES,
} from "../../constants/api";

export class DonationDetailsViewModel {
  api: ApiService;
  userDonation: UserDonation;
  initialized = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init = async (hash: string, state?: UserDonation) => {
    if (!state?.donation || !state.receiver) {
      this.api = new ApiService();
      this.api.init(API_HUMANIQ_URL, { "x-auth-token": API_HUMANIQ_TOKEN });
      const result = await this.api.get<UserDonationResponse>(
        HUMANIQ_ROUTES.GET_DONATION_FROM_HASH,
        { hash: hash }
      );
      if (result.isOk) {
        this.userDonation = result.data.payload.records[0];
      }
    } else {
      this.userDonation = state;
    }

    console.log(this.userDonation);

    this.initialized = true;
  };
}
