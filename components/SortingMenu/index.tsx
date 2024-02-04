import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  type MenuProps,
} from "@chakra-ui/react";
import IconoirIconProvider from "../IconoirIconProvider";
import { SortBy, SortOrder } from "@/interfaces";

export interface SortingMenuProps extends Omit<MenuProps, "children"> {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortOrderChange?: (sortOrder: SortOrder) => void;
  onSortByChange?: (sortBy: SortBy) => void;
}

const SortingMenu = ({
  sortBy,
  sortOrder,
  onSortOrderChange,
  onSortByChange,
  ...props
}: SortingMenuProps) => {
  return (
    <Menu closeOnSelect={false} {...props}>
      <MenuButton
        as={Button}
        variant="secondary"
        size="xs"
        colorScheme="blue"
        leftIcon={<IconoirIconProvider icon="Sort" />}
      >
        Sort
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue={sortOrder}
          title="Order"
          type="radio"
          onChange={(value) => {
            onSortOrderChange?.(value as SortOrder);
          }}
        >
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          defaultValue={sortBy}
          title="Sort by"
          type="radio"
          onChange={(value) => {
            onSortByChange?.(value as SortBy);
          }}
        >
          <MenuItemOption value="createdAt">Date</MenuItemOption>
          <MenuItemOption value="amount">Amount</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default SortingMenu;
