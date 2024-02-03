import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { IconName, Transaction } from "@/interfaces"; // Ensure this path matches your project structure
import dayjs from "dayjs";

// TODO: Optimise this code
const TOTAL_ITEMS = 100;
const initialBalance = faker.number.float({ min: 10000, max: 100000 });
let balance = initialBalance;
let currentDate = dayjs(
  faker.date.past({
    years: 2,
  })
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

    // Adjusting the logic to sometimes add hours instead of days
    if (faker.datatype.boolean()) {
      // 50% chance to add days (1 to 30 days)
      currentDate = currentDate.add(
        faker.number.int({ min: 1, max: 30 }),
        "day"
      );
    } else {
      // 50% chance to add hours within the same day (1 to 23 hours)
      currentDate = currentDate.add(
        faker.number.int({ min: 1, max: 23 }),
        "hour"
      );
    }

    const updatedAt = currentDate.add(
      faker.number.int({ min: 1, max: 72 }),
      "hour"
    );

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const sortBy = req.query.sortBy as
    | keyof Transaction
    | "createdAt"
    | "updatedAt"
    | undefined;
  const sortOrder = req.query.sortOrder as "asc" | "desc" | undefined;

  let transactionsToSort = [...allTransactions];

  // Ensure sorting logic for dates is correctly applied
  if (sortBy && sortOrder) {
    transactionsToSort = transactionsToSort.sort((a, b) => {
      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        const dateA = dayjs(a[sortBy]);
        const dateB = dayjs(b[sortBy]);
        return sortOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
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
        return sortOrder === "asc"
          ? (a[sortBy] as string).localeCompare(b[sortBy] as string)
          : (b[sortBy] as string).localeCompare(a[sortBy] as string);
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
    pageSize: pageSize,
    totalPages: totalPages,
    totalItems: TOTAL_ITEMS,
    data: {
      user,
      transactions,
    },
  });
}
