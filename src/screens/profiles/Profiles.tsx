import React, { useCallback } from "react";
import { withStore } from "utils/hoc";
import { ProfilesViewModel } from "screens/profiles/ProfilesViewModel";
import { observer } from "mobx-react";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import colors from "utils/colors";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import "./Profiles.sass";
import { CheckBox } from "components/check-box/CheckBox";

interface ProfilesScreenInterface {
  store: ProfilesViewModel;
}

const ProfilesImpl: React.FC<ProfilesScreenInterface> = ({ store: view }) => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    if (view.selectionModeActive) {
      view.clearSelections();
    } else {
      navigate(-1);
    }
  }, [navigate, view]);

  return (
    <div className="profiles">
      <div className="header">
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
        <span className="title">
          {t("profiles.selected", {
            0: view.selectionCount,
          })}
        </span>
        <button
          onClick={view.handleDonateClick}
          disabled={!view.donateEnabled}
          className="donate"
        >
          {t("profiles.donate")}
        </button>
      </div>
      <div className="content">
        <div className="users">
          {view.profiles.map((item, index) => (
            <div
              className="item-container"
              key={`selection_profile_${item.id}`}
            >
              <div className="item">
                <img className="image" src={item.image} alt="avatar" />
                <span className="title">{item.name}</span>
                <span className="description">{item.address}</span>
                <button onClick={() => {}} className="button">
                  {t("transaction.donate", {
                    0: "$1",
                  })}
                </button>
                <CheckBox
                  onChecked={(checked: boolean) => {
                    view.handleSelection(item, checked);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Profiles = withStore(ProfilesViewModel, observer(ProfilesImpl));
