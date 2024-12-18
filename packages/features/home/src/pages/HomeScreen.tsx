import { ScrollView, View } from "@aurora/components";
import { CardListView, TransactionHistory } from "@aurora/blocks";

export const HomeScreen = () => {
  return (
    <ScrollView>
      <View flexDirection="row" flexWrap="wrap" gap={"$base"} margin={"$base"}>
        <CardListView />
        <TransactionHistory />
      </View>
    </ScrollView>
  );
};
