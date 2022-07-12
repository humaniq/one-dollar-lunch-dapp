import React, { useCallback } from "react";
import "./Portfolio.sass";
import { withStore } from "utils/hoc";
import { PortfolioViewModel } from "screens/portfolio/PortfolioViewModel";
import { observer } from "mobx-react";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import colors from "utils/colors";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { DonationList } from "screens/donations/list/DonationList";
import routes from "utils/routes";

const PortfolioImpl = () => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onDonationItemClick = useCallback(() => {
    navigate(routes.donationDetails.path);
  }, [navigate]);

  return (
    <div className="portfolio">
      <IconButton
        style={{
          alignSelf: "flex-start",
          paddingTop: 16,
          paddingBottom: 16,
        }}
        onClick={onBackClick}
      >
        <ClearIcon sx={{ fontSize: 28, color: colors.blueOcean }} />
      </IconButton>
      <div className="top-info-container">
        <div className="top-info">
          <div className="first">
            <img
              alt="portfolio"
              className="image"
              src="https://picsum.photos/200/300"
            />
          </div>
          <div className="second">
            <span className="title">Daudi Nelson</span>
            <span className="sub">Benin, Cotonou</span>
            <span className="sub">10 December 1992</span>
            <span className="sub">Male</span>
            <span className="sub">Teacher</span>
          </div>
        </div>
        <button onClick={() => {}} className="button">
          {t("transaction.donate", {
            0: "$1",
          })}
        </button>
      </div>
      <div className="content">
        <DonationList onItemClick={onDonationItemClick} />
      </div>
    </div>
  );
};

export const Portfolio = withStore(PortfolioViewModel, observer(PortfolioImpl));
