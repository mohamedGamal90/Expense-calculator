import { StyledText, View } from "@aurora/components";

type Props = { title: string; children: JSX.Element };

export const CardInfoBlock = ({ title, children }: Props) => {
  return (
    <View alignItems="center" justifyContent="space-between">
      <StyledText
        $gtSm={{
          variant: "BodySemiBoldml",
        }}
        variant="BodySemiBoldm"
        color={"$secondary900"}>
        {title}
      </StyledText>
      {children}
    </View>
  );
};
