![Logo Banner](./docs/logo-banner.png)

# D’Shine: Cosmetic Marketing Assistant

A smart, AI-powered platform designed to improve marketing and customer engagement for cosmetic distributors.

## Features

- Provides insights and analytics for owners and managers.
- Identifies top-performing products and generates ready-to-use marketing descriptions.
- Uses AI to create personalized promotional messages based on Customer Lifetime Value (CLV).
- Targets customers likely to purchase, enhancing sales opportunities.

## Run Locally

Follow these steps to set up the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/xyugen/cosmetic-marketing-assistant.git
cd cosmetic-marketing-assistant
```

### 2. Install dependencies

Ensure you have **Node.js** installed, then run:

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and configure the required variables:

```bash
cp .env.example .env
```

Then, open `.env` and update it with your credentials.

### 4. Set up the database

Push your schema to the **Turso** database using one of the following methods:

#### Option 1: Generate and migrate

```bash
npm run db:generate
npm run db:migrate
```

#### Option 2: Push directly

```bash
npm run db:push
```

### 5. Start the development server

```bash
npm run dev
```

Your project should now be running locally!

## Tech Stack

- NextJS
- Typescript
- tRPC
- Drizzle ORM + Turso DB
- Better Auth
- Tailwind CSS
- Vercel

## License

[GPL-3.0 LICENSE](./LICENSE)