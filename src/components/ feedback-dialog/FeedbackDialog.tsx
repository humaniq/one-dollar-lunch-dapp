import React from "react";
import "./style.sass";
import { Button, SwipeableDrawer } from "@mui/material";
import { observer } from "mobx-react";
import { Puller } from "components/puller/Puller";
import DonationImg from "../../static/images/donations.svg";
import { t } from "i18next";
import { transactionStore } from "../../App";

export interface FeedbackDialogInterface {
  visible: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

const FeedbackDialogImpl: React.FC<FeedbackDialogInterface> = ({
  visible = false,
  onClose,
  onOpen = () => {},
}) => {
  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={visible}
      onClose={onClose}
      onOpen={onOpen}
      style={{ borderRadius: 16 }}
    >
      <Puller />
      <div className="feedback">
        <div className="header-container"></div>
        <div className="content-container">
          <img alt="donation" src={DonationImg} className={"donation-img"} />
          <span className="tittle">{t("feedbackDialog.title")}</span>
          <span className="receivers">
            {transactionStore.donationCountPeopleTittle}
          </span>
          <span className="description">{t("feedbackDialog.description")}</span>
        </div>
        <div className={"btn-container"}>
          <Button
            variant={"text"}
            onClick={() => transactionStore.setFeedBackDialogVisibility(false)}
            className="later-button"
          >
            {t("feedbackDialog.later")}
          </Button>
          <button
            onClick={() => {
              window.location.href =
                "https://e97wndugrno.typeform.com/to/myMO3Ffr";
            }}
            className="share-button"
          >
            {t("feedbackDialog.share")}
          </button>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export const FeedbackDialog = observer(FeedbackDialogImpl);
