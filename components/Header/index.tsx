import type { User } from "@/interfaces";
import {
  Avatar,
  HStack,
  type StackProps,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import Dinero, { type Currency } from "dinero.js";
import { memo } from "react";

export interface HeaderProps extends StackProps {
  user: User;
}

const Header = memo(({ user, ...props }: HeaderProps) => {
  return (
    <VStack spacing={4} width="full" height="100%" {...props}>
      <HStack width="full" justify="space-between">
        <HStack spacing={4} alignItems="center" width="full">
          <Avatar name={user.name} />
          <Text textStyle="display">Hello {user.name}!</Text>
        </HStack>
        <Text
          textStyle="label"
          whiteSpace="nowrap"
          padding={4}
          borderRadius="md"
          backgroundColor="secondary"
          color="onSecondary"
        >
          <Box
            as="span"
            aria-label="balance"
            role="img"
            marginRight={2}
            opacity={0.5}
          >
            Balance:{" "}
          </Box>
          {Dinero({
            amount: Number(user.balance) * 100,
            currency: user.currency as Currency,
          }).toFormat()}
        </Text>
      </HStack>
    </VStack>
  );
});

Header.displayName = "Header";

export default Header;
