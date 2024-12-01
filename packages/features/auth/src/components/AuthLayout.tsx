import { PropsWithChildren } from "react";
import { View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { Image } from "expo-image";
import { Link } from "expo-router";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <View paddingHorizontal={"$6xl"} flex={1} backgroundColor={"white"} flexDirection="row">
      <View w={"50%"} alignItems="center" paddingHorizontal={"$3xl"} paddingVertical={"$base"}>
        <View width={"100%"} paddingVertical={"$base"}>
          <Link href={"/"}>
            <Icon name="mdp-wordmark" />
          </Link>
        </View>
        <View my={"$auto"} w={"100%"} gap={"$5xl"} justifyContent="center">
          {children}
        </View>
      </View>
      <View w={"50%"} backgroundColor={"white"}>
        <Image
          style={{
            flex: 1,
          }}
          source={require("../assets/login-img.png")}
          contentFit="cover"
        />
      </View>
    </View>
  );
}
