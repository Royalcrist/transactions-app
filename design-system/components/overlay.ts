import { ComponentStyleConfig } from "@chakra-ui/react";

const Drawer: ComponentStyleConfig = {
  parts: ["dialog", "body", "panels"],
  baseStyle: {
    dialog: {
      bg: "background",
    },
  },
};

const Modal: ComponentStyleConfig = {
  baseStyle: {
    overlay: {
      bg: "overlay",
    },
    dialog: {
      bg: "background",
    },
    header: {
      color: "onBackground",
    },
  },
};

const overlay = {
  Drawer,
  Modal,
};

export default overlay;
