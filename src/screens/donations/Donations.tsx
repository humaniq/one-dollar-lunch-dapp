import React, { useCallback, useEffect } from "react";
import "./Donations.sass";
import { withStore } from "utils/hoc";
import { DonationsViewModel } from "screens/donations/DonationsViewModel";
import { observer } from "mobx-react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { t } from "i18next";
import { DonationList } from "screens/donations/list/DonationList";
import { useNavigate } from "react-router-dom";
import routes from "utils/routes";
import colors from "utils/colors";
import { DonationsStore } from "../../App";
import { currencyFormat } from "../../utils/number";
import { CURRENCIES } from "../../constants/general";

interface DonationsScreenInterface {
  store: DonationsViewModel;
}

const DonationsImpl: React.FC<DonationsScreenInterface> = ({ store: view }) => {
  const navigate = useNavigate();

  useEffect(() => {
    view.init();
    return () => view.destroy();
  });

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onDonationItemClick = useCallback(
    (donation) => {
      navigate(routes.donationDetails.path, { state: { donation } });
    },
    [navigate]
  );

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
        <ArrowBackIcon sx={{ fontSize: 28, color: colors.blueOcean }} />
      </IconButton>
      <div className="donations-balance-container">
        <div className={"title"}>
          {currencyFormat(DonationsStore.total, CURRENCIES.USD)}
        </div>
        <div className={"sub-title"}>{t("main.yourDonations")}</div>
      </div>
      <div className="content">
        {/*<div className="illustration-container">*/}
        {/*  <img className={"illustration"} src={SearchIllustration} />*/}
        {/*  <span className={"illustration-label"}>*/}
        {/*    {t("donations.donationsAppear")}*/}
        {/*  </span>*/}
        {/*</div>*/}
        <DonationList
          source={DonationsStore}
          onItemClick={onDonationItemClick}
        />
      </div>
    </div>
  );
};

export const Donations = withStore(DonationsViewModel, observer(DonationsImpl));
