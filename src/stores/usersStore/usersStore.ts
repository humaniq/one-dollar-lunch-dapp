import { makeAutoObservable } from "mobx";
import { HUMANIQ_ROUTES } from "../../constants/api";
import { BaseList } from "../../utils/baseList";
import { GetUsersRequest, User } from "../../services/apiService/requests";

export enum TYPE_REQUEST {
  HOT_REQUEST = "HOT_REQUEST",
  ALL_USERS = "ALL_USERS",
}

export class Users {
  users = new BaseList<User, GetUsersRequest>({
    listUrl: HUMANIQ_ROUTES.GET_USERS_LIST,
  });

  pending = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export const UsersStore = new Users();
