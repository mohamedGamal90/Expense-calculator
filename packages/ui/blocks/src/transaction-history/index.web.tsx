import { Pill, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";

type Transaction = {
	type: "sent" | "added" | "transferred";
	date: string;
	amount: number;
	currency: string;
	status: "success" | "pending" | "cancelled";
};
function TransactionHistoryItem({ transaction }: { transaction: Transaction }) {
	const { type, date, amount, currency, status } = transaction;

	const getIconType = (() => {
		switch (type) {
			case "sent":
				return "send";
			case "added":
				return "topup";
			case "transferred":
				return "topup";
		}
	})();

	const pillVariant = (() => {
		switch (status) {
			case "success":
				return "success";
			case "pending":
				return "warning";
			case "cancelled":
				return "negative";
		}
	})();

	return (
		<View
			paddingVertical="$m"
			borderRadius="$radius.l"
			backgroundColor="$gray50">
			<View
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between">
				<View gap={"$s"} flexDirection="row" alignItems="center">
					<View
						borderRadius={"$xs"}
						borderWidth={0.3}
						borderColor={"$secondary900"}
						padding={"$xs"}>
						<Icon name={getIconType} width={14} height={14} />
					</View>
					<StyledText width={90} color={"$secondary900"} variant="Bodysm">
						{type.charAt(0).toUpperCase() + type.slice(1)}
					</StyledText>
				</View>
				<StyledText color={"$secondary400"} variant="BodySemiBoldml">
					{date}
				</StyledText>
				<View width={100}>
					<Pill
						marginHorizontal={"$auto"}
						width={80}
						height={25}
						variant={pillVariant}>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</Pill>
				</View>
				<StyledText variant="BodyBoldm">{`${amount} ${currency}`}</StyledText>
			</View>
		</View>
	);
}

export const TransactionHistory = () => {
	const transactions: Transaction[] = [
		{
			type: "sent",
			date: "2023-01-01",
			amount: 12,
			currency: "USD",
			status: "success",
		},
		{
			type: "added",
			date: "2023-01-02",
			amount: 12,
			currency: "USD",
			status: "pending",
		},
		{
			type: "transferred",
			date: "2023-01-03",
			amount: 12,
			currency: "USD",
			status: "cancelled",
		},
	];

	return (
		<View
			borderWidth={1}
			borderRadius={"$sm"}
			borderColor={"$secondary100"}
			style={{
				lineHeight: 1,
			}}
			gap={"$base"}
			padding={"$ml"}
			width={"100%"}>
			<View
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center">
				<StyledText color={"$secondary900"} variant="Headingxl">
					Transaction History
				</StyledText>
				<View flexDirection="row" alignItems="center" gap={"$xs"}>
					<StyledText color={"$secondary900"} variant="BodySemiBoldm">
						Show All
					</StyledText>
					<Icon name={"arrow-right"} color="#3C3C3D" />
				</View>
			</View>
			<View>
				{transactions.map((transaction, index) => (
					<TransactionHistoryItem key={index} transaction={transaction} />
				))}
			</View>
		</View>
	);
};
