import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { IconName, Transaction } from "@/interfaces"; // Ensure this path matches your project structure
import dayjs from "dayjs";

const TOTAL_ITEMS = 100;
const initialBalance = faker.number.float({ min: 10000, max: 100000 });
let balance = initialBalance;
// Limit the start date to the current date to avoid future transactions
let currentDate = dayjs().subtract(
  faker.number.int({ min: 1, max: 720 }),
  "hour"
);
const currency = faker.finance.currencyCode();

const allTransactions: Transaction[] = Array.from(
  { length: TOTAL_ITEMS },
  (_, index) => {
    const id = index + 1;
    const amountNumber = parseFloat(
      faker.finance.amount({ min: 1, max: 1000 })
    );
    const isDebit = faker.datatype.boolean();
    const transactionAmount = isDebit ? -amountNumber : amountNumber;
    const status = faker.helpers.arrayElement([
      "Pending",
      "Completed",
      "Failed",
    ]) as Transaction["status"];

    if (status !== "Failed") {
      balance += transactionAmount;
    }

    let card: Transaction["card"] | undefined = undefined;

    if (transactionAmount < 0) {
      card = {
        id: faker.number.int(),
        cardNumber: faker.finance.creditCardNumber(),
        cardType: faker.finance.transactionType(),
        expirationDate: dayjs(faker.date.future()).toISOString(),
        cvv: faker.finance.creditCardCVV(),
      };
    }

    // Adjusting the logic to ensure no future dates are generated
    if (faker.datatype.boolean()) {
      currentDate = currentDate.subtract(
        faker.number.int({ min: 1, max: 30 }),
        "day"
      );
    } else {
      currentDate = currentDate.subtract(
        faker.number.int({ min: 1, max: 23 }),
        "hour"
      );
    }

    let updatedAt = currentDate.add(
      faker.number.int({ min: 1, max: 72 }),
      "hour"
    );

    // Ensure updatedAt is not in the future
    const now = dayjs();
    if (updatedAt.isAfter(now)) {
      updatedAt = now;
    }

    return {
      id: id,
      createdAt: currentDate.toISOString(),
      updatedAt: updatedAt.toISOString(),
      reference: faker.finance.transactionDescription(),
      status: status,
      merchantName: faker.company.name(),
      amount: transactionAmount.toFixed(2),
      currency,
      balance: balance.toFixed(2),
      category:
        transactionAmount < 0
          ? {
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
              ]) as IconName,
            }
          : ({
              name: "income",
              displayName: "Income",
              iconName: "MoneySquare",
            } as unknown as Transaction["category"]),
      card,
    };
  }
);

const user = {
  id: faker.number.int(),
  name: faker.person.fullName(),
  balance: balance.toFixed(2),
  currency: currency,
};

// Function to simulate response delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const RESPONSE_DELAY_MS = 500; // Set the desired delay in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await delay(RESPONSE_DELAY_MS); // Apply delay

  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const sortBy = req.query.sortBy as
    | keyof Transaction
    | "createdAt"
    | "updatedAt"
    | undefined;
  const sortOrder = req.query.sortOrder as "asc" | "desc" | undefined;

  let transactionsToSort = [...allTransactions];

  if (sortBy && sortOrder) {
    transactionsToSort = transactionsToSort.sort((a, b) => {
      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        const dateA = dayjs(a[sortBy]);
        const dateB = dayjs(b[sortBy]);
        return sortOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
      } else if (sortBy === "amount") {
        // Specific case for sorting by amount
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);
        return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
      } else if (
        typeof a[sortBy] === "number" &&
        typeof b[sortBy] === "number"
      ) {
        return sortOrder === "asc"
          ? (a[sortBy] as number) - (b[sortBy] as number)
          : (b[sortBy] as number) - (a[sortBy] as number);
      } else if (
        typeof a[sortBy] === "string" &&
        typeof b[sortBy] === "string"
      ) {
        const aValue = a[sortBy]?.toString() ?? "";
        const bValue = b[sortBy]?.toString() ?? "";
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }

  const totalPages = Math.ceil(TOTAL_ITEMS / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const transactions = transactionsToSort.slice(start, end);

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
