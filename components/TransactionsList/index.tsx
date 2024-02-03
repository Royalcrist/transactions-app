import React, { useMemo } from "react";
import { Text, Box, VStack, HStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Transaction } from "@/interfaces";
import Dinero, { Currency, Dinero as IDinero } from "dinero.js";
import { UITransaction } from "../TransactionComponent";
import TransactionComponent from "../TransactionComponent";

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
        balance: Dinero({
          amount: parseInt(transaction.balance) * 100,
          currency: transaction.currency as Currency,
        }),
      });

      if (transaction.status !== "Failed") {
        acc[date].balance = acc[date].balance.add(
          Dinero({
            amount: parseInt(transaction.amount) * 100,
            currency: transaction.currency as Currency,
          })
        );
      }

      return acc;
    }, {} as TransactionsListByDate);
  }, [transactions]);

  return (
    <VStack w="full" gap={6}>
      {formattedTransactions &&
        Object.keys(formattedTransactions).map((date, index) => {
          const transactionsList = formattedTransactions[date].transactions;
          const balance = formattedTransactions[date].balance;

          const getBalanceColor = () => {
            if (balance.getAmount() === 0) {
              return undefined;
            }

            if (balance.getAmount() > 0) {
              return "#3E9C42";
            }

            return "#9A1111";
          };

          return (
            <Box
              key={`transaction-date-${date}`}
              w="full"
              backgroundColor="surface"
              borderRadius="xl"
              padding={4}
            >
              <HStack justifyContent="space-between" p={3}>
                <Text textStyle="label2" opacity="50%">
                  {dayjs(date).format("dddd, D/MM/YYYY")}
                </Text>
                <Text
                  textStyle="label"
                  color={getBalanceColor()}
                  paddingRight={12}
                  opacity={balance.getAmount() === 0 ? "50%" : "100%"}
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

export default TransactionsList;
