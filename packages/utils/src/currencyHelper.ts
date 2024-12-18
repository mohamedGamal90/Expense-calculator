import { CurrencyType } from "@metroid/types";

const CURRENCYOBJ = {
  USD: { currencyName: "United States Dollar", symbol: "$" },
  EGP: { currencyName: "Egyptian Pound", symbol: "e£" },
  GHS: { currencyName: "Ghanaian Cedi", symbol: "GHS" },
};

const getCurrencySymbol = (currency: CurrencyType) => CURRENCYOBJ[currency].symbol;
const getCurrencyFullName = (currency: CurrencyType) => CURRENCYOBJ[currency].currencyName;

export { getCurrencySymbol, getCurrencyFullName };
