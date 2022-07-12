import React from "react";
import "./DonationList.sass";
import { t } from "i18next";
import CheckIcon from "@mui/icons-material/Check";
import colors from "utils/colors";
import { UserDonation } from "../../../services/apiService/requests";
import { DonationsStore } from "../../../App";
import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react";
import dayjs from "dayjs";

interface DonationListProps {
  onItemClick?: () => void;
}

interface DonationItemProps {
  onClick?: () => void;
  donation: UserDonation;
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

const DonationItem = ({ onClick, donation }: DonationItemProps) => {
  return (
    <div className="donation-item">
      <div className="avatar">
        <CheckIcon sx={{ fontSize: 22, color: colors.greenMile }} />
      </div>
      <div className="row">
        <div className="first">
          <span className="title">
            {" "}
            {`${donation.receiver.firstName} ${donation.receiver.lastName}`}
          </span>
          <span className="title">$1</span>
        </div>
        <div className="second">
          <span className="title">
            {dayjs(donation.donation.timeStamp).format("MMM DD h:mm A")}
          </span>
          {/*<span className="sub">Waiting for report</span>*/}
        </div>
      </div>
    </div>
  );
};

export const DonationList: React.FC<DonationListProps> = observer(
  ({ onItemClick }) => {
    return (
      <div className="donation-list-container">
        <span className="title">
          {t("donations.totalDonate", {
            0: DonationsStore.totalFiat,
          })}
        </span>
        {/*<div className="statuses">*/}
        {/*  <Status*/}
        {/*    appearance={"first"}*/}
        {/*    counter={10}*/}
        {/*    text={t("donations.reportReady")}*/}
        {/*  />*/}
        {/*  <Status*/}
        {/*    appearance={"second"}*/}
        {/*    counter={5}*/}
        {/*    text={t("donations.reportWaiting")}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="donation-list">
          {!DonationsStore?.donations?.initialized && <CircularProgress />}
          {DonationsStore?.donations?.initialized &&
            DonationsStore.donations.list.map((item, index) => (
              <DonationItem
                donation={item}
                key={`donation_item_${index}`}
                onClick={onItemClick}
              />
            ))}
        </div>
      </div>
    );
  }
);
