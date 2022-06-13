import React, { SyntheticEvent, useCallback } from "react";
import { DonationBalanceCard } from "components/donation-balance-card/DonationBalanceCard";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import "./Main.sass";
import { t } from "i18next";
import colors from "utils/colors";
import IC_SEARCH from "../../static/icons/ic_search.svg";
import IC_FILTER from "../../static/icons/ic_filter.svg";
import { HotRequests } from "screens/main/requests/HotRequests";
import { AllUsers } from "screens/main/users/AllUsers";
import { withStore } from "utils/hoc";
import { MainViewModel } from "screens/main/MainViewModel";
import { observer } from "mobx-react";
import { ConnectDialog } from "components/dialogs/ConnectDialog";
import { DisconnectDialog } from "components/dialogs/DisconnectDialog";
import { getProviderStore } from "App";
import { useNavigate } from "react-router-dom";
import routes from "utils/routes";
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

const TabPanel = (props: TabPanelInterface) => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const MainImpl: React.FC<MainScreenInterface> = ({ store: view }) => {
  const navigate = useNavigate();

  const onCardClick = useCallback(() => {
    navigate(routes.about.path);
  }, [navigate]);

  const onSearchClick = useCallback(() => {
    navigate(routes.search.path);
  }, [navigate]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    view.setSelectedTabIndex(newValue);
  };

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
      <DonationBalanceCard onClick={onCardClick} />
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
              <Tabs
                sx={{
                  ".MuiTabs-indicator": {
                    backgroundColor: colors.blueOcean,
                  },
                }}
                value={view.selectedTabIndex}
                onChange={handleChange}
              >
                <Tab
                  label={
                    <span
                      style={{
                        fontStyle: "normal",
                      }}
                    >
                      {t("main.hotRequests")}
                    </span>
                  }
                />
                <Tab label={<span>{t("main.allUsers")}</span>} />
              </Tabs>
            </Box>
            <div className="tabs-icons">
              <img
                onClick={onSearchClick}
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
          <TabPanel value={view.selectedTabIndex} index={0}>
            <div>
              {view.isFirstTabSelected && (
                <HotRequests
                  onDonateClick={() => {
                    view.setTransactionDialogVisibility(true);
                  }}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel value={view.selectedTabIndex} index={1}>
            <div>{view.isSecondTabSelected && <AllUsers />}</div>
          </TabPanel>
        </Box>
      </div>
      <ConnectDialog />
      <DisconnectDialog />
      <FilterDialog
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
