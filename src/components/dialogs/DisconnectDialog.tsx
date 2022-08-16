import React from "react";
import { observer } from "mobx-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { getProviderStore } from "../../App";
import { TransitionProps } from "@mui/material/transitions";
import { t } from "i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DisconnectDialog = observer(() => {
  return (
    <Dialog
      open={getProviderStore.disconnectDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => (getProviderStore.disconnectDialog = false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{t("disconnectWalletDialog")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {t("chooseDisconnection")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={getProviderStore.disconnect}>
          {" "}
          {t("disconnect")}
        </Button>
        <Button onClick={getProviderStore.toggleDisconnectDialog}>
          {" "}
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
