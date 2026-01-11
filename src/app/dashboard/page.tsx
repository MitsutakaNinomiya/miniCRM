import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DeleteCustomerButton from "@/components/DeleteCustomerButton";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Customer = {
  id: string;
  name: string | null;
  email: string | null;
  memo: string | null;
  created_at: string | null;
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const { data: customers, error } = await supabase
    .from("customers")
    .select("id, name, email, memo, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Customers</h1>
            <p className="text-sm text-muted-foreground">
              あなたの顧客データを管理します
            </p>
          </div>

          <Button asChild>
            <Link href="/customers/new">+ Add customer</Link>
          </Button>
        </div>

        {error && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Error</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">{error.message}</CardContent>
          </Card>
        )}

        {/* Empty */}
        {!customers || customers.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>まだ顧客がいません</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              右上の「Add customer」から追加してください。
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>一覧</CardTitle>
              <Badge variant="secondary">{customers.length} 件</Badge>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Memo</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {(customers as Customer[]).map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">
                          {c.name ?? "-"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {c.email ?? "-"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {c.memo ?? "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/customers/${c.id}/edit`}>Edit</Link>
                            </Button>
                            <DeleteCustomerButton id={c.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
