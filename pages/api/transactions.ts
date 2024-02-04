import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import type { Category, Transaction } from "@/interfaces";
import dayjs from "dayjs";

const TOTAL_ITEMS = 1000;
const PAGE_SIZE = 100;
const initialBalance = faker.number.float({ min: 10000, max: 100000 });
let balance = initialBalance;
const currency = faker.finance.currencyCode();

const user = {
  id: faker.number.int(),
  name: faker.person.fullName(),
  balance: balance.toFixed(2),
  currency,
};

// Generate transactions once when the module is loaded
const allTransactions = generateTransactions(TOTAL_ITEMS);

function generateTransactions(total: number): Transaction[] {
  let currentDate = dayjs().subtract(
    faker.number.int({ min: 1, max: 720 }),
    "hour"
  );

  return Array.from({ length: total }, (_, index) => {
    const transaction = createTransaction(index, currentDate);
    currentDate = adjustDate(currentDate);
    return transaction;
  });
}

function createTransaction(
  index: number,
  currentDate: dayjs.Dayjs
): Transaction {
  const id = index + 1;
  const { amountNumber, transactionAmount, isDebit } =
    generateTransactionAmount();
  const status = faker.helpers.arrayElement([
    "Pending",
    "Completed",
    "Failed",
  ]) as Transaction["status"];
  if (status !== "Failed") balance += transactionAmount;
  const card = isDebit ? generateCardInfo() : undefined;
  let updatedAt = adjustUpdatedAt(currentDate);

  return {
    id,
    createdAt: currentDate.toISOString(),
    updatedAt: updatedAt.toISOString(),
    reference: faker.finance.transactionDescription(),
    status,
    merchantName: faker.company.name(),
    amount: transactionAmount.toFixed(2),
    currency,
    balance: balance.toFixed(2),
    category: generateCategory(transactionAmount),
    card,
  };
}

function generateTransactionAmount() {
  const amountNumber = parseFloat(faker.finance.amount({ min: 1, max: 1000 }));
  const isDebit = faker.datatype.boolean();
  const transactionAmount = isDebit ? -amountNumber : amountNumber;
  return { amountNumber, transactionAmount, isDebit };
}

function generateCardInfo() {
  return {
    id: faker.number.int(),
    cardNumber: faker.finance.creditCardNumber(),
    cardType: faker.finance.transactionType(),
    expirationDate: dayjs(faker.date.future()).toISOString(),
    cvv: faker.finance.creditCardCVV(),
  };
}

function adjustDate(currentDate: dayjs.Dayjs): dayjs.Dayjs {
  return faker.datatype.boolean()
    ? currentDate.subtract(faker.number.int({ min: 1, max: 30 }), "day")
    : currentDate.subtract(faker.number.int({ min: 1, max: 23 }), "hour");
}

function adjustUpdatedAt(currentDate: dayjs.Dayjs): dayjs.Dayjs {
  let updatedAt = currentDate.add(
    faker.number.int({ min: 1, max: 72 }),
    "hour"
  );
  const now = dayjs();
  return updatedAt.isAfter(now) ? now : updatedAt;
}

function generateCategory(transactionAmount: number): Category {
  if (transactionAmount < 0) {
    return {
      name: faker.helpers.arrayElement([
        "food",
        "transportation",
        "housing",
        "health",
        "leisure",
        "education",
        "apparel",
        "savings",
        "other",
      ]),
      displayName: faker.commerce.productName(),
      iconName: faker.helpers.arrayElement([
        "Cart",
        "Car",
        "HomeAlt",
        "HealthShield",
        "Basketball",
        "Book",
        "Hanger",
        "Safe",
        "Calculator",
      ]),
    };
  }
  return {
    name: "income",
    displayName: "Income",
    iconName: "MoneySquare",
  };
}

// Simulate response delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const RESPONSE_DELAY_MS = 500;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await delay(RESPONSE_DELAY_MS);

  const { page, pageSize, transactions, totalPages } =
    paginateTransactions(req);

  res.status(200).json({
    currentPage: page,
    pageSize,
    totalPages,
    totalItems: TOTAL_ITEMS,
    data: {
      user,
      transactions,
    },
  });
}

function paginateTransactions(req: NextApiRequest) {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || PAGE_SIZE;
  const transactionsToSort = sortTransactions(allTransactions, req);
  const totalPages = Math.ceil(TOTAL_ITEMS / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const transactions = transactionsToSort.slice(start, end);
  return { page, pageSize, transactions, totalPages };
}

function sortTransactions(
  transactions: Transaction[],
  req: NextApiRequest
): Transaction[] {
  const sortBy = req.query.sortBy as
    | keyof Transaction
    | "createdAt"
    | "updatedAt"
    | undefined;
  const sortOrder = req.query.sortOrder as "asc" | "desc" | undefined;

  if (!sortBy || !sortOrder) return transactions;

  return transactions.sort((a, b) => compareValues(a, b, sortBy, sortOrder));
}

function compareValues(
  a: Transaction,
  b: Transaction,
  sortBy: keyof Transaction,
  sortOrder: "asc" | "desc"
): number {
  if (sortBy === "createdAt" || sortBy === "updatedAt") {
    const dateA = dayjs(a[sortBy]);
    const dateB = dayjs(b[sortBy]);
    return sortOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
  }

  if (sortBy === "amount") {
    const amountA = parseFloat(a.amount);
    const amountB = parseFloat(b.amount);
    return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
  }

  if (typeof a[sortBy] === "string" && typeof b[sortBy] === "string") {
    const aValue = a[sortBy]?.toString() ?? "";
    const bValue = b[sortBy]?.toString() ?? "";
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }

  return 0;
}
