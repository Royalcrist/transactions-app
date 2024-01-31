import { ColorPrimitives, getColor } from "@/design-system/colors/primitives";

const onBackground = {
  _dark: getColor("gray", 80, 0.8),
  default: getColor("gray", 10),
};

const secondaryHover = {
  _dark: getColor("blue", 20),
  default: getColor("blue", 95),
};

const onLight = getColor("gray", 100);

const createColorAccentStates = (
  name: string,
  color: keyof ColorPrimitives
) => ({
  [name]: {
    _dark: getColor(color, 55),
    default: getColor(color, 50),
  },
  [`${name}Hover`]: {
    _dark: getColor(color, 65),
    default: getColor(color, 60),
  },
});

const primary = createColorAccentStates("primary", "blue");
const success = createColorAccentStates("success", "green");
const warning = createColorAccentStates("warning", "yellow");
const error = createColorAccentStates("error", "red");
const info = createColorAccentStates("info", "purple");
const discovery = createColorAccentStates("discovery", "orange");

const roles = {
  // Background
  background: {
    _dark: getColor("blue", 7),
    default: getColor("gray", 100),
  },
  onBackground,

  // Primary
  ...primary,
  onPrimary: onLight,
  onPrimaryHover: {
    _dark: onLight,
    default: onLight,
  },

  // Secondary
  secondary: "transparent",
  secondaryHover,
  onSecondary: onBackground,
  onSecondaryHover: onBackground,

  // Tertiary
  tertiary: "transparent",
  tertiaryHover: secondaryHover,
  onTertiary: onBackground,
  onTertiaryHover: onBackground,

  // Success
  ...success,
  onSuccess: onLight,
  onSuccessHover: onLight,

  // Warning
  ...warning,
  onWarning: onLight,
  onWarningHover: onLight,

  // Error
  ...error,
  onError: onLight,
  onErrorHover: onLight,

  // Info
  ...info,
  onInfo: onLight,
  onInfoHover: onLight,

  // Discovery
  ...discovery,
  onDiscovery: onLight,
  onDiscoveryHover: onLight,

  // Rest of the roles
  field: {
    _dark: getColor("blue", 20),
    default: getColor("gray", 5),
  },
  onfield: onBackground,
  overlay: getColor("gray", 20),
  outline: onBackground,
  shadow: {
    _dark: getColor("gray", 100, 0.05),
    default: getColor("gray", 0, 0.05),
  },
};

export default roles;
