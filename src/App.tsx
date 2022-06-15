import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.sass";
import routes from "./utils/routes";
import NotFound from "./screens/404/404";
import b from "buffer";
import { observer } from "mobx-react";
import { ETHProvider } from "stores/providerStore";
import { AlertProps, Snackbar } from "@mui/material";
import { app } from "stores/appStore/appStore";
import MuiAlert from "@mui/material/Alert";
import { Main } from "screens/main/Main";
import { Search } from "screens/search/Search";
import { Donations } from "screens/donations/Donations";
import { DonationDetails } from "screens/donation-details/DonationDetails";
import { Portfolio } from "screens/portfolio/Portfolio";

window.Buffer = b.Buffer;

export const getProviderStore = ETHProvider;

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        ) : null}
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
    </>
  );
});
