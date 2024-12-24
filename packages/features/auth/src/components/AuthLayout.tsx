import { View } from "@aurora/components";
import { Image } from "expo-image";
import { Link } from "expo-router";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <View paddingHorizontal={"$4xl"} flex={1} backgroundColor={"white"} flexDirection="row">
      <View w={"50%"} alignItems="center" paddingHorizontal={"$3xl"} paddingVertical={"$base"}>
        <View mb={"$xl"} width={"100%"} paddingVertical={"$base"}>
          <View>
            <Link href={"/"}>
              <Image
                source={require("./logo.png")}
                style={{ width: "100%", height: 50 }}
                contentFit="contain"
              />
            </Link>
          </View>
        </View>
        <View flex={1} w={"100%"} gap={"$5xl"} justifyContent="center">
          {children}
        </View>
      </View>
      <View w={"50%"} backgroundColor={"white"}>
        <Image
          style={{
            flex: 1,
          }}
          priority={"high"}
          source={require("../assets/login-img.png")}
          contentFit="cover"
        />
      </View>
    </View>
  );
}
