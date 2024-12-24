import { type GetProps, styled, Text } from "tamagui";

export const StyledText = styled(Text, {
  unstyled: true,
  color: "$secondary900",
  textAlign: "auto",
  fontFamily: "Tajawal_400Regular",
  variants: {
    variant: {
      Heading6xl: { fontSize: 44, fontFamily: "Tajawal_700Bold" },
      Heading5xl: { fontSize: 40, fontFamily: "Tajawal_700Bold" },
      Heading4xl: { fontSize: 32, fontFamily: "Tajawal_700Bold" },
      Heading3xl: { fontSize: 28, fontFamily: "Tajawal_700Bold" },
      Heading2xl: { fontSize: 24, fontFamily: "Tajawal_700Bold" },
      Headingxl: { fontSize: 20, fontFamily: "Tajawal_700Bold" },
      Headingl: { fontSize: 18, fontFamily: "Tajawal_700Bold" },
      BodyBoldml: { fontSize: 18, fontFamily: "Tajawal_700Bold" },
      BodySemiBoldml: { fontSize: 18, fontFamily: "Tajawal_500Medium" },
      // BodyItalicmL: { fontSize: 18, fontStyle: "italic" },
      BodymL: { fontSize: 18, fontFamily: "Tajawal_400Regular" },
      BodyBoldm: { fontSize: 16, fontFamily: "Tajawal_700Bold" },
      BodySemiBoldm: { fontSize: 16, fontFamily: "Tajawal_500Medium" },
      // BodyItalicm: { fontSize: 16, fontStyle: "italic" },
      Bodym: { fontSize: 16, fontFamily: "Tajawal_400Regular" },
      BodyBoldsm: { fontSize: 14, fontFamily: "Tajawal_700Bold" },
      BodySemiBoldsm: { fontSize: 14, fontFamily: "Tajawal_500Medium" },
      // BodyItalicsm: { fontSize: 14, fontStyle: "italic" },
      Bodysm: { fontSize: 14, fontFamily: "Tajawal_400Regular" },
      BodySemiBolds: { fontSize: 12, fontFamily: "Tajawal_500Medium" },
      // BodyItalics: { fontSize: 12, fontStyle: "italic" },
      Bodys: { fontSize: 12, fontFamily: "Tajawal_400Regular" },
      BodySemiBoldxs: { fontSize: 10, fontFamily: "Tajawal_500Medium" },
      // BodyItalicxs: { fontSize: 10, fontStyle: "italic" },
      Bodyxs: { fontSize: 10, fontFamily: "Tajawal_400Regular" },
    },
  },
} as const);

export type StyledTextProps = GetProps<typeof StyledText>;
