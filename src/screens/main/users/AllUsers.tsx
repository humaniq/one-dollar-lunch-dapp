import React from "react";
import "./AllUsers.sass";
import { UsersStore } from "../../../stores/usersStore/usersStore";
import { observer } from "mobx-react";
import { User } from "../../../services/apiService/requests";
import { CircularProgress } from "@mui/material";

interface AllUsersProps {
  disableProgress?: boolean;
}

interface AllUserItemProps {
  onClick?: () => void;
  user: User;
}

const UserItem: React.FC<AllUserItemProps> = ({ onClick, user }) => {
  return (
    <div className="user-item-container">
      <div className="user-item">
        <img className="image" src={user.photoURI} alt="request-image" />
        <span className="title">{`${user.firstName} ${user.lastName}`}</span>
        <span className="description">{`${user.country} , ${user.city}`}</span>
        <button onClick={onClick} className="button">
          Show more
        </button>
      </div>
    </div>
  );
};

export const AllUsers: React.FC<AllUsersProps> = observer(
  ({ disableProgress = false }) => {
    return (
      <div className="users">
        {!UsersStore.users.initialized && !disableProgress && (
          <CircularProgress />
        )}
        {UsersStore.users.initialized &&
          UsersStore.users.list.map((item, index) => (
            <UserItem user={item} key={`all_users_item_${index}`} />
          ))}
      </div>
    );
  }
);
