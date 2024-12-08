import { RadioGroup, View } from "tamagui";
import { StyledText } from "./text";

export const RadioGroupItemWithLabel = (props: { value: string; label: string }) => (
  <View gap={"$l"} flexDirection="row" justifyContent="space-between" marginVertical={"$l"}>
    <StyledText htmlFor={`radiogroup-${props.value}`} variant="BodySemiBoldm" color={"$neutral800"}>
      {props.label}
    </StyledText>
    <View width={30}>
      <RadioGroup.Item value={props.value} id={`radiogroup-${props.value}`} size={"$5"}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
    </View>
  </View>
);
