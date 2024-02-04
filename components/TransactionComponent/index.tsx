import {
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
  Box,
  type BoxProps,
} from "@chakra-ui/react";
import type { UITransaction } from "@/interfaces";
import { ArrowRight } from "iconoir-react";
import dayjs from "dayjs";
import { useDisclosure } from "@chakra-ui/react";
import IconoirIconProvider from "../IconoirIconProvider";
import TransactionModal from "../TransactionModal";
import { memo } from "react";

export interface TransactionProps extends BoxProps {
  transaction: UITransaction;
  isLast: boolean;
}

const TransactionComponent: React.FC<TransactionProps> = memo(
  ({ transaction, isLast, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <Box
        as="button"
        width="full"
        onClick={onOpen}
        _focus={{ outline: "none" }}
        textAlign="left"
        transition="background-color 0.2s"
        _hover={{ bg: "tertiaryHover" }}
        _active={{ bg: "tertiaryActive" }}
        {...props}
      >
        <Grid
          width="full"
          templateAreas='"time id details amount-status"'
          templateColumns="1fr .8fr 3fr 1.5fr"
          templateRows="1fr"
          gap={8}
          borderBottomWidth={isLast ? "0px" : "1px"}
          borderColor="outline"
          p={3}
          alignItems={"center"}
        >
          <GridItem gridArea="time">
            <Text>
              {dayjs.utc(transaction.createdAt).local().format("HH:mmA")}
            </Text>
          </GridItem>
          <GridItem gridArea="id">
            <Text whiteSpace="nowrap">
              <Box as="span" opacity={0.5}>
                ID:{" "}
              </Box>
              <Box as="span" opacity={1}>
                {transaction.id}
              </Box>
            </Text>
          </GridItem>
          <GridItem gridArea="details">
            <HStack spacing={3}>
              {/* Not using padding due a bug in the chakra-ui that makes Icons sizes inconsistent */}
              <Flex
                boxSize={8}
                flexShrink={0}
                borderWidth="1px"
                borderColor="outline"
                borderRadius="md"
                align="center"
                justify="center"
              >
                <IconoirIconProvider
                  icon={transaction.category.iconName}
                  boxSize={4}
                />
              </Flex>

              <VStack align="start" spacing={2}>
                <Text noOfLines={1}>{transaction.reference}</Text>
                <Text textStyle="body2" opacity="50%" noOfLines={1}>
                  {transaction.merchantName}
                </Text>
              </VStack>
            </HStack>
          </GridItem>
          <GridItem gridArea="amount-status">
            <HStack spacing={8} justify="end">
              <VStack align="end" spacing={2}>
                <Text
                  color={
                    transaction.amount.getAmount() >= 0 ? "#3E9C42" : "#9A1111"
                  }
                  textDecoration={
                    transaction.status === "Failed" ? "line-through" : "none"
                  }
                  whiteSpace="nowrap"
                >
                  {transaction.amount.toFormat()}
                </Text>
                <Text textStyle="body2" opacity="50%">
                  {transaction.status}
                </Text>
              </VStack>
              <Icon as={ArrowRight} />
            </HStack>
          </GridItem>
        </Grid>
        <TransactionModal
          isOpen={isOpen}
          onClose={onClose}
          transaction={transaction}
        />
      </Box>
    );
  }
);

TransactionComponent.displayName = "TransactionComponent";

export default TransactionComponent;
