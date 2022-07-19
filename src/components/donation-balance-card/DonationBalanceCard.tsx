import React from "react";
import "./styles.sass";
import Lunch from "../../static/images/main-card-image.svg";
import Soup from "../../static/images/soup.svg";
import { observer } from "mobx-react";
import { t } from "i18next";
import { DonationsStore } from "../../App";
import { currencyFormat } from "../../utils/number";
import { CURRENCIES } from "../../constants/general";

export enum DONATION_CLICK_TYPE {
  DEFAULT,
  DONATE_RANDOMLY,
  DONATE_CHOSEN,
}

export interface CryptoCardProps {
  onClick?: (type?: DONATION_CLICK_TYPE) => void;
}

export const DonationBalanceCard: React.FC<CryptoCardProps> = observer(
  ({ onClick }) => {
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(DONATION_CLICK_TYPE.DEFAULT);
        }}
        className={"donation-card-container"}
      >
        <div className={"donation-card"}>
          <div className="balance-container">
            <div className={"title"}>
              {currencyFormat(DonationsStore.total, CURRENCIES.USD)}
            </div>
            <div className={"sub-title"}>{t("main.yourDonations")}</div>
          </div>
          <img alt={"lunch"} className={"lunch"} src={Soup} />
          <div className="buttons-container">
            <button
              onClick={(event) => {
                event.stopPropagation();
                onClick?.(DONATION_CLICK_TYPE.DONATE_RANDOMLY);
              }}
              className="left-button"
            >
              {t("main.donateRandomly")}
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onClick?.(DONATION_CLICK_TYPE.DONATE_CHOSEN);
              }}
              className="right-button"
            >
              {t("main.donateToChosen")}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
