import React, { useCallback, useEffect } from "react";
import { withStore } from "utils/hoc";
import { DonationDetailsViewModel } from "screens/donation-details/DonationDetailsViewModel";
import { observer } from "mobx-react";
import "./DonationDetails.sass";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import colors from "utils/colors";
import { t } from "i18next";
import DonationSoup from "../../static/images/meal.svg";

import routes from "utils/routes";
import { UserDonation } from "../../services/apiService/requests";
import dayjs from "dayjs";
import { renderShortAddress } from "../../utils/address";
import { getProviderStore } from "../../App";
import { NETWORK_TYPE } from "../../constants/network";

interface DonationDetailsInterface {
  store: DonationDetailsViewModel;
}

const DonationDetailsImpl: React.FC<DonationDetailsInterface> = ({
  store: view,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    view.init(params?.donation || "", location.state as UserDonation);
  }, []);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onViewOnScanClick = useCallback(() => {
    window.location.href =
      getProviderStore.currentNetwork.env === NETWORK_TYPE.PRODUCTION
        ? `https://bscscan.com/tx/${view.userDonation.donation.txHash}`
        : `https://testnet.bscscan.com/tx/${view.userDonation.donation.txHash}`;
    // do something interesting
  }, []);

  const onPortfolioClick = useCallback(() => {
    navigate(
      generatePath(routes.portfolio.path, {
        uid: view.userDonation.receiver.uid,
      })
    );
  }, [navigate, view.userDonation]);

  return (
    <div className="donation-details">
      <IconButton
        style={{
          alignSelf: "flex-start",
          marginBottom: 16,
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
          <span className="sub">
            {dayjs(view.userDonation?.donation?.timeStamp).format(
              "MMM DD h:mm A"
            )}
          </span>
        </div>
        <div className="row">
          <span className="title">{t("donations.details.from")}</span>
          <span className="sub">
            {renderShortAddress(view.userDonation?.donation?.senderAddress)}
          </span>
        </div>
        <div className="row" onClick={onPortfolioClick}>
          <span className="title">{t("donations.details.to")}</span>
          <span className="sub link">{`${view.userDonation?.receiver?.firstName} ${view.userDonation?.receiver?.lastName}`}</span>
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
