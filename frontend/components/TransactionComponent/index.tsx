import {
  Flex,
  Text,
  Box,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Transaction } from "@/interfaces";
import { ArrowRight, CartAlt, Download } from "iconoir-react";
import dayjs from "dayjs";
import { useDisclosure } from "@chakra-ui/react";
import Dinero, { Currency, Dinero as IDinero } from "dinero.js";
import { useMemo } from "react";
import * as Inconoir from "iconoir-react";
import IconoirIconProvider from "../IconoirIconProvider";

export interface UITransaction extends Omit<Transaction, "amount"> {
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
    // TODO: Change this to a Button // TODO: Change this to a Grid
    <>
      <Grid
        width="full"
        templateAreas='"time id details amount-status"'
        templateColumns="1fr 1fr 3fr 1.5fr"
        templateRows="1fr"
        gap={12}
        borderBottomWidth={isLast ? "0px" : "1px"}
        borderColor="outline"
        p={3}
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
            <Flex
              boxSize={8}
              borderWidth="1px"
              borderColor="outline"
              borderRadius="8px"
              align="center"
              justify="center"
            >
              <IconoirIconProvider icon={transaction.category.iconName} />
            </Flex>

            <VStack align="start" spacing="0">
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
              >
                {transaction.amount.toFormat()}
              </Text>
              <Text textStyle="body2">{transaction.status}</Text>
            </VStack>
            <Icon as={ArrowRight} />
          </HStack>
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            background="#F4F4F5"
            maxW="572px"
            borderRadius="20px"
            padding="32px"
          >
            <Text
              marginTop="16px"
              textStyle="title"
              color={
                transaction.amount.getAmount() >= 0 ? "#3E9C42" : "#9A1111"
              }
            >
              {transaction.amount.toFormat()}
            </Text>
            <Text textStyle="label">{transaction.merchantName}</Text>

            <Text textStyle="body2" opacity="50%">
              {dayjs.utc(transaction.createdAt).local().format("dddd, HH:mmA")}
            </Text>

            <Box
              background="#fff"
              borderRadius="20px"
              padding="24px"
              marginTop="16px"
            >
              <VStack spacing="12px">
                <Flex justify="space-between" align="center" w="full">
                  <Text opacity="50%">Transaction ID:</Text>
                  <Text fontWeight="bold">{transaction.id}</Text>
                </Flex>

                <Flex justify="space-between" align="center" w="full">
                  <Text opacity="50%">Reference:</Text>
                  <Text fontWeight="bold">{transaction.reference}</Text>
                </Flex>

                <Flex justify="space-between" align="center" w="full">
                  <Text opacity="50%">Category:</Text>
                  <HStack spacing="8px">
                    <Flex
                      w="32px"
                      h="32px"
                      border="1px"
                      borderColor="outline"
                      borderRadius="8px"
                      align="center"
                      justify="center"
                    >
                      <Icon as={CartAlt} />
                    </Flex>
                    <Text fontWeight="bold">{transaction.category.name}</Text>
                  </HStack>
                </Flex>
              </VStack>
            </Box>

            <Box
              background="#fff"
              borderRadius="20px"
              padding="24px"
              marginTop="16px"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text opacity="50%">Status:</Text>
                <Text fontWeight="bold">{transaction.status}</Text>
              </Flex>

              <Flex justify="space-between" align="center" mb={2}>
                <Text opacity="50%">Card:</Text>
                <Text fontWeight="bold">{transaction.card?.cardNumber}</Text>
              </Flex>
            </Box>

            <Box
              background="#fff"
              borderRadius="20px"
              padding="24px"
              marginTop="16px"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text opacity="50%">Download </Text>
                <IconButton
                  aria-label="Details"
                  icon={<Icon as={Download} />}
                  variant="tertiary"
                />
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionComponent;

interface TransactionsListProps {
  transactions: Transaction[];
}

interface TransactionsListByDate {
  [key: string]: {
    transactions: UITransaction[];
    balance: IDinero;
  };
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  const formattedTransactions = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      const date = dayjs.utc(transaction.createdAt).format("YYYY-MM-DD");

      if (!acc[date]) {
        acc[date] = {
          transactions: [] as UITransaction[],
          balance: Dinero({
            amount: 0,
            currency: transaction.currency as Currency,
          }),
        };
      }

      acc[date].transactions.push({
        ...transaction,
        amount: Dinero({
          amount: parseInt(transaction.amount) * 100,
          currency: transaction.currency as Currency,
        }),
      });
      acc[date].balance = acc[date].balance.add(
        Dinero({
          amount: parseInt(transaction.amount) * 100,
          currency: transaction.currency as Currency,
        })
      );

      return acc;
    }, {} as TransactionsListByDate);
  }, [transactions]);

  return (
    <VStack w="full" align="stretch" spacing={0}>
      {formattedTransactions &&
        Object.keys(formattedTransactions).map((date, index) => {
          const transactionsList = formattedTransactions[date].transactions;
          const balance = formattedTransactions[date].balance;

          return (
            <Box
              key={`transaction-date-${date}`}
              w="full"
              paddingBottom={8}
              borderTopWidth="thin"
              borderTopColor={index === 0 ? "transparent" : "outline"}
            >
              <HStack justifyContent="space-between" p={3}>
                <Text
                  textStyle="label2"
                  opacity="50%"
                  marginTop={index === 0 ? "0px" : "16px"}
                >
                  {dayjs(date).format("dddd, D/MM/YYYY")}
                </Text>
                <Text
                  textStyle="label"
                  color={balance.getAmount() > 0 ? "#3E9C42" : "#9A1111"}
                  paddingRight={12}
                >
                  {balance.toFormat()}
                </Text>
              </HStack>
              {transactionsList.map((transaction, transactionIndex) => {
                return (
                  <TransactionComponent
                    key={`transaction-${transaction.id}`}
                    transaction={transaction}
                    isLast={transactionIndex === transactionsList.length - 1}
                  />
                );
              })}
            </Box>
          );
        })}
    </VStack>
  );
};
