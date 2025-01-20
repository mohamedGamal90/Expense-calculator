import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { getTokens, View } from "@aurora/components";
import { DialogFlowBtn } from "@aurora/blocks";

export function SetPinScreen({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);
  const { color } = getTokens();

  return (
    <View f={1} jc="center" ai="center">
      <DialogFlowBtn close={true} />
      {loading && <ActivityIndicator size="large" color={color.$primary800.val} />}
      <iframe
        style={{
          flex: loading ? 0 : 1,
          width: loading ? "0%" : "100%",
          height: loading ? "0%" : "100%",
          border: "none",
        }}
        src={src}
        onLoad={() => setLoading(false)}
      />
    </View>
  );
}
