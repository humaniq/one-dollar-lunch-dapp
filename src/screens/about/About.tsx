import React from "react";
import "./About.sass";
import { withStore } from "utils/hoc";
import { AboutViewModel } from "screens/about/AboutViewModel";
import { observer } from "mobx-react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { t } from "i18next";
import SearchIllustration from "../../static/images/illustation_search.svg";

interface AboutScreenInterface {
  store: AboutViewModel;
}

const AboutImpl: React.FC<AboutScreenInterface> = ({ store: view }) => {
  return (
    <div className="about-container">
      <IconButton
        style={{
          alignSelf: "flex-start",
          paddingTop: 16,
          paddingBottom: 16,
        }}
        onClick={() => {}}
      >
        <ArrowBackIcon sx={{ fontSize: 28, color: "#001833" }} />
      </IconButton>
      <div className="about-balance-container">
        <div className={"title"}>$0.00</div>
        <div className={"sub-title"}>{t("main.yourDonations")}</div>
      </div>
      <div className="content">
        <div className="illustration-container">
          <img className={"illustration"} src={SearchIllustration} />
          <span className={"illustration-label"}>
            {t("about.donationsAppear")}
          </span>
        </div>
      </div>
    </div>
  );
};

export const About = withStore(AboutViewModel, observer(AboutImpl));
