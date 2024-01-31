# Design System

The design system is a set of reusable components, styles, and patterns that can be used to build a consistent user experience across all of the products. The design system is built using Chakra UI and includes a set of predefined color roles, text styles, and box styles. It also includes a set of pre-built components that are styled according to the design system's color roles, text styles, and box styles.

## Folder Structure

The design system is located in the `design-system` directory. The directory contains the following files and directories:

- `colors`: Contains the primitive(`primitives.ts`) and role(`roles.ts`) colors.
- `components`: Contains the pre-built components that are styled according to the design system's color roles, text styles, and box styles. Also contains the `components.ts` file that defines the custom component styles on the Chakra UI theme.
- `TextStyles`: Contains the predefined text styles.
- `BoxStyles`: Contains the predefined box styles.
- `GlobalStyles`: Contains the global styles.
- `index.ts`: Defines the Chakra UI theme.

## Color Primitives

The design system uses color primitives to create a hierarchy of colors. The color primitives include neutral colors and other colors, such as **red, blue, green, and yellow**. Every one of them will be a tonal palette. A tonal palette consists of thirteen tones, including white and black. A tone value of 100 equals light at its maximum and results in white. Every tone value between 0 and 100 expresses the amount of light present in color. For the alpha colors, 0 will be transparent and 100 will be opaque.

The color primitives are defined in the `colors.ts` file and included in the Chakra UI theme defined in the index.ts of the project's root.

For example, the base color is defined as follows:

```tsx
const blue = createHslBaseColor(215, 99); // 215 is the hue and 99 is the saturation
// ...

const primitives = {
  blue,
  // ...
};

export default primitives;
```

Then, we can use the color with the function `getColor` as follows:

```tsx
const linkColor = getColor("blue", 50); // 50 is the lightness
const linkColorHover = getColor("blue", 50, 0.5); // 50 is the lightness and .5 is the alpha
```

### Color Roles

Color roles are derived from color primitives and used for various UI components. Each color role has a specific purpose in the UI and their designated color key for elements on top of them with the prefix **'on'**. They also contain de config for the **light** and **dark** profile theme. These are the color roles:

| Color Role     | On Key           | Description                                                                                                                                  |
| -------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary        | onPrimary        | Used to derive roles for key components across the UI, such as the FAB, prominent buttons, active states, and the tint of elevated surfaces. |
| PrimaryHover   | onPrimaryHover   | Hover state for primary color components.                                                                                                    |
| Secondary      | onSecondary      | Used for secondary actions, less prominent components, or alternative choices in a given context.                                            |
| SecondaryHover | onSecondaryHover | Hover state for secondary color components.                                                                                                  |
| Tertiary       | onTertiary       | Used for tertiary actions, disabled states, or alternative choices in a given context.                                                       |
| TertiaryHover  | onTertiaryHover  | Hover state for tertiary color components.                                                                                                   |
| Error          | onError          | Indicates an error or warning state.                                                                                                         |
| ErrorHover     | onErrorHover     | Hover state for error color components.                                                                                                      |
| Success        | onSuccess        | Indicates a success state.                                                                                                                   |
| SuccessHover   | onSuccessHover   | Hover state for success color components.                                                                                                    |
| Info           | onInfo           | Indicates an informational state.                                                                                                            |
| InfoHover      | onInfoHover      | Hover state for info color components.                                                                                                       |
| Warning        | onWarning        | Indicates a warning state.                                                                                                                   |
| WarningHover   | onWarningHover   | Hover state for warning color components.                                                                                                    |
| Discovery      | onDiscovery      | Indicates something new, such as onboarding or new feature information.                                                                      |
| DiscoveryHover | onDiscoveryHover | Hover state for discovery color components.                                                                                                  |
| Background     | onBackground     | Used for the app's background.                                                                                                               |
| Surface        | onSurface        | Used for the background of elevated surfaces, such as cards, sheets, and dialogs.                                                            |
| Outline        | onOutline        | Outlines components like buttons and text fields.                                                                                            |
| Overlay        | onOverlay        | Overlays components, such as modals and menus.                                                                                               |
| Shadow         | onShadow         | Used to shadow components like cards and sheets.                                                                                             |
| Fields         | onFields         | Background color for form fields, such as inputs and text areas.                                                                             |

This is an example of how the primary color is defined in the `colors.ts` file:

```tsx
const roles = {
  primary: {
    default: getColor("blue", 50),
    _dark: getColor("blue", 80),
  },
  // This color is defined for the content that could be seen on top of the primary color.
  onPrimary: {
    default: getColor("gray", 10)
    _dark: getColor("gray", 80)
  },
  // ...
};

export default roles;
```

## Text Styles

Text styles are predefined sets of ChakraUI properties that can be applied to various text elements. These text styles are responsive and include media queries for phone, tablet, and desktop. Each text style has a specific purpose:

- Display: This token is used for large display text, often seen in banners or introductory sections, and is designed to be visually striking and attention-grabbing.
- Headline: This token is used for large headings, such as section titles, and is designed to be visually prominent and easy to read.
- Title: This token is used for medium-sized titles, often seen in cards or subsections, and is designed to be easily scannable and stand out among body text.
- Label: This token is used for labeling form fields, buttons, or other interactive elements, and is designed to be clear and concise.
- Body: This token is used for general body text, providing a comfortable reading experience for long-form content.
  To use a text style, apply the Chakra UI properties to your components:

```tsx
import { Text } from "@chakra-ui/react";

<Text textStyle="display">Display Text</Text>;
```

## Components (Coming Soon)

The design system provides a set of pre-built components that are styled according to the design system's color roles, text styles, and box styles. Custom component styles are defined in the components.ts file and included in the Chakra UI theme defined in the index.ts of the project's root.

For example, a Card component can be created as follows:

1. Create a new file in the `design-system/components` directory called `card.ts`.

```tsx
import { ComponentStyleConfig } from "@chakra-ui/react";

const Card = defineStyleConfig({
  // The styles all Cards have in common
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    alignItems: "center",
    gap: 6,
  },
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: "xl",
      boxShadow: "xl",
    },
    smooth: {
      padding: 6,
      borderRadius: "base",
      boxShadow: "md",
    },
  },
  // The default variant value
  defaultProps: {
    variant: "smooth",
  },
});
```

2. Add the component to the `index.ts` file in the `design-system/components` directory.

```tsx
import { ComponentStyleConfig } from "@chakra-ui/react";

export const components: Record<string, ComponentStyleConfig> = {
  // ...
  Card,
};
```

3. Create a new file in the `features/shared/components` directory called `Card.tsx`.

```tsx
import { Box, useStyleConfig } from "@chakra-ui/react";

function Card(props) {
  const { variant, ...rest } = props;

  const styles = useStyleConfig("Card", { variant });

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />;
}

export default Card;
```

4. Then, we can use a component and include it in your JSX:

```tsx
import { Text } from "@chakra-ui/react";
import { Card } from "@/features/shared/components";

function App() {
  return (
    <>
      {/** ... */}
      <Card variant="rounded">
        <Text>Card Title</Text>
        <Text>Card content</Text>
      </Card>
    </>
  );
}
```

For more information on how to create custom components, refer to the Chakra UI documentation on [Style Config](https://chakra-ui.com/docs/styled-system/component-style).

By following these guidelines and using the provided design system components, you can create a consistent and coherent user interface that adheres to UI/UX best practices.

For more detailed information on each aspect of the design system, refer to the corresponding files and folders within the design-system directory.
