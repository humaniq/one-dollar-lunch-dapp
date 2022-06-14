import React from "react";
import "./DonationList.sass";
import { t } from "i18next";
import CheckIcon from "@mui/icons-material/Check";
import colors from "utils/colors";

interface DonationListInterface {}

interface DonationItemInterface {
  onClick?: () => void;
}

interface StatusInterface {
  counter?: number;
  text?: string;
  appearance?: string;
}

const Status = ({ counter = 0, text, appearance = "" }: StatusInterface) => {
  return (
    <div className={`status ${appearance}`}>
      <span className={`counter ${appearance}`}>{counter}</span>
      <span className={`title ${appearance}`}>{text}</span>
    </div>
  );
};

const DonationItem = ({ onClick }: DonationItemInterface) => {
  return (
    <div className="donation-item" onClick={onClick}>
      <div className="avatar">
        <CheckIcon sx={{ fontSize: 22, color: colors.greenMile }} />
      </div>
      <div className="row">
        <div className="first">
          <span className="title">Lupita Nyong’o</span>
          <span className="title">$1</span>
        </div>
        <div className="second">
          <span className="title">Sep 30 - 12:30 pm</span>
          <span className="sub">Waiting for report</span>
        </div>
      </div>
    </div>
  );
};

export const DonationList: React.FC<DonationListInterface> = ({}) => {
  return (
    <div className="donation-list-container">
      <span className="title">
        {t("donations.totalDonate", {
          0: "9",
        })}
      </span>
      <div className="statuses">
        <Status
          appearance={"first"}
          counter={10}
          text={t("donations.statusReady")}
        />
        <Status
          appearance={"second"}
          counter={5}
          text={t("donations.statusWaiting")}
        />
      </div>
      <div className="donation-list">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <DonationItem key={`donation_item_${index}`} />
        ))}
      </div>
    </div>
  );
};
