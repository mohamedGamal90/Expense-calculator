import { getTokens, StyledText, View } from "@aurora/components";
import { ActivityIndicator, FlatList } from "react-native";
import { TransactionHistoryItem } from "@aurora/blocks";
import { useGetTransactionsQuery } from "../hooks";
import { useSelectedCard } from "@metroid/store";
import { getLastMonth, getTodayDate } from "@aurora/utils";
import { Icon } from "@aurora/icons";
import { useTranslation } from "react-i18next";

export const TransactionScreen = () => {
  const selectedCard = useSelectedCard();
  const { color } = getTokens();
  const { t } = useTranslation();

  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery({
    cardId: selectedCard?.id,
    transactionDateFrom: getLastMonth(),
    transactionDateTo: getTodayDate(),
    pageIndex: 1,
    pageSize: 20,
  });

  const emptyTransactionsList = () => (
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
        {t("transaction.empty-txt")}
      </StyledText>
    </View>
  );

  return (
    <View
      flex={1}
      gap={"$base"}
      margin={"$base"}
      borderWidth={1}
      borderRadius={"$sm"}
      borderColor={"$secondary100"}
      padding={"$ml"}>
      <StyledText color={"$secondary900"} variant="Headingxl">
        {t("transaction.header-title")}
      </StyledText>
      <View flex={1}>
        {isFetching || isLoading ? (
          <View flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator size="large" color={color.$primary800.val} />
          </View>
        ) : (
          <FlatList
            data={transactions?.transaction}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={item => item.transactionId}
            renderItem={({ item }) => <TransactionHistoryItem transaction={item} />}
            ListEmptyComponent={emptyTransactionsList}
          />
        )}
      </View>
    </View>
  );
};
