import React, { useEffect } from "react";
import "./style.sass";
import { IconButton, SwipeableDrawer } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ReactComponent as MaxIcon } from "../../static/icons/ic_max.svg";
import { ReactComponent as ChangeIcon } from "../../static/icons/ic_change.svg";
import AutosizeInput from "react-input-autosize";
import BUSD from "../../static/icons/BUSD.png";
import { observer } from "mobx-react";
import { TransactionViewModel } from "./TransactionViewModel";
import { withStore } from "utils/hoc";
import { t } from "i18next";

export interface TransactionDialogInterface {
  store: TransactionViewModel;
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const TransactionDialogImpl: React.FC<TransactionDialogInterface> = ({
  visible = false,
  onClose,
  onOpen,
  store: view,
}) => {
  useEffect(() => {
    view.init();
  }, [visible, view]);

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={visible}
      onClose={onClose}
      onOpen={onOpen}
      style={{ borderRadius: 16 }}
    >
      <div className="transaction">
        <div className="header-container">
          <IconButton onClick={onClose}>
            <ArrowBackIcon sx={{ fontSize: 28, color: "#001833" }} />
          </IconButton>
        </div>
        <div className="top-component">
          <img src={BUSD} alt="logo" className="avatar" />
          <div className="content">
            <div className="title-row">
              <span className="title">Binance USD</span>
              <span className="title">$492.71</span>
            </div>
            <div className="description-row">
              <span className="description">BUSD</span>
              <span className="description">492.71</span>
            </div>
          </div>
        </div>
        <div className="input-container">
          <span className="top-title">USD</span>
          <div className="middle">
            <div className="icon-container">
              <MaxIcon width={30} height={30} />
            </div>
            <AutosizeInput
              inputMode="decimal"
              inputStyle={{
                fontSize: view.getInputFontSize,
              }}
              autoFocus
              inputClassName="input"
              placeholder="0"
              value={view.getInputValue}
              onChange={(e) => view.setInputValue(e.target.value)}
            />
            <div className="icon-container">
              <ChangeIcon width={21} height={21} />
            </div>
          </div>
          <span className="bottom-title">0 BUSD</span>
        </div>
        <span className="fee">Fee 12.10</span>
        <button className="donate-button">
          {t("transaction.donate", { 0: "12.25" })}
        </button>
      </div>
    </SwipeableDrawer>
  );
};

export const TransactionDialog = withStore(
  TransactionViewModel,
  observer(TransactionDialogImpl)
);
