import React, { useEffect } from "react";
import { DonationBalanceCard } from "components/donation-balance-card/DonationBalanceCard";
import { Box, Tab, Tabs } from "@mui/material";
import "./Main.sass";
import { t } from "i18next";
import IC_SEARCH from "../../static/icons/ic_search.svg";
import IC_FILTER from "../../static/icons/ic_filter.svg";
import { AllUsers } from "screens/main/users/AllUsers";
import { withStore } from "utils/hoc";
import { MainViewModel } from "screens/main/MainViewModel";
import { observer } from "mobx-react";
import { ConnectDialog } from "components/dialogs/ConnectDialog";
import { DisconnectDialog } from "components/dialogs/DisconnectDialog";
import { getProviderStore } from "App";
import { useNavigate } from "react-router-dom";
import { FilterDialog } from "screens/main/filter/FilterDialog";
import { TransactionDialog } from "components/transaction-dialog/TransactionDialog";

interface TabPanelInterface {
  children?: React.ReactNode;
  style?: any;
  index: number;
  value: number;
}

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
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="title">{t("appName")}</div>
        <button
          onClick={view.toggleDialogOrDisconnectWallet}
          className="wallet-connect"
        >
          {!getProviderStore.currentAccount
            ? t("connectWalletDialog")
            : t("disconnect")}
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
          <AllUsers />
        </Box>
      </div>
      <ConnectDialog />
      <DisconnectDialog />
      <FilterDialog
        onChange={view.changeSort}
        visible={view.filterVisible}
        onClose={() => view.setFilterVisibility(false)}
      />
      <TransactionDialog
        onClose={() => view.setTransactionDialogVisibility(false)}
        visible={view.transactionDialogVisible}
      />
    </div>
  );
};

export const Main = withStore(MainViewModel, observer(MainImpl));
