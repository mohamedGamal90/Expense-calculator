import { useQuery } from "@tanstack/react-query";
import { authApiClient, ErrorType } from "@metroid/api";

export type Currency = "LYD" | "GHS" | "SDG" | "USD" | "EGP";

type GetCardTransactionsParams = {
  cardId: string | undefined;
  pageIndex: number;
  pageSize: number;
  transactionDateFrom?: Date | string;
  transactionDateTo?: Date | string;
};

export type TransactionType = {
  billingAmount: string;
  billingCurrency: string;
  cardNumber: string;
  country: string;
  isReverse: string;
  mcc: string;
  merchantName: string;
  status: string;
  transactionAmount: string;
  transactionCurrency: Currency;
  transactionDate: string;
  transactionDescription: string;
  transactionId: string;
  transactionType: string;
};

type GetCardTransactionsReponse = {
  timeZone: string;
  totalSize: number;
  transaction: TransactionType[];
};

const getTransactionList = async ({
  cardId,
  transactionDateFrom,
  transactionDateTo,
  pageIndex,
  pageSize,
}: {
  cardId: string | undefined;
  transactionDateFrom?: Date | string;
  transactionDateTo?: Date | string;
  pageIndex: number;
  pageSize: number;
}) => {
  const { data } = await authApiClient.post(
    `/transactions-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/transactions/${cardId}`,
    {
      pageIndex,
      pageSize,
      transactionAmountFrom: 1,
      transactionAmountTo: 99999,
      transactionDateFrom,
      transactionDateTo,
    },
  );
  return data;
};

export const useGetTransactionsQuery = ({
  cardId,
  transactionDateFrom,
  transactionDateTo,
  pageIndex,
  pageSize,
}: GetCardTransactionsParams) => {
  return useQuery<GetCardTransactionsReponse, ErrorType>({
    queryKey: ["cardTransactions", cardId],
    queryFn: async () =>
      getTransactionList({
        cardId,
        transactionDateFrom,
        transactionDateTo,
        pageIndex,
        pageSize,
      }),
    enabled: !!cardId,
  });
};
