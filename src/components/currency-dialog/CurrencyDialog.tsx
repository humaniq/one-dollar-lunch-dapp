import React from "react";
import "./CurrencyDialog.sass";
import { SwipeableDrawer } from "@mui/material";
import { CurrencyViewModel } from "components/currency-dialog/CurrencyViewModel";
import { t } from "i18next";
import { withStore } from "utils/hoc";
import { observer } from "mobx-react";
import BUSD from "static/icons/BUSD.png";
import Radio from "@mui/material/Radio";
import { CollapsibleView } from "components/collapsible/CollapsibleView";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import colors from "utils/colors";
import { EVM_NETWORKS_NAMES } from "constants/network";
import { getProviderStore } from "App";
import { toUpperCase } from "utils/textUtils";

export interface CurrencyDialogInterface {
  store: CurrencyViewModel;
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const noop = () => {};

export const Puller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 4,
  backgroundColor: colors.blueOcean,
  borderRadius: 3,
  position: "absolute",
  top: 6,
  left: "calc(50% - 15px)",
}));

const CurrencyDialogImpl = ({
  store: view,
  visible = false,
  onClose = noop,
  onOpen = noop,
}: CurrencyDialogInterface) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getProviderStore.setCurrentNetwork(event.target.value);
  };

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={visible}
      onClose={onClose}
      onOpen={onOpen}
      style={{ borderRadius: 16 }}
    >
      <Puller />
      <div className="currency-dialog">
        <span className="title">{t("currency.dialogTitle")}</span>
        <span className="sub">
          {t("currency.dialogSub", {
            0: "3",
          })}
        </span>
        <div className="content">
          <div className="row">
            <img src={BUSD} alt="logo" className="icon" />
            <div className="content-row">
              <div className="title-container">
                <span className="title-first">Binance USD</span>
                <span className="title-second">$492.71</span>
              </div>
              <div className="description-container">
                <span className="description">BUSD</span>
                <span className="description">492.71</span>
              </div>
            </div>
          </div>
        </div>
        <CollapsibleView title={t("currency.changeNetwork")}>
          <div className="network">
            <div className="row">
              <span className="label">
                {toUpperCase(EVM_NETWORKS_NAMES.BSC)}
              </span>
              <Radio
                value={EVM_NETWORKS_NAMES.BSC}
                onChange={handleChange}
                sx={{
                  padding: 0,
                }}
                checked={
                  getProviderStore.currentNetworkName === EVM_NETWORKS_NAMES.BSC
                }
              />
            </div>
            <div className="row">
              <span className="label">
                {toUpperCase(EVM_NETWORKS_NAMES.BSC_TESTNET)}
              </span>
              <Radio
                value={EVM_NETWORKS_NAMES.BSC_TESTNET}
                onChange={handleChange}
                sx={{
                  padding: 0,
                }}
                checked={
                  getProviderStore.currentNetworkName ===
                  EVM_NETWORKS_NAMES.BSC_TESTNET
                }
              />
            </div>
          </div>
        </CollapsibleView>
        <button onClick={onClose} className="maybeLater">
          {t("general.maybeLater")}
        </button>
      </div>
    </SwipeableDrawer>
  );
};

export const CurrencyDialog = withStore(
  CurrencyViewModel,
  observer(CurrencyDialogImpl)
);
