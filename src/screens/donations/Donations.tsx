import React, { useCallback } from "react";
import "./Donations.sass";
import { withStore } from "utils/hoc";
import { DonationsViewModel } from "screens/donations/DonationsViewModel";
import { observer } from "mobx-react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { t } from "i18next";
import SearchIllustration from "../../static/images/illustation_search.svg";
import { DonationList } from "screens/donations/list/DonationList";
import { useNavigate } from "react-router-dom";

interface DonationsScreenInterface {
  store: DonationsViewModel;
}

const DonationsImpl: React.FC<DonationsScreenInterface> = ({ store: view }) => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="donations">
      <IconButton
        style={{
          alignSelf: "flex-start",
          paddingTop: 16,
          paddingBottom: 16,
        }}
        onClick={onBackClick}
      >
        <ArrowBackIcon sx={{ fontSize: 28, color: "#001833" }} />
      </IconButton>
      <div className="donations-balance-container">
        <div className={"title"}>$0.00</div>
        <div className={"sub-title"}>{t("main.yourDonations")}</div>
      </div>
      <div className="content">
        {/*<div className="illustration-container">*/}
        {/*  <img className={"illustration"} src={SearchIllustration} />*/}
        {/*  <span className={"illustration-label"}>*/}
        {/*    {t("donations.donationsAppear")}*/}
        {/*  </span>*/}
        {/*</div>*/}
        <DonationList />
      </div>
    </div>
  );
};

export const Donations = withStore(DonationsViewModel, observer(DonationsImpl));
