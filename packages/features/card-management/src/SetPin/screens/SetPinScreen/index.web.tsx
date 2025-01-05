import { getTokens, View } from "@aurora/components";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export function SetPinScreen({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);
  const { color } = getTokens();

  return (
    <>
      {loading && (
        <View flex={1} jc="center" ai="center">
          <ActivityIndicator size="large" color={color.$primary800.val} />
        </View>
      )}
      <iframe
        style={{
          flex: loading ? 0 : 1,
          width: loading ? "0%" : "100%",
          height: loading ? "0%" : "100%",
          border: "none",
        }}
        src={src}
        loading="eager"
        onLoad={() => {
          setLoading(false);
          console.log("Finished loading");
        }}
      />
    </>
  );
}
