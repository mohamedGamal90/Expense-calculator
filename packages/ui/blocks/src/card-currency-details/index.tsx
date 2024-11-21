import { StyledText, View } from "@aurora/components";
import { Card } from "../types";
import { CardInfoBlock } from "./components/cardInfoBlock";
import { getCurrencySymbol } from "./helper/getCurrencySymbol";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
export const CardCurrencyDetails = ({ card }: { card: Card }) => {
	const cardStatus = card.statusName === "VALID CARD" ? "Active" : "UnActive";
	return (
		<View
			flexDirection="row"
			justifyContent="center"
			margin={screenWidth > 600 ? "$ml" : "$sm"}>
			<CardInfoBlock title={"Your Balance"}>
				<StyledText
					variant={screenWidth > 600 ? "BodySemiBoldml" : "BodySemiBoldsm"}
					paddingVertical={"$xs"}
					color={"$secondary900"}>
					{`${getCurrencySymbol(card.currencyName)} ${card.availableBalance}`}
				</StyledText>
			</CardInfoBlock>
			<View
				width={1}
				height={68}
				backgroundColor={"$secondary100"}
				marginHorizontal={"$base"}
			/>
			<CardInfoBlock title={"Status"}>
				<View
					backgroundColor={
						card.statusName === "VALID CARD" ? "$success50" : "$error100"
					}
					paddingHorizontal={"$sm"}
					paddingVertical={"$s"}
					borderRadius={"$sm"}>
					<StyledText
						variant={screenWidth > 600 ? "Bodym" : "Bodys"}
						color={
							card.statusName === "VALID CARD" ? "$success600" : "$error500"
						}>
						{cardStatus}
					</StyledText>
				</View>
			</CardInfoBlock>
			<View
				width={1}
				height={68}
				backgroundColor={"$secondary100"}
				marginHorizontal={"$base"}
			/>
			<CardInfoBlock title={"Card Currency"}>
				<StyledText
					paddingVertical={"$xs"}
					variant={screenWidth > 600 ? "BodySemiBoldml" : "BodySemiBolds"}
					color={"$secondary900"}>
					{card.currencyName.toUpperCase()}
				</StyledText>
			</CardInfoBlock>
		</View>
	);
};
