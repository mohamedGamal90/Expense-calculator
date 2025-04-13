import { getTokens, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { Link, usePathname } from "expo-router";
import type { RelativePathString } from "expo-router/build/types";
import { Image } from "expo-image";
import { LogoutButton } from "./LogoutButton";

type IconProps = React.ComponentProps<typeof Icon>;

export type SidebarButton = {
  icon: IconProps["name"];
  title: string;
  href: RelativePathString;
  disabled: boolean;
};

export function Sidebar({ buttons }: { buttons: SidebarButton[] }) {
  const pathName = usePathname();
  const { color } = getTokens();

  const itemColor = (href: string, disabled: boolean) => {
    if (href === pathName) return color.$primary800.val;
    else if (disabled) return color.$secondary400.val;
    else return color.$secondary900.val;
  };

  return (
    <View $sm={{ display: "none" }} bc="$secondary100" borderWidth={1} br="$l" margin="$base">
      <View
        paddingVertical="$ml"
        borderBottomWidth={1}
        borderColor="$secondary100"
        paddingHorizontal="$2xl">
        <Image
          source={require("../../../features/auth/src/components/logo.png")}
          style={{ width: 120, height: 70 }}
          contentFit="contain"
        />
      </View>
      <View gap="$3xl" alignItems="center" justifyContent="center" paddingVertical="$l">
        {buttons.map((item, index) => (
          <View w="100%" alignItems="center" jc="center" fd="row" key={index}>
            {item.href === pathName && (
              <View pos="absolute" left={0} w={7} h={42} borderRadius="$l" bg="$primary800" />
            )}
            {item.disabled ? (
              <View key={index} gap="$s" alignItems="center">
                <Icon name={item.icon} color={itemColor(item.href, item.disabled)} />
                <StyledText color={itemColor(item.href, item.disabled)}>{item.title}</StyledText>
              </View>
            ) : (
              <Link key={index} disabled={item.disabled} href={item.href}>
                <View key={index} gap="$s" alignItems="center">
                  <Icon name={item.icon} color={itemColor(item.href, item.disabled)} />
                  <StyledText color={itemColor(item.href, item.disabled)}>{item.title}</StyledText>
                </View>
              </Link>
            )}
          </View>
        ))}
      </View>

      <View mt="$auto" p="$m">
        <LogoutButton />
      </View>
    </View>
  );
}
