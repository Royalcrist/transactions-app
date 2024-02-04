import { Box, HStack, Text } from "@chakra-ui/react";
import TransactionComponent from "../TransactionComponent";
import dayjs from "dayjs";
import { Dinero } from "dinero.js";
import { memo } from "react";
import { UITransaction } from "@/interfaces";

export interface TransactionsGroupProps {
  date: string;
  balance: Dinero;
  transactionsList: UITransaction[];
}

const TransactionsGroup = memo(
  ({ date, balance, transactionsList }: TransactionsGroupProps) => {
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
  }
);

TransactionsGroup.displayName = "TransactionsGroup";

export default TransactionsGroup;
