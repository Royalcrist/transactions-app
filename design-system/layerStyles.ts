import { ChakraTheme } from "@chakra-ui/react";

const layerStyles: ChakraTheme["layerStyles"] = {
  glassSurface: {
    bg: "linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
};

export default layerStyles;
