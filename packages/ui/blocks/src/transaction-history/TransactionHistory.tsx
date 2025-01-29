import { getTokens, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { TransactionHistoryItem } from "./components/TransactionHistoryItem";
import {
  GetCardTransactionsReponse,
  useGetTransactionsQuery,
} from "@aurora/home/src/hooks/useGetTransactions";
import { useSelectedCard } from "@metroid/store";
import { getLastWeek, getTodayDate } from "@aurora/utils";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const RenderTransactions = ({ transactions }: { transactions: GetCardTransactionsReponse }) => {
  let oldDate: null | string;
  return transactions.transaction.slice(0, 3).map((transaction, index) => {
    let datetxt: null | string;
    if (transaction.transactionDate.slice(0, 10) !== oldDate) {
      oldDate = transaction.transactionDate.slice(0, 10);
      datetxt = dayjs(transaction.transactionDate, "DD-MM-YYYY HH:mm:ss", true)
        .tz(transactions.timeZone)
        .format("dddd, D MMMM YYYY");
    } else {
      datetxt = null;
    }
    return (
      <View key={`view-${index}`}>
        {datetxt && (
          <StyledText
            $sm={{ variant: "BodySemiBoldm" }}
            paddingTop="$sm"
            color={"$secondary400"}
            variant="BodySemiBoldml">
            {datetxt}
          </StyledText>
        )}
        <TransactionHistoryItem transaction={transaction} timeZone={transactions.timeZone} />
      </View>
    );
  });
};

export const TransactionHistory = () => {
  const selectedCard = useSelectedCard();
  const { color } = getTokens();
  const router = useRouter();
  const { t } = useTranslation();

  const { data: transactions } = useGetTransactionsQuery({
    cardId: selectedCard?.id,
    transactionDateFrom: getLastWeek(),
    transactionDateTo: getTodayDate(),
    pageIndex: 1,
    pageSize: 5,
  });

  return (
    <View
      borderWidth={1}
      borderRadius="$l"
      borderColor="$secondary100"
      style={{ lineHeight: 1 }}
      gap="$base"
      padding="$ml"
      w="100%">
      <View flexDirection="row" justifyContent="space-between" alignItems="center">
        <StyledText col="$secondary900" variant="Headingxl">
          {t("titles.transactions-history")}
        </StyledText>

        <View
          cursor="pointer"
          fd="row"
          alignItems="center"
          gap="$s"
          onPress={() =>
            router.push({ pathname: "/dashboard/transaction", params: { id: selectedCard?.id } })
          }>
          <StyledText col="$secondary900" variant="BodySemiBoldm">
            {t("buttons.showAll")}
          </StyledText>
          <Icon name="arrow-right" color={color.secondary900.val} />
        </View>
      </View>
      <View>
        {transactions && <RenderTransactions transactions={transactions} />}
        {transactions && transactions.transaction.length === 0 && (
          <View flex={1} alignItems="center" justifyContent="center">
            <View w={50} h={50} bg="$primary600" br="$full" jc="center" ai="center" mb="$base">
              <Icon name="arrow-swap-horizontal" color={color.$white.val} />
            </View>
            <View flexDirection="row">
              <StyledText
                $sm={{ variant: "BodymL" }}
                textAlign="center"
                variant="Heading2xl"
                color="secondary800">
                No transactions found in the last week
              </StyledText>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
