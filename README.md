# Transaction App

This is a simple transaction app that allows users to view transactions. It is built using Next.js, TypeScript, Chakra UI, and Virtuoso + SWR for optimized rendering and fetching of data.

## Table of Contents

- [Features](#features)
- [API](#api)
  - [Endpoints](#endpoints)
- [Frontend Optimizations](#frontend-optimizations)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

## Features

- View transactions
- View transaction details (by clicking on a transaction)
- Sort transactions by date and amount (ascending and descending)
- Navigate through pages of transactions
- Show balance and user information

## API

The app uses a mock API to fetch transactions. The API is located in `pages/api/transactions.ts`. The API returns a list of transactions and the metadata as shown below:

```json
{
  "currentPage": 1,
  "pageSize": 10,
  "totalPages": 10,
  "totalItems": 100,
  "data": {
    "user": {
      "id": 10,
      "name": "Olivia Smith",
      "balance": "2000.00",
      "currency": "USD"
    },
    "transactions": [
      {
        "id": 110,
        "createdAt": "2024-01-19T10:30:00Z",
        "updatedAt": "2024-01-19T11:30:00Z",
        "reference": "Annual subscription to TechInsights",
        "status": "Completed",
        "merchantName": "Subscription Service",
        "amount": "-200.00",
        "currency": "USD",
        "balance": "1800.00",
        "category": {
          "name": "education",
          "displayName": "Education",
          "iconName": "Book"
        },
        "card": {
          "id": 15,
          "cardNumber": "5678901234567890",
          "cardType": "Credit",
          "expirationDate": "08/2027",
          "cvv": "890"
        }
      }

      // ... more transactions
    ]
  }
}
```

The API returns a list of transactions and the metadata. The metadata includes the current page, the page size, the total number of pages, and the total number of items. The transactions are sorted by the `createdAt` field in descending order.

**Note:** Please refer to the interfaces in `/interfaces/` to see the structure of the data.

**Important:** The user's information is also returned in the response. This is because it's more efficient to return it in one go in this simple app. In a real-world scenario, the user's information would be fetched separately in a different endpoint.

### Endpoints

- `GET /api/transactions?page={page}&sortBy={sortBy}&sortOrder={sortOrder}`: Fetches a list of transactions. The `page` query parameter is used to specify the page number. The `sortBy` query parameter is used to specify the field to sort by. The `sortOrder` query parameter is used to specify the sort order (either `asc` or `desc`).

## Frontend Optimizations

The app uses Virtuoso and SWR to optimize rendering and fetching of data.

- **Virtuoso:** It is used to render the list of transactions. It is a virtualized list component that only renders the items that are visible on the screen. This makes it efficient to render large lists of items.
- **SWR:** It is used to fetch the transactions from the API. It is a React hook for data fetching that provides a number of features such as caching, revalidation, and error handling.

## Prerequisites

- Node.js (NVM is recommended for managing Node.js versions)
- npm or yarn or pnpm

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/transations](http://localhost:3000/api/transations). This endpoint can be edited in `pages/api/transations.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Thanks for reading! 🙏

If you have any questions or feedback, please feel free to reach out to me on [Email](mailto:cristiansuarezg7@gmail.com) or [LinkedIn](https://www.linkedin.com/in/hicrist/). I'd love to hear from you! 😊
