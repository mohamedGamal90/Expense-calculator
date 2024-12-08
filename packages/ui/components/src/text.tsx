import { type GetProps, styled, Text } from "tamagui";

export const StyledText = styled(Text, {
  unstyled: true,
  color: "$secondary900",
  textAlign: "auto",
  fontFamily: "Inter_900Black",
  variants: {
    variant: {
      Heading6xl: { fontSize: 44, fontFamily: "Inter_700Bold" },
      Heading5xl: { fontSize: 40, fontFamily: "Inter_700Bold" },
      Heading4xl: { fontSize: 32, fontFamily: "Inter_700Bold" },
      Heading3xl: { fontSize: 28, fontFamily: "Inter_700Bold" },
      Heading2xl: { fontSize: 24, fontFamily: "Inter_700Bold" },
      Headingxl: { fontSize: 20, fontFamily: "Inter_700Bold" },
      Headingl: { fontSize: 18, fontFamily: "Inter_700Bold" },
      BodyBoldml: { fontSize: 18, fontFamily: "Inter_700Bold" },
      BodySemiBoldml: { fontSize: 18, fontFamily: "Inter_600SemiBold" },
      BodyItalicmL: { fontSize: 18, fontStyle: "italic" },
      BodymL: { fontSize: 18, fontFamily: "Inter_400Regular" },
      BodyBoldm: { fontSize: 16, fontWeight: "bold" },
      BodySemiBoldm: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
      BodyItalicm: { fontSize: 16, fontStyle: "italic" },
      Bodym: { fontSize: 16, fontFamily: "Inter_400Regular" },
      BodyBoldsm: { fontSize: 14, fontWeight: "bold" },
      BodySemiBoldsm: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
      BodyItalicsm: { fontSize: 14, fontStyle: "italic" },
      Bodysm: { fontSize: 14, fontFamily: "Inter_400Regular" },
      BodySemiBolds: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
      BodyItalics: { fontSize: 12, fontStyle: "italic" },
      Bodys: { fontSize: 12, fontFamily: "Inter_400Regular" },
      BodySemiBoldxs: { fontSize: 10, fontFamily: "Inter_600SemiBold" },
      BodyItalicxs: { fontSize: 10, fontStyle: "italic" },
      Bodyxs: { fontSize: 10, fontFamily: "Inter_400Regular" },
    },
  },
} as const);

export type StyledTextProps = GetProps<typeof StyledText>;
