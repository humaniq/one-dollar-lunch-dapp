export const rpc = {
  4: "https://rinkeby.infura.io/v3/c306191fe58d401b900a38911b8a43c9",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "https://bsc-dataseed.binance.org",
};

export enum NATIVE_COIN {
  ETHEREUM = "ethereum",
  BINANCECOIN = "binancecoin",
}

export enum NATIVE_COIN_SYMBOL {
  ETH = "eth",
  BNB = "bnb",
}

export enum EVM_NETWORKS_NAMES {
  MAINNET = "mainnet",
  ROPSTEN = "ropsten",
  RINKEBY = "rinkeby",
  GOERLI = "goerli",
  BSC = "bsc",
  BSC_TESTNET = "bcs testnet",
}

export enum NETWORK_TYPE {
  PRODUCTION = "production",
  TEST = "test",
}

export interface EVM_NETWORK {
  name: EVM_NETWORKS_NAMES;
  chainID: number;
  networkID: number;
  type: EVM_NETWORKS_NAMES;
  env: NETWORK_TYPE;
  nativeCoin: NATIVE_COIN;
  nativeSymbol: NATIVE_COIN_SYMBOL;
}

export const EVM_NETWORKS: { [key: string]: EVM_NETWORK } = {
  [EVM_NETWORKS_NAMES.BSC]: {
    name: EVM_NETWORKS_NAMES.BSC,
    chainID: 56,
    networkID: 56,
    type: EVM_NETWORKS_NAMES.BSC,
    env: NETWORK_TYPE.PRODUCTION,
    nativeCoin: NATIVE_COIN.BINANCECOIN,
    nativeSymbol: NATIVE_COIN_SYMBOL.BNB,
  },
  [EVM_NETWORKS_NAMES.BSC_TESTNET]: {
    name: EVM_NETWORKS_NAMES.BSC_TESTNET,
    chainID: 97,
    networkID: 97,
    type: EVM_NETWORKS_NAMES.BSC_TESTNET,
    env: NETWORK_TYPE.TEST,
    nativeCoin: NATIVE_COIN.BINANCECOIN,
    nativeSymbol: NATIVE_COIN_SYMBOL.BNB,
  },
};
