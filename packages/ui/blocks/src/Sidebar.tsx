import { getTokens, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { Link, usePathname, useRouter } from "expo-router";
import { Image } from "expo-image";
import { deleteValue, StoreKey } from "@aurora/utils";
import { LogoutButton } from "./LogoutButton";

type IconProps = React.ComponentProps<typeof Icon>;

export type SidebarButton = {
  icon: IconProps["name"];
  title: string;
  href: string;
  disabled: boolean;
};

export function Sidebar({ buttons }: { buttons: SidebarButton[] }) {
  const pathName = usePathname();
  const router = useRouter();
  const { color } = getTokens();

  const itemColor = (href: string, disabled: boolean) => {
    if (href === pathName) return color.$primary800.val;
    else if (disabled) return color.$secondary400.val;
    else return color.$secondary900.val;
  };
  const handleOnLogout = () => {
    deleteValue(StoreKey.AccessToken);

    router.replace("/");
  };
  return (
    <View
      $sm={{
        display: "none",
      }}
      borderColor="$secondary100"
      borderWidth={1}
      borderRadius="$l"
      margin="$base">
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
          <View
            width={"100%"}
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            key={index}>
            {item.href === pathName && (
              <View
                position="absolute"
                left={0}
                width={7}
                height={42}
                borderRadius="$l"
                backgroundColor="$primary800"
              />
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
