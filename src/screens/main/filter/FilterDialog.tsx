import React from "react";
import "./FilterDialog.sass";
import { SwipeableDrawer } from "@mui/material";
import Radio from "@mui/material/Radio";
import { withStore } from "utils/hoc";
import {
  FilterViewModel,
  RadioButtons,
} from "screens/main/filter/FilterViewModel";
import { observer } from "mobx-react";
import { t } from "i18next";

export interface FilterDialogInterface {
  store: FilterViewModel;
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const FilterDialogImpl: React.FC<FilterDialogInterface> = ({
  store: view,
  visible = false,
  onClose,
  onOpen,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    view.setSelectedIndex(parseInt(event.target.value));
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <SwipeableDrawer
      anchor={"bottom"}
      open={visible}
      onClose={onClose}
      onOpen={onOpen}
      style={{ borderRadius: 16 }}
    >
      <div className="filter-dialog">
        <span className="title">{t("filter.sortBy")}</span>
        <div className="content">
          <div className="row">
            <span className="label">{t("filter.recentlyAdded")}</span>
            <Radio
              checked={view.selectedIndex === RadioButtons.RECENTLY_ADDED}
              value={RadioButtons.RECENTLY_ADDED}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <span className="label">{t("filter.younger")}</span>
            <Radio
              checked={view.selectedIndex === RadioButtons.YOUNGER}
              value={RadioButtons.YOUNGER}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <span className="label">{t("filter.older")}</span>
            <Radio
              checked={view.selectedIndex === RadioButtons.OLDER}
              value={RadioButtons.OLDER}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export const FilterDialog = withStore(
  FilterViewModel,
  observer(FilterDialogImpl)
);
