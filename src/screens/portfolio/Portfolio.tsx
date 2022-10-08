import React, { useCallback, useEffect } from "react";
import "./Portfolio.sass";
import { withStore } from "utils/hoc";
import { PortfolioViewModel } from "screens/portfolio/PortfolioViewModel";
import { observer } from "mobx-react";
import { CircularProgress, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import colors from "utils/colors";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import { DonationList } from "screens/donations/list/DonationList";
import routes from "utils/routes";
import { toJS } from "mobx";
import Human from "../../static/images/human.svg";

interface PortfolioInterface {
  store: PortfolioViewModel;
}

const PortfolioImpl: React.FC<PortfolioInterface> = ({ store: view }) => {
  const navigate = useNavigate();
  const { uid } = useParams();
  useEffect(() => {
    view.init(uid);
    return () => view.destroy();
  }, []);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onDonationItemClick = useCallback(
    (donation) => {
      navigate(
        generatePath(routes.donationDetails.path, {
          donation: donation.donation.txHash,
        }),
        { state: toJS(donation) }
      );
    },
    [navigate]
  );

  return (
    <div className="portfolio">
      {!view.initialized && (
        <CircularProgress style={{ alignSelf: "center" }} />
      )}
      {view.initialized && (
        <>
          <IconButton
            style={{
              alignSelf: "flex-start",
              marginBottom: 16,
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
                  className={`image ${
                    !view.profile?.photoURI ? "no-image" : ""
                  }`}
                  src={view.profile?.photoURI || Human}
                />
              </div>
              <div className="second">
                <span className="title">{`${view.profile?.firstName} ${view.profile?.lastName}`}</span>
                <span className="sub">{`${view.profile?.country}, ${view.profile?.city}`}</span>
                <span className="sub">{view.profile?.birthDate}</span>
                {/*<span className="sub">Male</span>*/}
                {/*<span className="sub">Teacher</span>*/}
              </div>
            </div>
            <button onClick={() => view.onClickCard(uid)} className="button">
              {t("transaction.donate", {
                0: "$1",
              })}
            </button>
          </div>
          <div className="content">
            <DonationList source={view} onItemClick={onDonationItemClick} />
          </div>
        </>
      )}
    </div>
  );
};

export const Portfolio = withStore(PortfolioViewModel, observer(PortfolioImpl));
