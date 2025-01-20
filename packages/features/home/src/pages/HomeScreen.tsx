import { ScrollView, View } from "@aurora/components";
import { CardListView, TransactionHistory } from "@aurora/blocks";

export const HomeScreen = () => {
  return (
    <ScrollView>
      <View gap="$base" margin="$base">
        <CardListView />
        <TransactionHistory />
      </View>
    </ScrollView>
  );
};
