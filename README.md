This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prism
- NextAuth
- zod

### genarate prisma client

```bash
npx prisma generate
```

### migrate database

```bash
npx prisma migrate dev --name init
```

### migrate reset

```bash
npx prisma migrate reset
```

## References

- [NextAuth.js](https://next-auth.js.org)
- [Next.jsとPrismaとNext Auth v5で作る最新の認証機能](https://qiita.com/takubii/items/dba560577ccbb436e5a3)