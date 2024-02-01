import { Iconoir } from "iconoir-react";

export interface User {
  id: number;
  name: string;
}
export type IconName = keyof typeof Iconoir;

export interface Category {
  name: string;
  displayName: string;
  iconName: IconName;
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
  user: User;
  createdAt: string;
  updatedAt: string;
  card?: Card;
}
