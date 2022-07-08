import React, { useCallback } from "react";
import { withStore } from "utils/hoc";
import { DonationDetailsViewModel } from "screens/donation-details/DonationDetailsViewModel";
import { observer } from "mobx-react";
import "./DonationDetails.sass";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import colors from "utils/colors";
import { t } from "i18next";
import DonationSoup from "../../static/images/donation-soup.svg";
import routes from "utils/routes";

interface DonationDetailsInterface {}

const DonationDetailsImpl: React.FC<DonationDetailsInterface> = () => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onViewOnScanClick = useCallback(() => {
    // do something interesting
  }, []);

  const onPortfolioClick = useCallback(() => {
    navigate(routes.portfolio.path);
  }, [navigate]);

  return (
    <div className="donation-details">
      <IconButton
        style={{
          alignSelf: "flex-start",
          paddingTop: 16,
          paddingBottom: 16,
        }}
        onClick={onBackClick}
      >
        <ClearIcon sx={{ fontSize: 28, color: colors.blueOcean }} />
      </IconButton>
      <div className="header">
        <span className="title">{t("donations.details.details")}</span>
        <span onClick={onViewOnScanClick} className="sub">
          {t("donations.details.viewOnScan", {
            0: "BSCScan",
          })}
        </span>
      </div>
      <div className="image-details-wait">
        <div className="first">
          <img alt={"soup"} className={"soup"} src={DonationSoup} />
        </div>
        <div className="second">
          <span className="title">Waiting for report</span>
        </div>
      </div>
      {/*<div className="image-details-ready">*/}
      {/*  <img src="https://picsum.photos/200/300" className="image"/>*/}
      {/*  <span className="title">Daudi Nelson  report:</span>*/}
      {/*  <span className="description">A lot of thanks, that was really delicious!</span>*/}
      {/*</div>*/}
      <div className="content">
        <div className="row">
          <span className="title">{t("donations.details.status")}</span>
          <span className="sub">Succeed</span>
        </div>
        <div className="row">
          <span className="title">{t("donations.details.date")}</span>
          <span className="sub">Sep 30 - 12:30</span>
        </div>
        <div className="row">
          <span className="title">{t("donations.details.from")}</span>
          <span className="sub">0x41...0b65</span>
        </div>
        <div className="row" onClick={onPortfolioClick}>
          <span className="title">{t("donations.details.to")}</span>
          <span className="sub">Lupita Nyong’o</span>
        </div>
        <div className="row">
          <span className="title">{t("donations.details.howMany")}</span>
          <span className="sub">1$</span>
        </div>
      </div>
    </div>
  );
};

export const DonationDetails = withStore(
  DonationDetailsViewModel,
  observer(DonationDetailsImpl)
);
