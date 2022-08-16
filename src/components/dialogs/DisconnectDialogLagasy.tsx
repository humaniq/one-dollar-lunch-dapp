import React from "react";
import { observer } from "mobx-react";
import { Box, Button, SwipeableDrawer } from "@mui/material";
import { getProviderStore } from "App";
import { t } from "i18next";
import "./styles.sass";
import { Puller } from "components/puller/Puller";

export interface DisconnectDialogProps {}

export const DisconnectDialogLagacy: React.FC<DisconnectDialogProps> = observer(
  () => {
    return (
      <SwipeableDrawer
        anchor={"bottom"}
        open={getProviderStore.disconnectDialog}
        onClose={() => (getProviderStore.disconnectDialog = false)}
        onOpen={getProviderStore.toggleDisconnectDialog}
        style={{ borderRadius: 16 }}
      >
        <Puller />
        <Box
          className={"drawer-container"}
          sx={{ width: "auto", minHeight: 300 }}
        >
          <h1 className={"tittle"}>{t("disconnectWalletDialog")}</h1>
          <div className={"description medium"}>{t("chooseDisconnection")}</div>
          <div className={"btn-container"}>
            <Button
              onClick={getProviderStore.disconnect}
              className={"btn"}
              variant={"contained"}
            >
              {t("disconnect")}
            </Button>
            <Button
              onClick={getProviderStore.toggleDisconnectDialog}
              className={"btn"}
              variant={"text"}
            >
              {t("cancel")}
            </Button>
          </div>
        </Box>
      </SwipeableDrawer>
    );
  }
);
