import React from "react";
import "./AllUsers.sass";
import { UsersStore } from "../../../stores/usersStore";
import { observer } from "mobx-react";
import { User } from "../../../services/apiService/requests";
import { CircularProgress, IconButton } from "@mui/material";
import { CheckBox } from "../../../components/check-box/CheckBox";
import Human from "../../../static/images/human.svg";
import { generatePath, useNavigate } from "react-router-dom";
import routes from "../../../utils/routes";
import DonateImg from "../../../static/icons/ic_donate.svg";

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
  const navigation = useNavigate();
  return (
    <div className="user-item-container">
      <div className="user-item">
        <img
          onClick={() =>
            navigation(generatePath(routes.portfolio.path, { uid: user.uid }))
          }
          className={`image ${!user.photoURI ? "no-image" : ""}`}
          src={user.photoURI || Human}
          alt="request"
        />
        <div className={"data-container"}>
          <div className={"column"}>
            <span className="title">{`${user.firstName} ${user.lastName}`}</span>
            <span className="description">{`${user.country} , ${user.city}`}</span>
          </div>
          <IconButton
            disabled={multiselectMode}
            onClick={() => onClick(user.uid)}
            className={`button ${multiselectMode && "disabled"}`}
          >
            <img src={DonateImg} alt={"donate"} />
          </IconButton>
        </div>

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
