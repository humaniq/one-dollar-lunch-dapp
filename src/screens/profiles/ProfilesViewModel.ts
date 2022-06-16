import { makeAutoObservable } from "mobx";

export class ProfilesViewModel {
  profiles = [
    {
      id: 1,
      name: "Lupita Nyong'o",
      image: "https://picsum.photos/200/300",
      address: "Tanzania, Dodoma",
    },
    {
      id: 2,
      name: "Djimon Hounsou",
      image: "https://picsum.photos/200/300",
      address: "Benin, Cotonou",
    },
    {
      id: 3,
      name: "Djimon Hounsou",
      image: "https://picsum.photos/200/300",
      address: "Benin, Cotonou",
    },
    {
      id: 4,
      name: "Lupita Nyong'o",
      image: "https://picsum.photos/200/300",
      address: "Tanzania, Dodoma",
    },
  ];

  selectedProfiles: any[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get donateEnabled() {
    return this.selectedProfiles.length > 0;
  }

  get selectionCount() {
    return this.selectedProfiles.length;
  }

  handleDonateClick = () => {};

  handleSelection = (item: any, checked: boolean) => {
    if (!checked) {
      this.selectedProfiles.push(item);
    } else {
      let index = this.selectedProfiles.indexOf(item);

      if (index >= 0) {
        this.selectedProfiles.splice(index, 1);
      }
    }
  };
}
