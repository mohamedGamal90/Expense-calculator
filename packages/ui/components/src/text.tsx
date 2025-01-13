import { type GetProps, styled, Text } from "tamagui";

export const StyledText = styled(Text, {
  unstyled: true,
  color: "$secondary900",
  fontFamily: "Tajawal_400Regular",
  variants: {
    variant: {
      Heading6xl: { fontSize: 44, lineHeight: 44, fontFamily: "Tajawal_700Bold" },
      Heading5xl: { fontSize: 40, lineHeight: 40, fontFamily: "Tajawal_700Bold" },
      Heading4xl: { fontSize: 32, lineHeight: 32, fontFamily: "Tajawal_700Bold" },
      Heading3xl: { fontSize: 28, lineHeight: 28, fontFamily: "Tajawal_700Bold" },
      Heading2xl: { fontSize: 24, lineHeight: 24, fontFamily: "Tajawal_700Bold" },
      Headingxl: { fontSize: 20, lineHeight: 20, fontFamily: "Tajawal_700Bold" },
      Headingl: { fontSize: 18, lineHeight: 18, fontFamily: "Tajawal_700Bold" },
      BodyBoldml: { fontSize: 18, lineHeight: 18, fontFamily: "Tajawal_700Bold" },
      BodySemiBoldml: { fontSize: 18, lineHeight: 18, fontFamily: "Tajawal_500Medium" },
      BodymL: { fontSize: 18, lineHeight: 18, fontFamily: "Tajawal_400Regular" },
      BodyBoldm: { fontSize: 16, lineHeight: 16, fontFamily: "Tajawal_700Bold" },
      BodySemiBoldm: { fontSize: 16, lineHeight: 16, fontFamily: "Tajawal_500Medium" },
      Bodym: { fontSize: 16, lineHeight: 16, fontFamily: "Tajawal_400Regular" },
      BodyBoldsm: { fontSize: 14, lineHeight: 14, fontFamily: "Tajawal_700Bold" },
      BodySemiBoldsm: { fontSize: 14, lineHeight: 14, fontFamily: "Tajawal_500Medium" },
      Bodysm: { fontSize: 14, lineHeight: 14, fontFamily: "Tajawal_400Regular" },
      BodySemiBolds: { fontSize: 12, lineHeight: 12, fontFamily: "Tajawal_500Medium" },
      Bodys: { fontSize: 12, lineHeight: 12, fontFamily: "Tajawal_400Regular" },
      BodySemiBoldxs: { fontSize: 10, lineHeight: 10, fontFamily: "Tajawal_500Medium" },
      Bodyxs: { fontSize: 10, lineHeight: 10, fontFamily: "Tajawal_400Regular" },
    },
  },
} as const);

export type StyledTextProps = GetProps<typeof StyledText>;
