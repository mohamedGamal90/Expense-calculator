import { StyledText, View } from "@aurora/components";

type Props = { title: string; children: JSX.Element };

export const CardInfoBlock = ({ title, children }: Props) => (
  <View alignItems="center" jc="space-between">
    <StyledText $gtSm={{ variant: "BodySemiBoldml" }} variant="BodySemiBoldm" col="$secondary900">
      {title}
    </StyledText>
    {children}
  </View>
);
