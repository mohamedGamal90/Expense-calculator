import { StyledText, View } from "@aurora/components";
import { TransactionHistoryItem } from "@aurora/blocks";

export const TransactionScreen = () => {
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
        Transaction History
      </StyledText>
      <View flex={1}>
        <TransactionHistoryItem
          transaction={{
            billingAmount: "1.0",
            billingCurrency: "USD",
            cardNumber: "442441******5711",
            country: "0",
            isReverse: "false",
            mcc: "6010",
            merchantName: "MERCHANT SVIP ES",
            status: "1",
            transactionAmount: "1.0",
            transactionCurrency: "USD",
            transactionDate: "09-12-2024 09:42:55",
            transactionDescription: "P2P Credit part",
            transactionId: "89622553",
            transactionType: "MONEY_IN",
          }}
        />
      </View>
    </View>
  );
};
