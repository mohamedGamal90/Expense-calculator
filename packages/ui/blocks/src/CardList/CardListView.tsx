import { StyledDialog, StyledText, View } from "@aurora/components";
import { CardCurrencyDetails } from "../card-currency-details";
import { Icon } from "@aurora/icons";
import { Dimensions } from "react-native";
import { CardList } from "./CardList";
import { CardMangementDialogScreen } from "@metroid/card-management";

const { width: screenWidth } = Dimensions.get("window");

export const CardListView = () => {
  return (
    <View
      width={"100%"}
      borderWidth={1}
      borderRadius={"$sm"}
      borderColor={"$secondary100"}
      paddingVertical={"$m"}>
      <StyledText marginLeft={"$m"} variant="Headingxl" color={"$secondary900"}>
        Overview
      </StyledText>
      <CardList />
      <CardCurrencyDetails />
      <View
        flexDirection="row"
        alignSelf="center"
        gap={screenWidth > 600 ? "$5xl" : "$l"}
        marginTop="$base">
        <StyledDialog title={"Send"} icon={<Icon name={"send"} />} children={<View />} />
        <StyledDialog title={"Top Up"} icon={<Icon name={"topup"} />} children={<View />} />
        <StyledDialog
          title={"Manage"}
          icon={<Icon name={"manage"} width={24} height={24} />}
          children={<CardMangementDialogScreen />}
        />
      </View>
    </View>
  );
};
