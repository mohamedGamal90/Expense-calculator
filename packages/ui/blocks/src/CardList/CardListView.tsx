import { config, StyledText, View } from "@aurora/components";
import { CardList } from "../CardList";
import { cards } from "../dummy";
import { CardCurrencyDetails } from "../card-currency-details";
import { DialogInstance } from "../Dialog";
import { Icon } from "@aurora/icons";
import { CardMangementDialogScreen } from "../dialog-screens/card-mangement";
import { Dispatch, SetStateAction } from "react";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
type Props = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};
export const CardListView = ({ currentIndex, setCurrentIndex }: Props) => {
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
      <CardList
        cards={cards}
        width={screenWidth - config.tokens.space.base.val * 2}
        onChange={index => setCurrentIndex(index)}
      />
      <CardCurrencyDetails card={cards[currentIndex]} />
      <View
        flexDirection="row"
        alignSelf="center"
        gap={screenWidth > 600 ? "$5xl" : "$l"}
        marginTop="$base">
        <DialogInstance title={"Send"} icon={<Icon name={"send"} />} children={<View />} />
        <DialogInstance title={"Top Up"} icon={<Icon name={"topup"} />} children={<View />} />
        <DialogInstance
          title={"Manage"}
          icon={<Icon name={"mange"} width={24} height={24} />}
          children={<CardMangementDialogScreen />}
        />
        <DialogInstance title={"Add Card"} icon={<Icon name={"card-add"} />} children={<View />} />
      </View>
    </View>
  );
};
