import React, { useEffect, useState } from "react";
import "./DonationList.sass";
import { t } from "i18next";
import CheckIcon from "@mui/icons-material/Check";
import colors from "utils/colors";
import { UserDonation } from "../../../services/apiService/requests";
import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react";
import dayjs from "dayjs";
import { renderShortAddress } from "../../../utils/address";

interface DonationListProps {
  onItemClick: (item: UserDonation) => void;
  source?: any;
}

interface DonationItemProps {
  onClick: (item: UserDonation) => void;
  source?: any;
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

const DonationItem = ({ onClick, donation, source }: DonationItemProps) => {
  const [donationTittle, setTittle] = useState("");

  useEffect(() => {
    setTittle(
      donation?.receiver
        ? `${donation?.receiver?.firstName} ${donation?.receiver?.lastName}`
        : renderShortAddress(donation?.donation?.senderAddress)
    );
  }, [donation, source]);

  return (
    <div className="donation-item" onClick={() => onClick(donation)}>
      <div className="avatar">
        <CheckIcon sx={{ fontSize: 22, color: colors.greenMile }} />
      </div>
      <div className="row">
        <div className="first">
          <span className="title"> {donationTittle}</span>
          <span className="title">$1</span>
        </div>
        <div className="second">
          <span className="title">
            {dayjs(donation?.donation?.timeStamp).format("MMM DD h:mm A")}
          </span>
          {/*<span className="sub">Waiting for report</span>*/}
        </div>
      </div>
    </div>
  );
};

export const DonationList: React.FC<DonationListProps> = observer(
  ({ onItemClick, source }) => {
    return (
      <div className="donation-list-container">
        <span className="title">
          {t("donations.totalDonate", {
            0: source.total,
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
          {!source?.donations?.initialized && <CircularProgress />}
          {source?.donations?.initialized &&
            source.donations.list.map((item: UserDonation, index: any) => (
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
