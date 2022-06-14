import React, { useCallback } from "react";
import { withStore } from "utils/hoc";
import { DonationDetailsViewModel } from "screens/donation-details/DonationDetailsViewModel";
import { observer } from "mobx-react";
import "./DonationDetails.sass";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface DonationDetailsInterface {}

const DonationDetailsImpl: React.FC<DonationDetailsInterface> = ({}) => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="donation-details">
      <IconButton
        style={{
          alignSelf: "flex-start",
          paddingTop: 16,
          paddingBottom: 16,
        }}
        onClick={onBackClick}
      >
        <ArrowBackIcon sx={{ fontSize: 28, color: "#001833" }} />
      </IconButton>
    </div>
  );
};

export const DonationDetails = withStore(
  DonationDetailsViewModel,
  observer(DonationDetailsImpl)
);
