import { StyledText, View } from "@aurora/components";
import { useState } from "react";
import { Pressable } from "react-native";

export const DateSelection = () => {
  const [selectedDate, setSelectedDate] = useState("Monthly");

  const onSelectDate = (date: string) => setSelectedDate(date);

  const DateSelectionBtnObj = ["Daily", "Weekly", "Monthly", "Yearly"];

  return (
    <View flexDirection="row" marginVertical="$ml" gap="$ml">
      {DateSelectionBtnObj.map(date => (
        <DateSelectionBtn
          key={date}
          btnText={date}
          isSelected={selectedDate === date}
          onpress={onSelectDate}
        />
      ))}
    </View>
  );
};

const DateSelectionBtn = ({
  btnText,
  isSelected,
  onpress,
}: {
  btnText: string;
  isSelected: boolean;
  onpress: (date: string) => void;
}) => (
  <Pressable onPress={() => onpress(btnText)}>
    <View
      backgroundColor={isSelected ? "$primary800" : "$secondary100"}
      paddingHorizontal="$m"
      paddingVertical="$s"
      borderRadius="$sm">
      <StyledText variant="Bodys" color={isSelected ? "$white" : "$secondary900"}>
        {btnText}
      </StyledText>
    </View>
  </Pressable>
);
