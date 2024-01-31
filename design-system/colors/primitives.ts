type ColorFunction = (lightness: number, alpha?: number) => string;

type CreateHslBaseColorFuction = (
  hue: string | number,
  saturation: number
) => ColorFunction;

export interface ColorPrimitives {
  red: ColorFunction;
  yellow: ColorFunction;
  blue: ColorFunction;
  green: ColorFunction;
  purple: ColorFunction;
  orange: ColorFunction;
  gray: ColorFunction;
}

type GetColorFunction = (
  color: keyof ColorPrimitives,
  lightness: number,
  alpha?: number
) => string;

const createHslBaseColor: CreateHslBaseColorFuction = (hue, saturation) => {
  return (lightness: number, alpha?: number) => {
    if (alpha) {
      return `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`;
    }
    return `hsl(${hue} ${saturation} ${lightness})`;
  };
};

const primitives: ColorPrimitives = {
  yellow: createHslBaseColor(47, 90),
  red: createHslBaseColor(0, 90),
  blue: createHslBaseColor(215, 90),
  green: createHslBaseColor(140, 90),
  purple: createHslBaseColor(270, 90),
  orange: createHslBaseColor(35, 90),
  gray: createHslBaseColor(0, 0),
};

export const getColor: GetColorFunction = (color, lightness, alpha = 1) =>
  primitives[color](lightness, alpha);

export default primitives;
