import React from "react";
import {
  Avatar,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import "./styles.sass";
import { t } from "i18next";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

export enum TRANSACTION_STATUS {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export interface TransactionMessageProps {
  isOpen?: boolean;
  status?: TRANSACTION_STATUS;
  message?: string;
}

export const TransactionMessage: React.FC<TransactionMessageProps> = ({
  isOpen = false,
  status = TRANSACTION_STATUS.PENDING,
  message = "",
}) => {
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <SnackbarContent
        message={
          <div className={"message-content"}>
            {status === TRANSACTION_STATUS.PENDING && (
              <>
                <CircularProgress className={"progress"} />
                <div className={"message"}>
                  {message || t("transactionMessage.pending")}
                </div>
              </>
            )}
            {status === TRANSACTION_STATUS.SUCCESS && (
              <>
                <Avatar className={"progress avatar"}>
                  <CheckRoundedIcon className={"icon"} />
                </Avatar>
                <div className={"message"}>
                  {message || t("transactionMessage.success")}
                </div>
              </>
            )}
            {status === TRANSACTION_STATUS.ERROR && (
              <>
                <Avatar className={"progress avatar"}>
                  <ErrorOutlineRoundedIcon className={"icon error"} />
                </Avatar>
                <div className={"message"}>
                  {message || t("transactionMessage.error")}
                </div>
              </>
            )}
          </div>
        }
      />
    </Snackbar>
  );
};
