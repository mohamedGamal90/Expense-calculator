import { getTokens, StyledText, View } from "@aurora/components";
import { ActivityIndicator, FlatList } from "react-native";
import { TransactionHistoryItem } from "@aurora/blocks";
import { useGetTransactionsQuery } from "../hooks";
import { getLastMonth, getTodayDate } from "@aurora/utils";
import { Icon } from "@aurora/icons";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";

export const TransactionScreen = () => {
  const params = useLocalSearchParams();

  const { id } = params as {
    id: string;
  };

  const { color } = getTokens();
  const { t } = useTranslation();

  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery({
    cardId: id,
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
  let oldDate: null | string;
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
            keyExtractor={(_item, index) => `item-${index}`}
            renderItem={({ item }) => {
              let datetxt: null | string;
              if (item.transactionDate.slice(0, 10) !== oldDate) {
                oldDate = item.transactionDate.slice(0, 10);
                datetxt = dayjs(item.transactionDate, "DD-MM-YYYY HH:mm:ss", true)
                  .tz(transactions?.timeZone)
                  .format("dddd, D MMMM YYYY");
              } else {
                datetxt = null;
              }
              return (
                <>
                  {datetxt && (
                    <StyledText paddingTop="$sm" color={"$secondary400"} variant="BodySemiBoldml">
                      {datetxt}
                    </StyledText>
                  )}
                  <TransactionHistoryItem
                    timeZone={transactions?.timeZone as string}
                    transaction={item}
                  />
                </>
              );
            }}
            ListEmptyComponent={emptyTransactionsList}
          />
        )}
      </View>
    </View>
  );
};
