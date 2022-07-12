import React from "react";
import "./AllUsers.sass";
import { UsersStore } from "../../../stores/usersStore";
import { observer } from "mobx-react";
import { User } from "../../../services/apiService/requests";
import { CircularProgress } from "@mui/material";
import { t } from "i18next";
import { CheckBox } from "../../../components/check-box/CheckBox";

interface AllUserItemProps {
  onClick: (id: string) => void;
  user: User;
  checked: boolean;
  multiselectMode?: boolean;
}

const UserItem: React.FC<AllUserItemProps> = ({
  onClick,
  user,
  checked = false,
  multiselectMode,
}) => {
  return (
    <div className="user-item-container">
      <div className="user-item">
        <img className="image" src={user.photoURI} alt="request" />
        <span className="title">{`${user.firstName} ${user.lastName}`}</span>
        <span className="description">{`${user.country} , ${user.city}`}</span>
        <button
          disabled={multiselectMode}
          onClick={() => onClick(user.uid)}
          className={`button ${multiselectMode && "disabled"}`}
        >
          {t("userCard.label")}
        </button>
        {multiselectMode && (
          <CheckBox
            checked={checked}
            onChecked={() => {
              onClick(user.uid);
            }}
          />
        )}
      </div>
    </div>
  );
};

interface AllUsersProps {
  disableProgress?: boolean;
  onClick: (id: string) => void;
  multiselectMode?: boolean;
  selectedUsers?: Set<string>;
}

export const AllUsers: React.FC<AllUsersProps> = observer(
  ({
    disableProgress = false,
    onClick,
    multiselectMode = false,
    selectedUsers,
  }) => {
    return (
      <div className="users">
        {!UsersStore.users.initialized && !disableProgress && (
          <CircularProgress />
        )}
        {UsersStore.users.initialized &&
          UsersStore.users.list.map((item, index) => (
            <UserItem
              multiselectMode={multiselectMode}
              checked={
                selectedUsers?.size ? selectedUsers.has(item.uid) : false
              }
              onClick={onClick}
              user={item}
              key={`all_users_item_${index}`}
            />
          ))}
      </div>
    );
  }
);
