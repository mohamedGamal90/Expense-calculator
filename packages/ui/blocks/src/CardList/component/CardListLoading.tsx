import { useWindowDimensions, View } from "@aurora/components";

export function CardListLoading() {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <View>
      <View
        $sm={{
          width: "85%",
        }}
        alignSelf="center"
        width={screenWidth - 315}
        height={200}
        backgroundColor="$secondary100"
        borderRadius="$sm"
        paddingHorizontal="$base"
      />
      <View flexDirection="row" justifyContent="center" gap="$xs" marginTop="$base">
        {[...Array(3)].map((_, index) => (
          <View key={index} width={8} height={8} borderRadius={4} backgroundColor="$secondary100" />
        ))}
      </View>
    </View>
  );
}
