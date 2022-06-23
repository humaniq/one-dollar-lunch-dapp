import React, { useEffect } from "react";
import { withStore } from "utils/hoc";
import { SearchViewModel } from "screens/search/SearchViewModel";
import { observer } from "mobx-react";
import "./Search.sass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { AllUsers } from "../main/users/AllUsers";

interface SearchScreenInterface {
  store: SearchViewModel;
}

const SearchImpl: React.FC<SearchScreenInterface> = ({ store: view }) => {
  const navigate = useNavigate();

  useEffect(() => {
    view.init(navigate);
    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="search-container">
      <div className="search-input">
        <IconButton onClick={view.onBackClick}>
          <ArrowBackIcon sx={{ fontSize: 28, color: "#001833" }} />
        </IconButton>
        <input
          onChange={view.onSearch}
          autoFocus
          className="input"
          placeholder={t("search.hint")}
        />
      </div>
      <AllUsers disableProgress={true} />
    </div>
  );
};

export const Search = withStore(SearchViewModel, observer(SearchImpl));
