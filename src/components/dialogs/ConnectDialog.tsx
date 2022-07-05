import React from "react";
import { observer } from "mobx-react";
import { getProviderStore } from "App";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { t } from "i18next";
import { PROVIDERS } from "stores/providerStore";
import HumaniqLogo from "../../static/images/humaniq-logo.svg";
import WCLogo from "../../static/images/wallet-connect-logo.svg";
import Web3Logo from "../../static/images/web3-logo.svg";
import "./styles.sass";
import { Puller } from "components/puller/Puller";

export interface ConnectDialogProps {}

export const ConnectDialog: React.FC<ConnectDialogProps> = observer(() => {
  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={getProviderStore.connectDialog}
      onClose={() => (getProviderStore.connectDialog = false)}
      onOpen={getProviderStore.toggleConnectDialog}
      style={{ borderRadius: 16 }}
    >
      <Puller />
      <Box
        className={"drawer-container"}
        sx={{ width: "auto", minHeight: 300 }}
      >
        <h1 className={"tittle"}>{t("connectWalletDialog")}</h1>
        <div className={"description"}>{t("chooseConnection")}</div>
        <Stack className={"stack"}>
          <Paper
            elevation={0}
            className={"paper"}
            onClick={() => getProviderStore.setProvider(PROVIDERS.WEB3)}
          >
            <Avatar className={"avatar"}>
              <img alt={"humaniq"} src={HumaniqLogo} />
            </Avatar>
            <span>{t("humaniqName")}</span>
          </Paper>
          <Paper
            elevation={0}
            className={"paper"}
            onClick={() => getProviderStore.setProvider(PROVIDERS.WC)}
          >
            <Avatar className={"avatar"}>
              <img src={WCLogo} alt={"wallet-connect"} />
            </Avatar>
            <span>{t("walletConnectName")}</span>
          </Paper>
          <Paper
            elevation={0}
            className={"paper"}
            onClick={() => getProviderStore.setProvider(PROVIDERS.WEB3)}
          >
            <Avatar className={"avatar"}>
              <img alt={"web3"} src={Web3Logo} />
            </Avatar>
            <span>{t("web3Name")}</span>
          </Paper>
        </Stack>
        <div className={"btn-container"}>
          <Button
            onClick={getProviderStore.toggleConnectDialog}
            className={"btn"}
            variant={"text"}
          >
            {t("later")}
          </Button>
        </div>
      </Box>
    </SwipeableDrawer>
  );
});
