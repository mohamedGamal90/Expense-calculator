import { Slider, SliderProps } from "@aurora/components";

export const SimpleSlider = ({ children, value, max, ...props }: SliderProps) => (
  <Slider defaultValue={value} max={max} step={1} {...props}>
    <Slider.Track>
      <Slider.TrackActive backgroundColor={"$primary200"} />
    </Slider.Track>
    <Slider.Thumb size="$4" index={0} circular backgroundColor={"$primary800"} borderWidth={1} />
    {children}
  </Slider>
);
