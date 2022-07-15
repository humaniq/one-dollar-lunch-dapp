import { makeAutoObservable } from "mobx";
import { ApiService } from "../../services/apiService/apiService";
import { HUMANIQ_ROUTES } from "../../constants/api";

export class PortfolioViewModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  userId = "";
  api: ApiService;

  init = async (uid: string) => {
    this.userId = uid;
    this.api = new ApiService();
    this.api.init();
    const result = this.api.get(HUMANIQ_ROUTES.GET_USERS_LIST);
    console.log(result);
  };

  get user() {
    return "";
  }
}
