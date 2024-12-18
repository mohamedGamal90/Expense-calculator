import { View } from "@aurora/components";

type CardListLoadingProps = {
  width: number;
};

export const CardListLoading = ({ width }: CardListLoadingProps) => {
  return (
    <View>
      <View
        width={width}
        height={200}
        backgroundColor="$secondary100"
        borderRadius="$sm"
        marginHorizontal="$base"
      />
      <View flexDirection="row" justifyContent="center" gap="$xs" marginTop="$base">
        {[...Array(3)].map((_, index) => (
          <View key={index} width={8} height={8} borderRadius={4} backgroundColor="$secondary100" />
        ))}
      </View>
    </View>
  );
};
