import React, { useEffect } from "react";
import "./HotRequests.sass";
import { t } from "i18next";

interface HotRequestItemProps {
  onDonateClick?: () => void;
}

interface HotRequestsProps {
  onDonateClick?: (item: any) => void;
}

const HotRequestItem: React.FC<HotRequestItemProps> = ({ onDonateClick }) => {
  return (
    <div className="request-item-container">
      <div className="request-item">
        <img
          className="image"
          src="https://picsum.photos/200/300"
          alt="request-image"
        />
        <span className="title">Lupita Nyong'o</span>
        <span className="description">Tanzania, Dodoma</span>
        <button onClick={onDonateClick} className="button">
          {t("transaction.donate", {
            0: "$1",
          })}
        </button>
      </div>
    </div>
  );
};

export const HotRequests: React.FC<HotRequestsProps> = ({ onDonateClick }) => {
  useEffect(() => {}, []);

  return (
    <div className="requests">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <HotRequestItem
          onDonateClick={() => onDonateClick?.(item)}
          key={`hot_requests_item_${index}`}
        />
      ))}
    </div>
  );
};
