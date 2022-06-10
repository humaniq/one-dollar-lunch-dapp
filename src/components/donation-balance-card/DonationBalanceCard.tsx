import React from "react";
import "./styles.sass";
import Lunch from "../../static/images/main-card-image.svg";
import { observer } from "mobx-react";
import { t } from "i18next";

export interface CryptoCardProps {}

export const DonationBalanceCard: React.FC<CryptoCardProps> = observer(({}) => {
  return (
    <div className={"donation-card-container"}>
      <div className={"donation-card"}>
        <div className="balance-container">
          <div className={"title"}>$0.00</div>
          <div className={"sub-title"}>{t("main.yourDonations")}</div>
        </div>
        <img className={"lunch"} src={Lunch} />
        <div className="buttons-container">
          <button className="left-button">{t("main.donateRandomly")}</button>
          <button className="right-button">{t("main.donateToChosen")}</button>
        </div>
      </div>
    </div>
  );
});
