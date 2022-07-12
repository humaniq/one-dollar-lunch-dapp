export const API_HUMANIQ_URL = process.env.REACT_APP_API_HUMANIQ_URL || "";
export const API_FINANCE = "https://apifinance.humaniq.com/api/v1";
export const API_HUMANIQ_TOKEN = "XMaLhU75ZFklvAiV7yBZBNnlWsE9IowU";

export const HUMANIQ_ROUTES = {
  GET_USERS_LIST: "/one_dollar_for_lunch/list",
  POST_DONATE_LIST: "/one_dollar_for_lunch/donate_list",
  GET_DONATIONS: "/one_dollar_for_lunch/donations/from_wallet/:wallet",
};

export const FINANCE_ROUTES = {
  GET_PRICES: "/prices/list",
};

export const rpc = {
  1: "https://mainnet.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  3: "https://ropsten.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  4: "https://rinkeby.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  5: "https://goerli.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "https://bsc-dataseed.binance.org",
};
