import currency from "currency.js";
import { CURRENCIES } from "../constants/general";
import { memoize } from "./general";

const pow = Math.pow;
const floor = Math.floor;
const abs = Math.abs;
const log = Math.log;

const abbrev = "KMBTQ";

function round(n: number, precision: number) {
  const prec = Math.pow(10, precision);
  return Math.round(n * prec) / prec;
}

export const amountFormat = memoize((amount = 0, number: number) => {
  try {
    return currency(amount, { precision: number, symbol: "" }).format();
  } catch (e) {
    console.log("ERROR", e);
    return "0";
  }
});

export function getCurrencySymbol(symbol: string) {
  switch (symbol) {
    case CURRENCIES.USD:
      return "$";
    case CURRENCIES.EUR:
      return "€";
    case CURRENCIES.RUB:
      return "₽";
    case CURRENCIES.CNY:
      return "C¥";
    case CURRENCIES.JPY:
      return "J¥";
    default:
      return undefined;
  }
}

export const currencyFormat = memoize((amount = 0, symbol?: string) => {
  try {
    return symbol
      ? currency(amount, {
          symbol: getCurrencySymbol(symbol) || symbol,
        }).format()
      : currency(amount).format();
  } catch (e) {
    console.log("ERROR", e);
    return "0";
  }
});

export function preciseRound(n: number) {
  return parseFloat(
    n.toExponential(~~Math.max(1, 2 + Math.log10(Math.abs(n))))
  );
}

// const intlSimple = Intl.NumberFormat();
//
// export function formatToNumber(number) {
//   return intlSimple.format(number);
// }

export function beautifyNumber(n: number, symbol?: string) {
  let base = floor(log(abs(n)) / log(1000));
  const suffix = abbrev[Math.min(4, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  const rounded = round(n / pow(1000, base), 2);

  const imgSymbol = getCurrencySymbol(symbol || "");

  return symbol
    ? suffix
      ? currencyFormat(rounded, imgSymbol || symbol) + suffix
      : currencyFormat(n, imgSymbol || symbol)
    : suffix
    ? rounded + suffix
    : n;
}

export function stringToIntHash(
  str: string,
  upperbound: number,
  lowerbound: number
) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result = result + str.charCodeAt(i);
  }

  if (!lowerbound) lowerbound = 0;
  if (!upperbound) upperbound = 500;

  return (result % (upperbound - lowerbound)) + lowerbound;
}
