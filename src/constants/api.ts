import { v4 as uuidv4 } from "uuid";

export const API_HUMANIQ_URL = "https://signupbot.humaniq.com/api/v0";
export const API_HUMANIQ_TOKEN = "XMaLhU75ZFklvAiV7yBZBNnlWsE9IowU";

export const hotRequestSeed = uuidv4();
export const usersSeed = uuidv4();

export const HUMANIQ_ROUTES = {
  GET_USERS_LIST: "/one_dollar_for_lunch/list",
};

export const rpc = {
  1: "https://mainnet.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  3: "https://ropsten.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  4: "https://rinkeby.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  5: "https://goerli.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "https://bsc-dataseed.binance.org",
};
