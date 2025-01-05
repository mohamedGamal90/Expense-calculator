import { StyledText, Pill, View, PillVariant } from "@aurora/components";
import { Icon, IconKeys } from "@aurora/icons";
import { TransactionType } from "@aurora/home/src/hooks/useGetTransactions";
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
  transaction: TransactionType;
  timeZone: string;
}) => {
  const { transactionType, transactionDate, billingAmount, billingCurrency, status } = transaction;

  const { lang } = useSettingStore();
  const { t } = useTranslation();

  const getTypeObj: { icon: IconKeys; type: string } = (() => {
    switch (transactionType) {
      case "MONEY_OUT":
        return { icon: "send", type: t("status.send") }; // "Send" or "إرسال"
      default:
        return { icon: "topup", type: t("status.added") }; // "Added" or "تم الإضافة"
    }
  })();

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
        {formattedDate}
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
