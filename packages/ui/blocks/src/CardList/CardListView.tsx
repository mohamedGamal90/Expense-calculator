import { StyledDialog, StyledText, View } from "@aurora/components";
import { CardCurrencyDetails } from "../card-currency-details";
import { Icon } from "@aurora/icons";
import { useWindowDimensions } from "react-native";
import { CardList } from "./CardList";
import { CardMangementDialogScreen, TopUpFlow } from "@metroid/card-management";
import { useTranslation } from "react-i18next";
import { useSelectedCard } from "@metroid/store";

export const CardListView = () => {
  const { width } = useWindowDimensions();
  const selectedCard = useSelectedCard();
  const { t } = useTranslation();

  const disabled = selectedCard?.statusCode !== "0";
  return (
    <View w="100%" bw={1} br="$l" bc="$secondary100" py="$m" overflow="hidden">
      <StyledText mx="$m" variant="Headingxl" color="$secondary900">
        {t("titles.overview")}
      </StyledText>
      <CardList />
      <CardCurrencyDetails />
      <View fd="row" alignSelf="center" gap={width > 600 ? "$5xl" : "$l"} mt="$base">
        {/* <StyledDialog title={"Send"} icon={<Icon name={"send"} />} children={<SendMoneyFlow />} /> */}
        <StyledDialog
          disabled={disabled}
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
