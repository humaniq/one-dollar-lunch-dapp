import React, { useState, SyntheticEvent } from "react";
import { DonationBalanceCard } from "components/donation-balance-card/DonationBalanceCard";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import "./Main.sass";
import { t } from "i18next";
import colors from "utils/colors";
import IC_SEARCH from "../../static/icons/ic_search.svg";
import IC_FILTER from "../../static/icons/ic_filter.svg";
import { HotRequests } from "screens/main/requests/HotRequests";
import { AllUsers } from "screens/main/users/AllUsers";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const Main = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">1$ for lunch</div>
        <button className="wallet-connect">{t("connectWalletDialog")}</button>
      </div>
      <DonationBalanceCard />
      <div className="tabs">
        <Box sx={{ width: "100%" }}>
          <div className="tabs-header">
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                sx={{
                  ".MuiTabs-indicator": {
                    backgroundColor: colors.blueOcean,
                  },
                }}
                value={value}
                onChange={handleChange}
              >
                <Tab label={<div>{t("main.hotRequests")}</div>} />
                <Tab label={<div>{t("main.allUsers")}</div>} />
              </Tabs>
            </Box>
            <div className="tabs-icons">
              <img className="search" src={IC_SEARCH} alt="search-icon" />
              <img className="filter" src={IC_FILTER} alt="filter-icon" />
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <div>{value === 0 && <HotRequests />}</div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>{value === 1 && <AllUsers />}</div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};
