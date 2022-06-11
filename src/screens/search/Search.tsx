import React, { useCallback } from "react";
import { withStore } from "utils/hoc";
import { SearchViewModel } from "screens/search/SearchViewModel";
import { observer } from "mobx-react";
import "./Search.sass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

interface SearchScreenInterface {}

const SearchImpl: React.FC<SearchScreenInterface> = ({}) => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="search-container">
      <div className="search-input">
        <IconButton onClick={onBackClick}>
          <ArrowBackIcon sx={{ fontSize: 28, color: "#001833" }} />
        </IconButton>
        <input autoFocus className="input" placeholder={t("search.hint")} />
      </div>
    </div>
  );
};

export const Search = withStore(SearchViewModel, observer(SearchImpl));
