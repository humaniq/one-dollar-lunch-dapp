import { makeAutoObservable, toJS } from "mobx";
import { ApiService } from "../services/apiService/apiService";
import { API_HUMANIQ_TOKEN, API_HUMANIQ_URL } from "../constants/api";

export type Response<T> = {
  payload: {
    records: Array<T>;
    links: {
      next?: string;
    };
  };
};

export class BaseList<Model, Request> {
  api: ApiService;
  pageSize = 20;
  list: Array<Model> = new Array<Model>();
  pending = false;
  initialized = false;
  listUrl = "";
  next?: string;
  params: Request;

  constructor({
    baseUrl = API_HUMANIQ_URL,
    listUrl = "",
    token = API_HUMANIQ_TOKEN,
    pageSize = 20,
  }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.api = new ApiService();
    this.api.init(baseUrl, { "x-auth-token": token });
    this.listUrl = listUrl;
    this.pageSize = pageSize;
  }

  fetchList = async (params?: Request) => {
    if (params && JSON.stringify(params) !== JSON.stringify(this.params)) {
      this.params = params;
      this.initialized = false;
      this.next = "";
    }
    if (this.pending || (this.initialized && !this.next)) return;

    this.pending = true;
    const result = await this.api.get<Response<Model>>(
      this.listUrl,
      {},
      { params: this.next || { ...this.params } }
    );

    if (result.isOk) {
      if (!this.initialized) {
        this.list = result.data.payload.records || [];
      } else {
        this.list = this.list.concat(result.data.payload.records || []);
      }
      this.next = result.data.payload.links?.next;
    }
    this.initialized = true;
    this.pending = false;
  };
}
