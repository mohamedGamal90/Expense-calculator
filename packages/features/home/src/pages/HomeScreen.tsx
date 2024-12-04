import { ScrollView, View } from "@aurora/components";
import { CardListView, TransactionHistory } from "@aurora/blocks";
import { useState } from "react";
import { useGetCardsQuery } from "../hooks/useCardList";

export const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: cards } = useGetCardsQuery();
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
        <TransactionHistory />
      </View>
    </ScrollView>
  );
};
