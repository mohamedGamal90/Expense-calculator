import { StyledText, Pill, View, PillVariant } from "@aurora/components";
import { Icon, IconKeys } from "@aurora/icons";
import { Transaction } from "@aurora/home/src/hooks/useGetTransactions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSettingStore } from "@metroid/store";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const TransactionHistoryItem = ({
  transaction,
  timeZone,
}: {
  transaction: Transaction;
  timeZone: string;
}) => {
  const {
    transactionType,
    merchantName,
    transactionDate,
    billingAmount,
    billingCurrency,
    status,
    transactionId,
  } = transaction;

  const { lang } = useSettingStore();
  const { t } = useTranslation();

  function getTransactionTypeIcon(transaction: Transaction) {
    switch (transactionType) {
      case "MONEY_OUT":
        return "send";
      default:
        return "topup";
    }
  }
  const pillVariant: { pillVariant: PillVariant; PillTxt: string } = (() => {
    switch (status) {
      case "1":
        return { pillVariant: "success", PillTxt: t("status.success") }; // "Success" or "نجاح"
      default:
        return { pillVariant: "negative", PillTxt: t("status.cancelled") }; // "Cancelled" or "ملغى"
    }
  })();

  const formattedDate = dayjs(transactionDate, "DD-MM-YYYY HH:mm:ss", true)
    .locale(lang as string)
    .tz(timeZone)
    .format("h:mm A"); // User-friendly format

  return (
    <View py="$m" fd="row" ai="center" jc="space-between">
      <View $sm={{ width: "20%" }} w="14%" gap="$s" fd="row" ai="center">
        <View br="$xs" borderWidth={0.3} bc="$secondary900" padding="$xs">
          <Icon name={getTransactionTypeIcon(transaction)} width={14} height={14} />
        </View>
        <StyledText color="$secondary900" textOverflow="ellipsis" variant="Bodysm">
          {merchantName}
        </StyledText>
      </View>
      <StyledText $sm={{ width: "15%" }} w="10%" ta="center" variant="BodyBoldsm">
        {transactionType === "MONEY_IN" || transaction.isReverse === "true" ? "Credit" : "Debit"}
      </StyledText>
      <View $sm={{ width: "15%" }} w="10%">
        <StyledText ta="center" variant="BodyBoldsm">
          Transaction ID
        </StyledText>
        <StyledText ta="center" variant="Bodysm">
          {transactionId}
        </StyledText>
      </View>
      <StyledText $sm={{ display: "none" }} col="$secondary400" variant="BodySemiBoldml">
        {formattedDate}
      </StyledText>
      <View w={100}>
        <Pill mx="$auto" w={80} h={25} variant={pillVariant.pillVariant}>
          {pillVariant.PillTxt}
        </Pill>
      </View>
      <StyledText $sm={{ width: "20%" }} w="12%" ta="right" variant="BodyBoldm">
        {`${transactionType === "MONEY_IN" || transaction.isReverse === "true" ? "" : "-"}${billingAmount} ${billingCurrency}`}
      </StyledText>
    </View>
  );
};
