import { Pill, StyledText, View } from "@aurora/components";

type Transaction = {
	type: "sent" | "added" | "transferred";
	date: string;
	amount: number;
	currency: string;
	status: "success" | "pending" | "cancelled";
};

function TransactionHistoryItem({ transaction }: { transaction: Transaction }) {
	const { type, date, amount, currency, status } = transaction;

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
			paddingHorizontal="$xl"
			paddingVertical="$m"
			borderRadius="$radius.l"
			backgroundColor="$gray50">
			<View
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between">
				<View gap={"$space.xs"} flexDirection="row" alignItems="center">
					<View
						borderRadius={"$radius.s"}
						borderWidth={0.3}
						borderColor={"$secondary900"}
						padding={"$space.xs"}
					/>
					<StyledText
						width={90}
						color={"$secondary900"}
						variant="contentRegularM">
						{type.charAt(0).toUpperCase() + type.slice(1)}
					</StyledText>
				</View>
				<StyledText color={"$secondary400"} variant="contentRegularM">
					{date}
				</StyledText>
				<View width={100}>
					<Pill marginHorizontal={"$auto"} variant={pillVariant}>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</Pill>
				</View>
				<StyledText variant="highlightBoldL">{`${amount} ${currency}`}</StyledText>
			</View>
		</View>
	);
}

export function TransactionHistory() {
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
			style={{
				lineHeight: 1,
			}}
			borderRadius={"$radius.l"}
			backgroundColor={"white"}>
			<View
				padding={"$space.xl"}
				backgroundColor={"$gray50"}
				borderRadius={"$radius.l"}
				flexDirection="row"
				justifyContent="space-between">
				<StyledText variant="headingM">Transaction History</StyledText>
				<View flexDirection="row" alignItems="center">
					<StyledText variant="featureStandard">Show All</StyledText>
				</View>
			</View>
			<View>
				{transactions.map((transaction, index) => (
					<TransactionHistoryItem key={index} transaction={transaction} />
				))}
			</View>
		</View>
	);
}
