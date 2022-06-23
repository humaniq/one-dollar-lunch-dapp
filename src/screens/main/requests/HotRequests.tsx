import React, { useEffect } from "react";
import "./HotRequests.sass";
import { t } from "i18next";
import { UsersStore } from "../../../stores/usersStore/usersStore";
import { hotRequestSeed } from "../../../constants/api";
import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react";
import { User } from "../../../services/apiService/requests";
import { reaction } from "mobx";
import { app } from "../../../stores/appStore/appStore";

interface HotRequestItemProps {
  onDonateClick?: () => void;
  user: User;
}

interface HotRequestsProps {
  onDonateClick?: (item: any) => void;
}

const HotRequestItem: React.FC<HotRequestItemProps> = ({
  onDonateClick,
  user,
}) => {
  return (
    <div className="request-item-container">
      <div className="request-item">
        <img className="image" src={user.photoURI} alt="request-image" />
        <span className="title">{`${user.firstName} ${user.lastName}`}</span>
        <span className="description">{`${user.country} , ${user.city}`}</span>
        <button onClick={onDonateClick} className="button">
          {t("transaction.donate", {
            0: "$1",
          })}
        </button>
      </div>
    </div>
  );
};

export const HotRequests: React.FC<HotRequestsProps> = observer(
  ({ onDonateClick }) => {
    return (
      <div className="requests">
        {!UsersStore.users.initialized && <CircularProgress />}
        {UsersStore.users.initialized &&
          UsersStore.users.list.map((item, index) => (
            <HotRequestItem
              user={item}
              onDonateClick={() => onDonateClick?.(item)}
              key={`hot_requests_item_${index}`}
            />
          ))}
      </div>
    );
  }
);
