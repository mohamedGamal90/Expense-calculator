import { StyledDialog, StyledText, View } from "@aurora/components";
import { CardCurrencyDetails } from "../card-currency-details";
import { Icon } from "@aurora/icons";
import { useWindowDimensions } from "react-native";
import { CardList } from "./CardList";
import { CardMangementDialogScreen, TopUpFlow } from "@metroid/card-management";
import { useTranslation } from "react-i18next";

export const CardListView = () => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  return (
    <View
      width="100%"
      borderWidth={1}
      borderRadius="$sm"
      borderColor="$secondary100"
      paddingVertical="$m"
      // paddingHorizontal="$m"
      overflow="hidden">
      <StyledText mx="$m" variant="Headingxl" color="$secondary900">
        {t("titles.overview")}
      </StyledText>
      <CardList />
      <CardCurrencyDetails />
      <View
        flexDirection="row"
        alignSelf="center"
        gap={width > 600 ? "$5xl" : "$l"}
        marginTop="$base">
        {/* <StyledDialog title={"Send"} icon={<Icon name={"send"} />} children={<SendMoneyFlow />} /> */}
        <StyledDialog
          title={t("titles.topUp")}
          icon={<Icon name="topup" />}
          children={<TopUpFlow />}
        />
        <StyledDialog
          title={t("titles.manage")}
          icon={<Icon name="manage" width={24} height={24} />}
          children={<CardMangementDialogScreen />}
        />
      </View>
    </View>
  );
};
