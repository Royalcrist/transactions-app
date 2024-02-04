import type { Currency, Dinero } from "dinero.js";

export interface User {
  id: number;
  name: string;
  balance: string;
  currency: Currency;
}

export interface Category {
  name:
    | "food"
    | "transportation"
    | "housing"
    | "health"
    | "leisure"
    | "education"
    | "apparel"
    | "income"
    | "savings"
    | "other";
  displayName: string;
  iconName: string; // Iconoir icon name
}

export interface Card {
  id: number;
  cardNumber: string;
  cardType: string;
  expirationDate: string;
  cvv: string;
}

export interface Transaction {
  id: number;
  reference: string;
  status: "Pending" | "Completed" | "Failed";
  merchantName: string;
  amount: string;
  currency: string;
  balance: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  card?: Card;
}

export interface UITransaction extends Omit<Transaction, "amount" | "balance"> {
  balance: Dinero;
  amount: Dinero;
}

export type SortBy = keyof Transaction;
export type SortOrder = "asc" | "desc";

export type PaginatedResponse<T> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: T;
};

export type TransactionsResponse = PaginatedResponse<{
  user: User;
  transactions: Transaction[];
}>;

export interface PaginationParams {
  page?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}
