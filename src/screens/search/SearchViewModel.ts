import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { UsersStore } from "../../stores/usersStore/usersStore";
import { app } from "../../stores/appStore/appStore";

export class SearchViewModel {
  navigate: NavigateFunction;
  search: "";
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
    UsersStore.users.list = [];
    this.firstReactionDispose = reaction(
      () => this.search,
      (val: string) => {
        if (val && val.length % 3 === 0) {
          UsersStore.users.fetchList(this.filter);
        }
      }
    );

    this.secondReactionDispose = reaction(
      () => app.bottom,
      (val) => {
        if (!val) return;
        UsersStore.users.fetchList(this.filter);
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

  onClickUser = (id: string) => {};
}
