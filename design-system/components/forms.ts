import { ComponentStyleConfig } from "@chakra-ui/react";

// Variants and sizes override global values, this is a limitiation of Chakra buttons :|
// I preffer use this instead of !important for global styling
const buttonSizes = ["sm", "md", "lg"].reduce(
  (sizes: { [key: string]: any }, size) => {
    sizes[size] = {
      padding: "2em 3em",
    };
    return sizes;
  },
  {}
);

// TODO: Modify readme the color roles
const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "lg",
  },
  sizes: {
    ...buttonSizes,
    xs: {
      padding: "2em 2.5em",
    },
  },
  variants: {
    primary: {
      color: "onPrimary",
      bg: "primary",

      _hover: {
        color: "onPrimaryHover",
        bg: "primaryHover",
      },
    },
    secondary: {
      color: "onSecondary",
      bg: "secondary",
      border: "1px solid",
      borderColor: "onSecondary",
      _hover: {
        color: "onSecondaryHover",
        bg: "secondaryHover",
      },
    },
    tertiary: {
      color: "onTertiary",
      bg: "tertiary",
      _hover: {
        color: "onTertiaryHover",
        bg: "tertiaryHover",
      },
    },
    danger: {
      color: "onDanger",
      bg: "danger",
      _hover: {
        bg: "dangerHover",
        color: "onDangerHover",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};

const Input: ComponentStyleConfig = {
  variants: {
    default: {
      field: {
        backgroundColor: "field",
        color: "onfield",
        border: "none",
        padding: "2em",
        borderRadius: "lg",
      },
    },
  },
  defaultProps: {
    variant: "default",
  },
};

export const Form: ComponentStyleConfig = {
  parts: ["container", "requiredIndicator", "helperText"],
  baseStyle: {
    container: {
      label: {
        textStyle: "label",
      },
    },
  },
};

const forms = {
  Button,
  Form,
  Input,
};

export default forms;
