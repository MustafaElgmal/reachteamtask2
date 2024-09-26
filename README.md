# Mobile Phone Store

## Description
The "Mobile Phone Store" project is a web application that enables users to explore and purchase mobile phones from various categories such as Apple, Sony, and Samsung. Each category boasts a diverse selection of mobile phones. Users can seamlessly navigate through categories, access detailed product information, and utilize filtering options (like price and score, currently under development). The frontend leverages Tailwind CSS for styling and incorporates reusable components for a streamlined development process. Redux Toolkit manages the state of products and categories, while Axios facilitates data retrieval from APIs, including the RapidAPI service.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Effortlessly browse and purchase mobile phones from Apple, Sony, and Samsung categories.
- Click on category names in the navigation bar to swiftly navigate to the corresponding phone selections.
- View in-depth product details on individual product pages.
- Access a paginated list of mobiles by category ID using infinite scroll functionality.
- Upcoming: Filter products by price and score (pending backend support).
- Utilize Redux Toolkit for efficient state management.
- Employ Axios for seamless data fetching from APIs, including the RapidAPI service.
- Utilize Tailwind CSS for responsive styling and incorporate reusable components for consistent design.

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React
- Styling: Tailwind CSS
- Components: Reusable components for enhanced development efficiency
- State Management: Redux Toolkit
- HTTP Requests: Axios
- API Integration: RapidAPI
- Pagination: Infinite Scroll (upcoming)
- Backend: (Future implementation to support price and score filtering)

## Installation
1. Clone the repository.
2. Install project dependencies using `npm install`.
3. Create a `.env.local` file in the root directory based on the `.env.example` template.
4. Populate the `.env.local` file with your environment-specific configuration, including the RapidAPI key as `NEXT_PUBLIC_RAPIDAPI_KEY`and baseUrl as `NEXT_PUBLIC_API_BASE_URL`.

## Usage
1. Navigate to your desired category in the navigation bar.
2. Scroll through the selection and access individual product pages.
3. Explore the diverse range of categories and products available in the store.
4. Utilize Axios to fetch items by category ID from api `${process.env.NEXT_PUBLIC_API_BASE_URL}/${categoryId}/phones` and all categories from api `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands` from RapidAPI.

## Contributing
Interested in contributing to this project? Refer to the README for guidelines on how to get involved.

## Contact
For questions or feedback, contact [MustafaElgmal] at [mostafaar@xed.aucegypt.edu].

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
