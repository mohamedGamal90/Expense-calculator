import { RootView, ScrollView, useMedia, View } from "@aurora/components";
// import { Lang, changeLang } from "@metroid/localization";
// import { useSettingStore } from "@metroid/store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// const items = [
//   { label: "EN", value: "en" },
//   { label: "AR", value: "ar" },
// ];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const media = useMedia();
  // const { lang } = useSettingStore();

  return (
    <RootView
      $gtMd={{
        px: "$4xl",
      }}
      f={1}
      fw="wrap"
      bg="white"
      fd="row-reverse">
      <View
        $gtMd={{
          w: "50%",
          h: "100%",
          py: "$base",
        }}
        w="100%">
        {media.md ? (
          <View w="100%" t={-10} h={70} br="$sm" bg="white" opacity={0.73} jc="center">
            <Image
              source={require("./logo.png")}
              style={{ width: "100%", height: "70%" }}
              contentFit="contain"
            />
          </View>
        ) : (
          <Image
            style={{
              flex: 1,
            }}
            priority="high"
            source={require("../assets/login-img.png")}
            contentFit="contain"
          />
        )}
      </View>
      <View
        $gtMd={{
          w: "50%",
          h: "100%",
        }}
        w="100%"
        px="$m"
        alignItems="center"
        py="$base">
        {media.gtMd && (
          <View fd="row" jc="space-between" ai="center" mb="$xl" width="100%" py="$base" h={100}>
            <View
              cursor="pointer"
              f={0.4}
              h="100%"
              alignSelf="flex-start"
              onPress={() => router.push("/")}>
              <Image
                source={require("./logo.png")}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
              />
            </View>

            {/* <View flex={0.2}>
              <StyledSelect
                items={items}
                value={lang as string}
                onSelect={value => changeLang(value as Lang)}
              />
            </View> */}
          </View>
        )}

        <ScrollView style={{ width: "100%", flex: 1, paddingRight: 13 }}>
          <View gap="$5xl">{children}</View>
        </ScrollView>
      </View>
    </RootView>
  );
}
