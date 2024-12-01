import { type GetProps, styled, Text } from "tamagui";

export const StyledText = styled(Text, {
  unstyled: true,
  color: "$black",
  textAlign: "auto",
  fontFamily: "Inter_900Black",
  variants: {
    variant: {
      Heading6xl: { fontSize: 44, fontWeight: "bold" },
      Heading5xl: { fontSize: 40, fontWeight: "bold" },
      Heading4xl: { fontSize: 32, fontWeight: "bold" },
      Heading3xl: { fontSize: 28, fontWeight: "bold" },
      Heading2xl: { fontSize: 24, fontWeight: "bold" },
      Headingxl: { fontSize: 20, fontWeight: "bold" },
      Headingl: { fontSize: 18, fontWeight: "bold" },
      BodyBoldml: { fontSize: 18, fontWeight: "bold" },
      BodySemiBoldml: { fontSize: 18, fontWeight: 700 },
      BodyItalicmL: { fontSize: 18, fontStyle: "italic" },
      BodymL: { fontSize: 18, fontWeight: "normal" },
      BodyBoldm: { fontSize: 16, fontWeight: "bold" },
      BodySemiBoldm: { fontSize: 16, fontWeight: 700 },
      BodyItalicm: { fontSize: 16, fontStyle: "italic" },
      Bodym: { fontSize: 16, fontWeight: "normal" },
      BodyBoldsm: { fontSize: 14, fontWeight: "bold" },
      BodySemiBoldsm: { fontSize: 14, fontWeight: 700 },
      BodyItalicsm: { fontSize: 14, fontStyle: "italic" },
      Bodysm: { fontSize: 14, fontWeight: "normal" },
      BodySemiBolds: { fontSize: 12, fontWeight: 700 },
      BodyItalics: { fontSize: 12, fontStyle: "italic" },
      Bodys: { fontSize: 12, fontWeight: "normal" },
      BodySemiBoldxs: { fontSize: 10, fontWeight: 700 },
      BodyItalicxs: { fontSize: 10, fontStyle: "italic" },
      Bodyxs: { fontSize: 10, fontWeight: "normal" },
    },
  },
} as const);

export type StyledTextProps = GetProps<typeof StyledText>;
