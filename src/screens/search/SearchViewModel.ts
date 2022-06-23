import { makeAutoObservable, reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { UsersStore } from "../../stores/usersStore/usersStore";
import { app } from "../../stores/appStore/appStore";

export class SearchViewModel {
  navigate: NavigateFunction;
  search: "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init = (nav: NavigateFunction) => {
    this.navigate = nav;
    UsersStore.users.list = [];
    reaction(
      () => this.search,
      (val: string) => {
        if (val && val.length % 3 === 0) {
          UsersStore.users.fetchList(this.filter);
        }
      }
    );

    reaction(
      () => app.bottom,
      (val) => {
        if (!val) return;
        UsersStore.users.fetchList({ ...this.filter });
      }
    );
  };

  get filter() {
    return { search: this.search };
  }

  onBackClick = () => {
    this.search = "";
    this.navigate(-1);
  };
  onSearch = (val: any) => {
    this.search = val.target.value;
  };
}
