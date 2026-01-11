"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const onLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold tracking-tight">
          Mini CRM
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/customers/new">Add</Link>
          </Button>
          <Button variant="destructive" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
