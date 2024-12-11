import { ScrollView, View } from "@aurora/components";
import { CardListView, TransactionHistory } from "@aurora/blocks";
import { useState } from "react";
import { useGetCardsQuery, useGetTransactionsQuery } from "../hooks";
import { getLastWeek, getTodayDate } from "@aurora/utils";

export const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: cards } = useGetCardsQuery();

  const { data: transactions, isLoading: transactionsIsLoading } = useGetTransactionsQuery({
    cardId: cards && cards[currentIndex].id,
    transactionDateFrom: getLastWeek(),
    transactionDateTo: getTodayDate(),
    pageIndex: 1,
    pageSize: 5,
  });

  return (
    <ScrollView>
      <View flexDirection="row" flexWrap="wrap" gap={"$base"} margin={"$base"}>
        {cards && (
          <CardListView
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            cards={cards}
          />
        )}
        <TransactionHistory transactions={transactions?.transaction} />
      </View>
    </ScrollView>
  );
};
