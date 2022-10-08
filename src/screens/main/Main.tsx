import React, { useEffect } from "react";
import {
  DONATION_CLICK_TYPE,
  DonationBalanceCard,
} from "components/donation-balance-card/DonationBalanceCard";
import { Box, Button, Snackbar, Tab, Tabs } from "@mui/material";
import "./Main.sass";
import { t } from "i18next";
import IC_SEARCH from "../../static/icons/ic_search.svg";
import IC_FILTER from "../../static/icons/ic_filter.svg";
import IC_CROSS from "../../static/icons/ic_cross.svg";
import { AllUsers } from "screens/main/users/AllUsers";
import { withStore } from "utils/hoc";
import { MainViewModel } from "screens/main/MainViewModel";
import { observer } from "mobx-react";
import { getProviderStore, transactionStore } from "App";
import { useNavigate } from "react-router-dom";
import { FilterDialog } from "screens/main/filter/FilterDialog";
import { UsersStore } from "../../stores/usersStore";
import { renderShortAddress } from "../../utils/address";
import { NETWORK_TYPE } from "constants/network";

interface MainScreenInterface {
  store: MainViewModel;
}

const MainImpl: React.FC<MainScreenInterface> = ({ store: view }) => {
  const navigate = useNavigate();

  useEffect(() => {
    view.init(navigate);
    return () => {
      view.destroy();
    };
  }, [navigate, view]);

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          {t("appName")}
          {getProviderStore.currentNetwork.env === NETWORK_TYPE.TEST
            ? `${t("testNet")}`
            : ""}
        </div>
        <button
          onClick={view.toggleDialogOrDisconnectWallet}
          className="wallet-connect"
        >
          {!getProviderStore.currentAccount
            ? t("connectWalletDialog")
            : renderShortAddress(getProviderStore.currentAccount)}
        </button>
      </div>
      <DonationBalanceCard onClick={view.onCardClick} />
      <div className="tabs">
        <Box sx={{ width: "100%" }}>
          <div className="tabs-header">
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
              }}
            >
              <Tabs value={view.selectedTabIndex} onChange={view.handleChange}>
                <Tab label={t("main.hotRequests")} />
                <Tab label={t("main.allUsers")} />
              </Tabs>
            </Box>
            <div className="tabs-icons">
              <img
                onClick={view.onSearchClick}
                className="search"
                src={IC_SEARCH}
                alt="search-icon"
              />
              <img
                onClick={() => view.setFilterVisibility(true)}
                className="filter"
                src={IC_FILTER}
                alt="filter-icon"
              />
            </div>
          </div>
          <AllUsers
            selectedUsers={UsersStore.selectedUsers}
            onClick={view.onClickCard}
            multiselectMode={UsersStore.multiselectMode}
          />
        </Box>
      </div>
      <Snackbar
        open={UsersStore.multiselectMode && !!UsersStore.selectedUsers.size}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div className={"bar-content"}>
          <img
            onClick={() => view.onCardClick(DONATION_CLICK_TYPE.DONATE_CHOSEN)}
            className="cross"
            src={IC_CROSS}
            alt="cross-icon"
          />
          <span className="title">
            {t("multiselectBar.title", { 0: UsersStore.selectedUsers.size })}
          </span>
          <Button
            onClick={() => {
              UsersStore.multiselectMode = false;
              transactionStore.setTransactionDialogVisibility(true);
            }}
            className={"btn-donate"}
            variant="text"
          >
            {t("multiselectBar.donate")}
          </Button>
        </div>
      </Snackbar>
      <FilterDialog
        onChange={view.changeSort}
        visible={view.filterVisible}
        onClose={() => view.setFilterVisibility(false)}
      />
    </div>
  );
};

export const Main = withStore(MainViewModel, observer(MainImpl));
