import { getTokens, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { TransactionHistoryItem } from "./components/TransactionHistoryItem";
import { useGetTransactionsQuery } from "@aurora/home/src/hooks/useGetTransactions";
import { useSelectedCard } from "@metroid/store";
import { getLastWeek, getTodayDate } from "@aurora/utils";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export const TransactionHistory = () => {
  const selectedCard = useSelectedCard();
  const { color } = getTokens();
  const router = useRouter();
  const { t } = useTranslation();

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
        <View>
          <StyledText color={"$secondary900"} variant="Headingxl">
            {t("titles.transactions-history")}
          </StyledText>
        </View>

        <View
          cursor="pointer"
          flexDirection={"row"}
          alignItems="center"
          gap="$s"
          onPress={() =>
            router.push({ pathname: "/dashboard/transaction", params: { id: selectedCard?.id } })
          }>
          <StyledText color={"$secondary900"} variant="BodySemiBoldm">
            {t("buttons.showAll")}
          </StyledText>
          <Icon name={"arrow-right"} color="#3C3C3D" />
        </View>
      </View>
      <View>
        {transactions &&
          transactions.transaction
            .slice(0, 3)
            .map((transaction, index) => (
              <TransactionHistoryItem
                key={index}
                transaction={transaction}
                timeZone={transactions.timeZone}
              />
            ))}
        {transactions && transactions.transaction.length === 0 && (
          <View flex={1} alignItems="center" justifyContent="center">
            <View
              width={50}
              height={50}
              backgroundColor={"$primary600"}
              borderRadius="$full"
              justifyContent="center"
              alignItems="center"
              marginBottom="$base">
              <Icon name={"arrow-swap-horizontal"} color={color.$white.val} />
            </View>
            <StyledText variant="Heading2xl" color="secondary800">
              No transactions found in the last week
            </StyledText>
          </View>
        )}
      </View>
    </View>
  );
};
