import { getTokens, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { Link, usePathname } from "expo-router";

type IconProps = React.ComponentProps<typeof Icon>;

export type SidebarButton = {
  icon: IconProps["name"];
  title: string;
  href: string;
};

export function Sidebar({ buttons }: { buttons: SidebarButton[] }) {
  const pathName = usePathname();
  const { color } = getTokens();

  return (
    <View borderColor="$secondary100" borderWidth={1} borderRadius="$l" margin="$base">
      <View
        paddingVertical="$ml"
        borderBottomWidth={1}
        borderColor="$secondary100"
        paddingHorizontal="$2xl">
        <Icon name="lib-wordmark" width={100} />
      </View>
      <View gap="$3xl" alignItems="center" justifyContent="center" paddingVertical="$l">
        {buttons.map((button, index) => (
          <View
            width={"100%"}
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            key={index}>
            {button.href === pathName && (
              <View
                position="absolute"
                left={0}
                width={7}
                height={42}
                borderRadius="$l"
                backgroundColor="$primary800"
              />
            )}
            <Link key={index} href={button.href}>
              <View key={index} gap="$s" alignItems="center">
                <Icon
                  name={button.icon}
                  color={button.href === pathName ? color.$primary800.val : color.$secondary900.val}
                />
                <StyledText color={button.href === pathName ? "$primary800" : "$secondary900"}>
                  {button.title}
                </StyledText>
              </View>
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}
