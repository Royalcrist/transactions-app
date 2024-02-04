import dayjs from "dayjs";
import { useMemo } from "react";
import { Currency } from "dinero.js";
import { Transaction } from "@/interfaces";
import Dinero, { Dinero as IDinero } from "dinero.js";
import { UITransaction } from "@/components/TransactionComponent";

interface TransactionsListByDate {
  [key: string]: {
    transactions: UITransaction[];
    balance: IDinero;
  };
}

const useFormattedTransactions = (transactions: Transaction[]) => {
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

  const formattedTransactionsArray = useMemo(() => {
    return Object.keys(formattedTransactions).map((date) => {
      return {
        date,
        transactions: formattedTransactions[date].transactions,
        balance: formattedTransactions[date].balance,
      };
    });
  }, [formattedTransactions]);

  return formattedTransactionsArray;
};

export default useFormattedTransactions;
