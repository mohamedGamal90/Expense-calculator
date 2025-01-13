import { CurrencyType } from "@metroid/types";

export type Currency = "LYD" | "GHS" | "SDG" | "USD" | "EGP";

const CURRENCYOBJ = {
  USD: { currencyName: "United States Dollar", symbol: "$", currencyCode: "840" },
  EGP: { currencyName: "Egyptian Pound", symbol: "e£", currencyCode: "818" },
  GHS: { currencyName: "Ghanaian Cedi", symbol: "GHS", currencyCode: "936" },
  LYD: { currencyName: "Libyan Dinar", symbol: "LD", currencyCode: "434" },
  SDG: { currencyName: "Sudanese Pound", symbol: "SDG", currencyCode: "938" },
};

const getCurrencySymbol = (currency: CurrencyType) => CURRENCYOBJ[currency].symbol;
const getCurrencyCode = (currency: CurrencyType) => CURRENCYOBJ[currency].currencyCode;

export { getCurrencySymbol, getCurrencyCode };
