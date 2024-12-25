import { useCallback } from "react";
import { SelectProps, Select, YStack } from "tamagui";
import { Icon } from "@aurora/icons";

import { Adapt, Sheet } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { MappingList } from "./MappingList";

type Item = { label: string; value: string };

export const StyledSelect = ({
  items,
  placeHolderText,
  value,
  onSelect,
  ...props
}: SelectProps & {
  items: Item[];
  value?: string;
  placeHolderText?: string;
  onSelect: (value: string) => void;
}) => {
  const renderOption = useCallback(
    (item: Item, index: number) => {
      return (
        <Select.Item padding={"$m"} index={index} value={item.value}>
          <Select.ItemText color={"$black"}>{item.label}</Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Icon name={"arrow-circle-right"} />
          </Select.ItemIndicator>
        </Select.Item>
      );
    },
    [items],
  );
  return (
    <Select value={value} onValueChange={onSelect} disablePreventBodyScroll {...props}>
      <Select.Trigger padding={"$ml"} borderRadius={"$m"} iconAfter={<Icon name={"arrow-down"} />}>
        <Select.Value placeholder={placeHolderText} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <ScrollUpButton />

        <Select.Viewport
          animation="quick"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}>
          <Select.Group>
            {/* <Select.Label>Fruits</Select.Label> */}
            <MappingList data={items} renderItem={renderOption} />
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              // right={0}
              // top={0}
              // bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$3"}
              pointerEvents="none">
              {/* <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? "$true")} /> */}
            </YStack>
          )}
        </Select.Viewport>
        <ScrollDownButton />
      </Select.Content>
    </Select>
  );
};
const ScrollUpButton = () => (
  <Select.ScrollUpButton
    alignItems="center"
    justifyContent="center"
    position="relative"
    width="100%"
    height="$3">
    <YStack zIndex={10}>
      <Icon name={"arrow-up"} />
    </YStack>
    <LinearGradient
      start={[0, 0]}
      end={[0, 1]}
      fullscreen
      colors={["$background", "transparent"]}
      borderRadius="$4"
    />
  </Select.ScrollUpButton>
);
const ScrollDownButton = () => (
  <Select.ScrollDownButton
    alignItems="center"
    justifyContent="center"
    position="relative"
    width="100%"
    height="$3">
    <YStack zIndex={10}>
      <Icon name={"arrow-down"} />
    </YStack>
    <LinearGradient
      start={[0, 0]}
      end={[0, 1]}
      fullscreen
      colors={["transparent", "$background"]}
      borderRadius="$4"
    />
  </Select.ScrollDownButton>
);
