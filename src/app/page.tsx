import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-6">
        {/* Hero */}
        <section className="py-16 space-y-6">
          <Badge variant="secondary">Next.js + Supabase</Badge>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Mini CRM
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            認証・RLS・CRUDを備えた、シンプルで実務寄りの顧客管理アプリ。
            ログインユーザーは自分のデータだけを安全に扱えます。
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/signup">Signup</Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Secure by default</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              RLSでユーザーごとにデータを分離。未ログイン時はmiddlewareで
              ルートを保護。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">CRUD ready</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              顧客の追加・一覧・編集・削除。フォームは共通化して保守性を確保。
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Modern UI</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              shadcn/ui + Tailwindで管理画面UIに最短到達。見た目と実装の両立。
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mini CRM
        </footer>
      </div>
    </main>
  );
}
