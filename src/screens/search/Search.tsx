import React from "react";
import { withStore } from "utils/hoc";
import { SearchViewModel } from "screens/search/SearchViewModel";
import { observer } from "mobx-react";
import "./Search.sass";

interface SearchScreenInterface {}

const SearchImpl: React.FC<SearchScreenInterface> = ({}) => {
  return null;
};

export const Search = withStore(SearchViewModel, observer(SearchImpl));
