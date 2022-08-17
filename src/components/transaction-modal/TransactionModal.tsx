import "./TransactionModal.style.sass";
import ConnectIllustration from "../../static/images/connect-illustration.svg";
import React, { useMemo } from "react";
import { LoaderIcon } from "components/transaction-modal/icon/LoaderIcon";
import { observer } from "mobx-react";
import { ReactComponent as CircleClose } from "../../static/icons/ic_circle_close.svg";
import { t } from "i18next";
import { transactionStore } from "App";

interface TransactionModalProps {
  visible?: boolean;
  status?: TRANSACTION_STEP;
}

export enum TRANSACTION_STATUS {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export type TRANSACTION_STEP = {
  firstStep: {
    message?: string;
    visible: boolean;
    status?: TRANSACTION_STATUS;
  };
  secondStep: {
    message?: string;
    visible: boolean;
    status?: TRANSACTION_STATUS;
  };
  errorMessage?: string;
};

export const TransactionModal = observer(
  ({
    visible = false,
    status = {} as TRANSACTION_STEP,
  }: TransactionModalProps) => {
    const showClose = useMemo(() => {
      if (
        status.firstStep.status === TRANSACTION_STATUS.SUCCESS &&
        !status.secondStep.status
      ) {
        return true;
      }

      if (
        status.firstStep.status === TRANSACTION_STATUS.SUCCESS &&
        status.secondStep.status === TRANSACTION_STATUS.SUCCESS
      ) {
        return true;
      }

      return (
        status.firstStep.status === TRANSACTION_STATUS.ERROR ||
        status.secondStep.status === TRANSACTION_STATUS.ERROR
      );
    }, [status.firstStep.status, status.secondStep.status]);

    const showError = useMemo(() => {
      return (
        status.firstStep.status === TRANSACTION_STATUS.ERROR ||
        status.secondStep.status === TRANSACTION_STATUS.ERROR
      );
    }, [status.firstStep.status, status.secondStep.status]);

    if (!visible) return null;

    return (
      <div className="transaction-modal">
        <div className="modal">
          <img
            alt="connect-illustration"
            className="image"
            src={ConnectIllustration}
          />
          <span className="title">
            {showError
              ? t("transactionMessage.wentWrong")
              : t("transactionMessage.wait")}
          </span>
          <div className="steps">
            <LoaderIcon
              isLoading={Boolean(
                status.firstStep?.status === TRANSACTION_STATUS.PENDING
              )}
              isSuccess={Boolean(
                status.firstStep?.status === TRANSACTION_STATUS.SUCCESS
              )}
              isError={Boolean(
                status.firstStep?.status === TRANSACTION_STATUS.ERROR
              )}
            />
            <span className="step">
              {t("transactionMessage.step", {
                step: 1,
              })}
            </span>
            <span className="value">
              {status.firstStep.message || t("transactionMessage.approval")}
            </span>
          </div>
          {status.secondStep.visible && (
            <div className="steps">
              <LoaderIcon
                isLoading={Boolean(
                  status.secondStep?.status === TRANSACTION_STATUS.PENDING
                )}
                isSuccess={Boolean(
                  status.secondStep?.status === TRANSACTION_STATUS.SUCCESS
                )}
                isError={Boolean(
                  status.secondStep?.status === TRANSACTION_STATUS.ERROR
                )}
              />
              <span className="step">
                {t("transactionMessage.step", {
                  step: 2,
                })}
              </span>
              <span className="value">{status.secondStep.message}</span>
            </div>
          )}
          {showClose && (
            <CircleClose
              onClick={() => {
                transactionStore.transactionMessageVisible = false;
              }}
              width={22}
              height={22}
              className="circle-close"
            />
          )}
        </div>
      </div>
    );
  }
);
