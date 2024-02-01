import { ChakraTheme } from "@chakra-ui/react";

const textStylesGeneral = {
  fontWeight: "semibold",
  lineHeight: "shorter",
  color: "onBackground",
};

const textStyles: ChakraTheme["textStyles"] = {
  display: {
    ...textStylesGeneral,
    fontSize: "32px",
  },

  title: {
    ...textStylesGeneral,
    fontSize: "24px",
  },

  label: {
    ...textStylesGeneral,
    lineHeight: "base",
    fontWeight: "semibold",
  },

  label2: {
    ...textStylesGeneral,
    fontSize: "14px",
    fontWeight: "semibold",
  },

  body: {
    ...textStylesGeneral,
    fontSize: "16px",
  },
  body2: {
    ...textStylesGeneral,
    fontSize: "14px",
    fontWeight: "regular",
  },
};

export default textStyles;
