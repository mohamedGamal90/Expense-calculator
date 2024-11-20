const CURRENCYSYMBOLS = [{ currency: "usd", symbol: "$" }];
export const getCurrencySymbol = (currency: string) =>
  CURRENCYSYMBOLS.find((value) => value.currency === currency)?.symbol;
