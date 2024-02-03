import { Icon } from "@chakra-ui/react";
import type { IconProps } from "@chakra-ui/react";
// This is inneficient, but it's the only way to get the icons to work. Ideally, we would only import the icons we need.
import * as Iconoir from "iconoir-react";

interface IconoirIconProviderProps extends IconProps {
  icon: string;
}

const IconoirIconProvider = ({ icon, ...props }: IconoirIconProviderProps) => {
  const icons = Iconoir as unknown as Record<string, React.FC<IconProps>>;

  const SelectedIcon = icons[icon];

  return <Icon as={SelectedIcon || Iconoir.QuestionMark} {...props} />;
};

export default IconoirIconProvider;
