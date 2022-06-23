import { makeAutoObservable } from "mobx";
import { AlertStore } from "./alertStore";

export class AppStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  alert = new AlertStore();
  bottom = false;

  handleScroll = (e: any) => {
    this.bottom =
      e.target.scrollingElement.scrollHeight -
        e.target.scrollingElement.scrollTop ===
      e.target.scrollingElement.clientHeight;
  };

  init = () => {
    document.body.onscroll = this.handleScroll;
  };
}

export const app = new AppStore();
app.init();
