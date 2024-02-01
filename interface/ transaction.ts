export interface User {
  id: number;
  avatar: string;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Card {
  id: number;
  cardNumber: string;
  cardType: string;
  expirationDate: string;
  cvv: string;
  user: User;
}

export interface Transaction {
  id: number;
  date: string;
  reference: string;
  status: string;
  merchantDetails: string;
  amount: string;
  currency: string;
  balance: string;
  category: Category;
  user: User;
  card?: Card;
}
