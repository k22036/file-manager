## You can clone this repository

```bash
git clone https://github.com/k22036/file-manager.git
```

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
- Prisma
- NextAuth
- zod

### generate prisma client

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
- [React Server Actions 上でリクエストを認証する](https://zenn.dev/shiba_hiro/articles/serveractions-auth)
- [ReactのuseEffectで非同期処理を安全に行うベストプラクティスを解説](https://ittrip.xyz/react/react-useeffect-async-tips)
