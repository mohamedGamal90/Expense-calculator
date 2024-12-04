import { config, StyledDialog, StyledText, View } from "@aurora/components";
import { CardList } from "../CardList";
import { CardCurrencyDetails } from "../card-currency-details";
import { Icon } from "@aurora/icons";
import { CardMangementDialogScreen } from "../dialog-screens/card-mangement";
import { Dispatch, SetStateAction } from "react";
import { Dimensions } from "react-native";
import { CardType } from "@aurora/home/src/types/cardType";

const { width: screenWidth } = Dimensions.get("window");
type Props = {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  cards: CardType[];
};
export const CardListView = ({ currentIndex, setCurrentIndex, cards }: Props) => {
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
        width={screenWidth - config.tokens.space.base.val * 2 - 255}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <CardCurrencyDetails card={cards[currentIndex]} />
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
          children={<CardMangementDialogScreen selectedCard={cards[currentIndex]} />}
        />
      </View>
    </View>
  );
};
