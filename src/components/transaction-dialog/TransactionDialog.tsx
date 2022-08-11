import React, { useEffect } from "react";
import "./style.sass";
import { Avatar, Button, IconButton, SwipeableDrawer } from "@mui/material";
import ArrowBackIcon from " ../../static/icons/ic_back.svg";
import { ReactComponent as MaxIcon } from "../../static/icons/ic_max.svg";
import { ReactComponent as ChangeIcon } from "../../static/icons/ic_change.svg";
import AutosizeInput from "react-input-autosize";
import BNB from "../../static/icons/BNB.png";
import Wallet from "../../static/images/wallet.svg";
import { observer } from "mobx-react";
import { TransactionViewModel } from "./TransactionViewModel";
import { withStore } from "utils/hoc";
import { t } from "i18next";
import { getProviderStore, transactionStore } from "../../App";
import { currencyFormat } from "../../utils/number";
import { renderShortAddress } from "../../utils/address";
import { Puller } from "components/puller/Puller";

export interface TransactionDialogInterface {
  store: TransactionViewModel;
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const TransactionDialogImpl: React.FC<TransactionDialogInterface> = ({
  visible = false,
  onClose,
  onOpen = () => {},
  store: view,
}) => {
  useEffect(() => {
    transactionStore.init();
  }, [visible, view]);

  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={visible}
      onClose={onClose}
      onOpen={onOpen}
      style={{ borderRadius: 16 }}
    >
      <Puller />
      <div className="transaction">
        <div className="header-container">
          {!view.displayConfirmView ? (
            <IconButton onClick={onClose}>
              <img src={ArrowBackIcon} alt={"back"} />
            </IconButton>
          ) : (
            <div className={"flex"}>
              <span>{t("transactionDialog.title")}</span>
            </div>
          )}
        </div>
        {!view.displayConfirmView ? (
          <div className="top-component">
            <img src={BNB} alt="logo" className="avatar" />
            <div className="content">
              <div className="title-row">
                <span className="title">Binance Coin</span>
                <span className="title">
                  {getProviderStore.formatFiatBalance}
                </span>
              </div>
              <div className="description-row">
                <span className="description">BNB</span>
                <span className="description">
                  {getProviderStore.valBalance}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="top-component">
            <Avatar className={"avatar-wallet"}>
              <img
                className={"avatar-wallet-image"}
                src={Wallet}
                alt={"wallet"}
              />
            </Avatar>
            <div className="content">
              <div className="title-row center">
                <span className="title">
                  {renderShortAddress(getProviderStore.currentAccount)}
                </span>
                <div className={"col"}>
                  <span className="title">
                    {getProviderStore.formatFiatBalance}
                  </span>
                  <span className="description">{`BNB ${getProviderStore.valBalance}`}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {view.displayConfirmView ? (
          <>
            <span className={"card-title"}>
              {t("transactionDialog.howMany")}
            </span>
            <div className="top-component col">
              <div className="content">
                <div className="title-row center">
                  <span className="title">{t("transactionDialog.amount")}</span>
                  <div className={"col"}>
                    <span className="title">
                      {transactionStore.txHumanReadable.valueFiat}
                    </span>
                    <span className="description">{`${transactionStore.txHumanReadable.value} BNB`}</span>
                  </div>
                </div>
              </div>
              <div className={"divider"} />
              <div className="content">
                <div className="title-row center">
                  <span className="title">
                    {t("transactionDialog.suggestedFee")}
                  </span>
                  <div className={"col"}>
                    <span className="title">
                      {transactionStore.txHumanReadable.feeFiat}
                    </span>
                    <span className="description">{`${transactionStore.txHumanReadable.fee} BNB`}</span>
                  </div>
                </div>
              </div>
              <div className={"divider"} />
              <div className="content">
                <div className="title-row center">
                  <span className="title">{t("transactionDialog.total")}</span>
                  <div className={"col"}>
                    <span className="title">
                      {transactionStore.txHumanReadable.totalFiat}
                    </span>
                    <span className="description">{`${transactionStore.txHumanReadable.total} BNB`}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant={"text"}
              onClick={view.closeDialog}
              className="later-button"
              disabled={
                !transactionStore.enoughBalance ||
                !transactionStore.enoughUsersForDonate
              }
            >
              {t("transactionDialog.later", {
                0: transactionStore.txData.value,
              })}
            </Button>
            <button
              onClick={transactionStore.sendTransaction}
              className="donate-button"
              disabled={
                !transactionStore.enoughBalance ||
                !transactionStore.enoughUsersForDonate
              }
            >
              {t("transactionDialog.allow", {
                0: transactionStore.txData.value,
              })}
            </button>
          </>
        ) : (
          <>
            <div className="input-container">
              <span className="top-title">{transactionStore.inputTitle}</span>
              <div className="middle">
                <div
                  className="icon-container"
                  onClick={transactionStore.setMaxValue}
                >
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
                  value={transactionStore.txData.value}
                  onChange={(e) =>
                    (transactionStore.txData.value = e.target.value)
                  }
                />
                <div
                  className="icon-container"
                  onClick={transactionStore.swapInputType}
                >
                  <ChangeIcon width={21} height={21} />
                </div>
              </div>
              <span className="bottom-title">{`${transactionStore.parsedPrice} ${transactionStore.inputPrice}`}</span>
            </div>
            <span className="fee">{` ${t("transaction.fee")} ${currencyFormat(
              transactionStore.transactionFiatFee,
              "usd"
            )}`}</span>
            <span className={"users-counter-title"}>
              {" "}
              {transactionStore.donationCountPeopleTittle}
            </span>
            <button
              onClick={() => (transactionStore.displayConfirmView = true)}
              className="donate-button"
              disabled={
                !transactionStore.enoughBalance ||
                !transactionStore.enoughUsersForDonate
              }
            >
              {t("transaction.donate", {
                0: transactionStore.txData.value
                  ? `$${transactionStore.txData.value}`
                  : `${transactionStore.txData.value}`,
              })}
            </button>
          </>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export const TransactionDialog = withStore(
  TransactionViewModel,
  observer(TransactionDialogImpl)
);
