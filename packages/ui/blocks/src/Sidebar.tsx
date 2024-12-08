import { StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { Link } from "expo-router";

type IconProps = React.ComponentProps<typeof Icon>;

export type SidebarButton = {
  icon: IconProps["name"];
  title: string;
  href: string;
};

export function Sidebar({ buttons }: { buttons: SidebarButton[] }) {
  return (
    <View borderColor={"$secondary100"} borderWidth={1} borderRadius={"$radius.l"} margin="$base">
      <View
        paddingVertical={"$ml"}
        borderBottomWidth={1}
        borderColor={"$secondary100"}
        paddingHorizontal={"$2xl"}>
        <Icon name="mdp-wordmark" />
      </View>
      <View gap={"$3xl"} alignItems="center" paddingVertical={"$ml"} paddingHorizontal="$2xl">
        {buttons.map((button, index) => (
          <Link key={index} href={button.href}>
            <View key={index} gap="$s" alignItems="center">
              <Icon name={button.icon} color="black" />
              <StyledText>{button.title}</StyledText>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
}
