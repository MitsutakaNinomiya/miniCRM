# Mini CRM（顧客管理アプリ）

Next.js（App Router）+ Supabase を用いた、シンプルな顧客管理（ミニCRM）です。  
認証・RLS（Row Level Security）を使い、ログインユーザーは自分のデータのみ閲覧/更新できます。

## Demo
- https://mini-crm-omega.vercel.app/


## 機能
- メール/パスワード認証（Supabase Auth）
- 顧客CRUD
  - Create：顧客追加（name / email / memo）
  - Read：一覧表示
  - Update：編集
  - Delete：削除
- データ分離
  - RLSにより「ログインユーザーは自分の顧客データのみ」アクセス可能
- ルートガード
  - middlewareで `/dashboard` / `/customers/*` を未ログイン時に `/login` へリダイレクト
- UI
  - shadcn/ui + Tailwind による管理画面UI
  - フォームは共通コンポーネント化（New/Editで再利用）
  - react-hook-form + zod バリデーション

## 技術スタック
- Next.js（App Router）
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase（Auth / Database / RLS）
- react-hook-form / zod

## こだわり（設計メモ）
- 認証状態がない操作を防ぐため、アプリ側（middleware）とDB側（RLS）で二重に保護
- Server Componentで一覧取得、Client Componentで操作（削除など）を分離して実務構成に寄せた
- DB側で `user_id` の default を `auth.uid()` にし、フロントから user_id を送らない設計にした（安全で拡張しやすい）

## セットアップ
### 1. インストール
```bash
npm i
2. 環境変数
プロジェクト直下に .env.local を作成し、Supabaseの値を設定します。

env
コードをコピーする
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
3. 起動
bash
コードをコピーする
npm run dev
Supabase（テーブル/ポリシー概要）
customers

id（uuid）

user_id（uuid, default: auth.uid()）

name / email / memo / created_at

RLS Policies（select/insert/update/delete）

auth.uid() = user_id

今後の改善案
検索 / ソート / ページネーション

ダークモード切替

一覧の行クリックで詳細表示

テーブルのUI改善（loading skeleton / empty state）

yaml
コードをコピーする

---

## 次の1アクション
README.md に貼ったら、**VercelのURL（あれば）**と、  
「こだわり」欄で **あなたが強調したい点**を1つだけ教えて。

迷うならおすすめはこれ：
- **RLS + middleware + server/client分離**  
この3つは未経験の中で差別化が強い。



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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
