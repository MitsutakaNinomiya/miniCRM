"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function DeleteCustomerButton({ id }: { id: string }) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const onDelete = async () => {
    const ok = confirm("本当に削除しますか？");
    if (!ok) return;

    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  };

  return (
    <Button variant="destructive" size="sm" onClick={onDelete}>
      Delete
    </Button>
  );
}
