import { Dimensions } from "react-native";

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const SC_Width = Dimensions.get("window").width;
const SC_HEIGHT = Dimensions.get("window").height;

const [shortDimension, longDimension] =
  SC_Width < SC_HEIGHT ? [SC_Width, SC_HEIGHT] : [SC_HEIGHT, SC_Width];

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export {
  SC_Width,
  SC_HEIGHT,
  scale as s,
  verticalScale as vs,
  moderateScale as ms,
  moderateVerticalScale as mvs,
};
