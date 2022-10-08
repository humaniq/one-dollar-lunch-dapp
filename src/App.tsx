import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.sass";
import routes from "./utils/routes";
import NotFound from "./screens/404/404";
import b from "buffer";
import { observer } from "mobx-react";
import { ProviderStore } from "stores/providerStore";
import { AlertProps, Snackbar } from "@mui/material";
import { app } from "stores/appStore/appStore";
import MuiAlert from "@mui/material/Alert";
import { Main } from "screens/main/Main";
import { Search } from "screens/search/Search";
import { DonationDetails } from "screens/donation-details/DonationDetails";
import { Portfolio } from "screens/portfolio/Portfolio";
import { Profiles } from "screens/profiles/Profiles";
import { TransactionDialog } from "./components/transaction-dialog/TransactionDialog";
import { Transaction } from "./stores/transactionStore";
import { Donations as DS } from "./stores/donationsStore";
import { Donations } from "./screens/donations/Donations";
import { FeedbackDialog } from "./components/ feedback-dialog/FeedbackDialog";
import { TransactionModal } from "./components/transaction-modal/TransactionModal";
import { ConnectDialog } from "./components/dialogs/ConnectDialog";
import { DisconnectDialog } from "./components/dialogs/DisconnectDialog";
import { ConnectionNotSupportedModal } from "components/connection-support/ConnectionNotSupportedModal";

window.Buffer = b.Buffer;

export const getProviderStore = new ProviderStore();
export const transactionStore = new Transaction();
export const DonationsStore = new DS();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      sx={{ borderColor: "white" }}
      elevation={6}
      ref={ref}
      variant="outlined"
      {...props}
    />
  );
});

export const App = observer(() => {
  useEffect(() => {
    (async () => {
      await getProviderStore.init();
      await DonationsStore.init();
      // await transactionStore.init()
    })();
  }, []);

  return (
    <>
      <div className="App">
        {getProviderStore.initialized ? (
          <Router>
            <Routes>
              <Route path={routes.home.path} element={<Main />} />
              <Route path={routes.search.path} element={<Search />} />
              <Route path={routes.donations.path} element={<Donations />} />
              <Route
                path={routes.donationDetails.path}
                element={<DonationDetails />}
              />
              <Route path={routes.portfolio.path} element={<Portfolio />} />
              <Route path={routes.profiles.path} element={<Profiles />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        ) : null}
        <ConnectDialog />
        <DisconnectDialog />
        <TransactionDialog
          onClose={() => transactionStore.setTransactionDialogVisibility(false)}
          visible={transactionStore.transactionDialogVisible}
        />
        <FeedbackDialog
          visible={transactionStore.feedbackDialogVisible}
          onClose={() => transactionStore.setFeedBackDialogVisibility(false)}
        />
        <Snackbar
          open={app.alert.displayAlert}
          autoHideDuration={6000}
          onClose={app.alert.alertClose}
          style={{ backgroundColor: "white" }}
        >
          <Alert
            onClose={app.alert.alertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {app.alert.alertMessage}
          </Alert>
        </Snackbar>
      </div>
      <TransactionModal
        status={transactionStore.transactionMessageStatus}
        visible={transactionStore.transactionMessageVisible}
      />
      <ConnectionNotSupportedModal
        isVisible={getProviderStore.notSupportedNetwork}
      />
    </>
  );
});
