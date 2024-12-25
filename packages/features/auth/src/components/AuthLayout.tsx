import { RootView, StyledSelect, View } from "@aurora/components";
import { Lang, changeLang } from "@metroid/localization";
import { useSettingStore } from "@metroid/store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const items = [
  { label: "EN", value: "en" },
  { label: "AR", value: "ar" },
];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { lang } = useSettingStore();

  return (
    <RootView paddingHorizontal={"$4xl"} flex={1} backgroundColor={"white"} flexDirection="row">
      <View w={"50%"} paddingHorizontal="$m" alignItems="center" paddingVertical={"$base"}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb={"$xl"}
          width={"100%"}
          paddingVertical={"$base"}
          height={100}>
          <View
            cursor="pointer"
            flex={0.4}
            height={"100%"}
            alignSelf="flex-start"
            onPress={() => router.push("/")}>
            <Image
              source={require("./logo.png")}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
          <View flex={0.2}>
            {/* <StyledSelect
              items={items}
              value={lang as string}
              onSelect={value => changeLang(value as Lang)}
            /> */}
          </View>
        </View>
        <View flex={1} w={"100%"} gap={"$5xl"} justifyContent="center">
          {children}
        </View>
      </View>
      <View w={"50%"} height={"100%"} backgroundColor={"white"} paddingVertical={"$base"}>
        <Image
          style={{
            flex: 1,
          }}
          priority={"high"}
          source={require("../assets/login-img.png")}
          contentFit="contain"
        />
      </View>
    </RootView>
  );
}
