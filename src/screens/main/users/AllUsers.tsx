import React, { useEffect } from "react";
import "./AllUsers.sass";

interface AllUserItemProps {
  onClick?: () => void;
}

const UserItem: React.FC<AllUserItemProps> = ({ onClick }) => {
  return (
    <div className="user-item-container">
      <div className="user-item">
        <img
          className="image"
          src="https://picsum.photos/200/300"
          alt="request-image"
        />
        <span className="title">Lupita Nyong'o</span>
        <span className="description">Tanzania, Dodoma</span>
        <button onClick={onClick} className="button">
          Show more
        </button>
      </div>
    </div>
  );
};

export const AllUsers = () => {
  useEffect(() => {}, []);

  return (
    <div className="users">
      {[1, 2, 3].map((item, index) => (
        <UserItem key={`all_users_item_${index}`} />
      ))}
    </div>
  );
};
