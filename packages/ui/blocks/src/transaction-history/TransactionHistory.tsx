import { StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { TransactionHistoryItem } from "./components/TransactionHistoryItem";
import { Link } from "expo-router";
import { useGetTransactionsQuery } from "@aurora/home/src/hooks/useGetTransactions";
import { useSelectedCard } from "@metroid/store";
import { getLastWeek, getTodayDate } from "@aurora/utils";

export const TransactionHistory = () => {
  const selectedCard = useSelectedCard();

  const { data: transactions, isLoading: transactionsIsLoading } = useGetTransactionsQuery({
    cardId: selectedCard?.id,
    transactionDateFrom: getLastWeek(),
    transactionDateTo: getTodayDate(),
    pageIndex: 1,
    pageSize: 5,
  });

  return (
    <View
      borderWidth={1}
      borderRadius={"$sm"}
      borderColor={"$secondary100"}
      style={{
        lineHeight: 1,
      }}
      gap={"$base"}
      padding={"$ml"}
      width={"100%"}>
      <View flexDirection="row" justifyContent="space-between" alignItems="center">
        <StyledText color={"$secondary900"} variant="Headingxl">
          Transaction History
        </StyledText>
        <View flexDirection="row" alignItems="center" gap={"$xs"}>
          <Link href={"/dashboard/transaction"}>
            <View flexDirection="row" alignItems="center" gap="$xs">
              <StyledText color={"$secondary900"} variant="BodySemiBoldm">
                Show All
              </StyledText>
              <Icon name={"arrow-right"} color="#3C3C3D" />
            </View>
          </Link>
        </View>
      </View>
      <View>
        {transactions &&
          transactions.transaction
            .slice(0, 3)
            .map((transaction, index) => (
              <TransactionHistoryItem key={index} transaction={transaction} />
            ))}
      </View>
    </View>
  );
};
