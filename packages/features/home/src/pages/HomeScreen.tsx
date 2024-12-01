import { config, ScrollView, View } from "@aurora/components";
import { CardListView, TransactionHistory } from "@aurora/blocks";
import { useState } from "react";

export const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <ScrollView>
      <View flexDirection="row" flexWrap="wrap" gap={"$base"} margin={"$base"}>
        <CardListView currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        <TransactionHistory />
      </View>
    </ScrollView>
  );
};
