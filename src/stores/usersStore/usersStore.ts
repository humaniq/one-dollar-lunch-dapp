import { makeAutoObservable, toJS } from "mobx";
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

  selectedUsers = new Set<string>();
  multiselectMode = false;

  pending = false;

  get selectedUsersList() {
    return Array.from(toJS(this.selectedUsers));
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export const UsersStore = new Users();
