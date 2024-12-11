import { StyledText, Pill, View, PillVariant } from "@aurora/components";
import { Icon, IconKeys } from "@aurora/icons";
import { TransactionType } from "@aurora/home/src/hooks/useGetTransactions";
import { formatDate } from "@aurora/utils";

export const TransactionHistoryItem = ({ transaction }: { transaction: TransactionType }) => {
  const { transactionType, transactionDate, billingAmount, billingCurrency, status } = transaction;

  const getTypeObj: { icon: IconKeys; type: string } = (() => {
    switch (transactionType) {
      case "MONEY_OUT":
        return { icon: "send", type: "Send" };
      default:
        return { icon: "topup", type: "Added" };
    }
  })();

  const pillVariant: { pillVariant: PillVariant; PillTxt: string } = (() => {
    switch (status) {
      case "1":
        return { pillVariant: "success", PillTxt: "Success" };
      default:
        return { pillVariant: "negative", PillTxt: "cancelled" };
    }
  })();

  return (
    <View
      paddingVertical="$m"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <View gap={"$s"} flexDirection="row" alignItems="center">
        <View borderRadius={"$xs"} borderWidth={0.3} borderColor={"$secondary900"} padding={"$xs"}>
          <Icon name={getTypeObj.icon} width={14} height={14} />
        </View>
        <StyledText width={90} color={"$secondary900"} variant="Bodysm">
          {getTypeObj.type}
        </StyledText>
      </View>
      <StyledText color={"$secondary400"} variant="BodySemiBoldml">
        {formatDate(transactionDate)}
      </StyledText>
      <View width={100}>
        <Pill marginHorizontal={"$auto"} width={80} height={25} variant={pillVariant.pillVariant}>
          {pillVariant.PillTxt}
        </Pill>
      </View>
      <StyledText variant="BodyBoldm">{`${getTypeObj.type === "Send" ? "-" : ""}${billingAmount} ${billingCurrency}`}</StyledText>
    </View>
  );
};
