import { ChakraTheme } from "@chakra-ui/react";

const body = {
  fontWeight: "normal",
  lineHeight: "base",
};

const title = {
  fontWeight: "semibold",
  lineHeight: "shorter",
};

const textStyles: ChakraTheme["textStyles"] = {
  display: {
    ...title,
    fontSize: "2rem",
  },

  title: {
    ...title,
    fontSize: "1.5rem",
  },

  label: {
    ...title,
    lineHeight: "base",
    fontWeight: "semibold",
  },

  label2: {
    ...title,
    fontSize: "0.875rem",
    fontWeight: "semibold",
  },

  body: {
    ...body,
  },
  body2: {
    ...body,
    fontSize: "0.875rem",
  },

  button: {
    ...body,
    fontWeight: "medium",
  },
};

export default textStyles;
