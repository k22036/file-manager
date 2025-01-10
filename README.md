## Getting Started

```bash
npm install
```

```bash
npx prisma migrate dev --name init
```

```bash
touch .env.local
openssl rand -base64 32
```

.env.localに先ほど作成したランダムな値を入力する

```.env.local
AUTH_SECRET=secret
```

```bash
npm run dev
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
