import {
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { Transaction } from "@/interfaces";
import { ArrowRight } from "iconoir-react";
import dayjs from "dayjs";
import { useDisclosure } from "@chakra-ui/react";
import { Dinero as IDinero } from "dinero.js";
import IconoirIconProvider from "../IconoirIconProvider";
import TransactionModal from "../TransactionModal";

export interface UITransaction extends Omit<Transaction, "amount" | "balance"> {
  balance: IDinero;
  amount: IDinero;
}

export interface TransactionProps {
  transaction: UITransaction;
  isLast: boolean;
}

const TransactionComponent: React.FC<TransactionProps> = ({
  transaction,
  isLast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as="button"
        width="full"
        onClick={onOpen}
        _focus={{ outline: "none" }}
        textAlign="left"
        transition="background-color 0.2s"
        _hover={{ bg: "tertiaryHover" }}
      >
        <Grid
          width="full"
          templateAreas='"time id details amount-status"'
          templateColumns="1fr 1fr 3fr 1.5fr"
          templateRows="1fr"
          gap={12}
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
            <Text>
              <span style={{ opacity: 0.5 }}>ID:</span>
              {transaction.id}
            </Text>
          </GridItem>
          <GridItem gridArea="details">
            <HStack spacing={2}>
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

              <VStack align="start" spacing={0}>
                <Text noOfLines={1}>{transaction.reference}</Text>
                <Text textStyle="body2" opacity="50%" noOfLines={1}>
                  {transaction.merchantName}
                </Text>
              </VStack>
            </HStack>
          </GridItem>
          <GridItem gridArea="amount-status">
            <HStack spacing={8} justify="end">
              <VStack align="end">
                <Text
                  color={
                    transaction.amount.getAmount() >= 0 ? "#3E9C42" : "#9A1111"
                  }
                  textStyle="label"
                  textDecoration={
                    transaction.status === "Failed" ? "line-through" : "none"
                  }
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
      </Box>

      <TransactionModal
        isOpen={isOpen}
        onClose={onClose}
        transaction={transaction}
      />
    </>
  );
};

export default TransactionComponent;
