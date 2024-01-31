import { ChakraTheme } from "@chakra-ui/react";

const textStylesGeneral = {
  fontWeight: "semibold",
  lineHeight: "shorter",
  color: "onBackground",
};

const textStyles: ChakraTheme["textStyles"] = {
  display: {
    ...textStylesGeneral,
    fontSize: ["4xl", "5xl", "6xl"],
  },
  title: {
    ...textStylesGeneral,
    fontSize: ["xl", "2xl", "3xl"],
  },
  label: {
    ...textStylesGeneral,
    lineHeight: "base",
  },
};

export default textStyles;
