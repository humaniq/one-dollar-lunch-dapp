import React from "react";
import "./FilterDialog.sass";
import { FormControlLabel, SwipeableDrawer } from "@mui/material";
import Radio from "@mui/material/Radio";
import { withStore } from "utils/hoc";
import {
  FilterViewModel,
  RadioButtons,
} from "screens/main/filter/FilterViewModel";
import { observer } from "mobx-react";
import { t } from "i18next";
import { Puller } from "components/puller/Puller";

export interface FilterDialogInterface {
  store: FilterViewModel;
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
  onChange: (index: number) => void;
}

const FilterDialogImpl: React.FC<FilterDialogInterface> = ({
  store: view,
  visible = false,
  onClose,
  onOpen = () => {},
  onChange = () => {},
}) => {
  const handleChange = (event: any) => {
    view.setSelectedIndex(parseInt(event.target.value));
    onChange(parseInt(event.target.value));
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
      <Puller />
      <div className="filter-dialog">
        <span className="title">{t("filter.sortBy")}</span>
        <div className="content">
          <div className="row">
            <FormControlLabel
              sx={{
                padding: 0,
                margin: 0,
              }}
              value={RadioButtons.RECENTLY_ADDED}
              checked={view.selectedIndex === RadioButtons.RECENTLY_ADDED}
              onChange={handleChange}
              control={<Radio />}
              label={<span className="label">{t("filter.recentlyAdded")}</span>}
            />
          </div>
          <div className="row">
            <FormControlLabel
              sx={{
                padding: 0,
                margin: 0,
              }}
              value={RadioButtons.YOUNGER}
              checked={view.selectedIndex === RadioButtons.YOUNGER}
              onChange={handleChange}
              control={<Radio />}
              label={<span className="label">{t("filter.younger")}</span>}
            />
          </div>
          <div className="row">
            <FormControlLabel
              sx={{
                padding: 0,
                margin: 0,
              }}
              value={RadioButtons.OLDER}
              checked={view.selectedIndex === RadioButtons.OLDER}
              onChange={handleChange}
              control={<Radio />}
              label={<span className="label">{t("filter.older")}</span>}
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
