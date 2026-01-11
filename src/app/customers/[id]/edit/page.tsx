"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import CustomerForm, { CustomerFormValues } from "@/components/CustomerForm";

type CustomerRow = {
  id: string;
  name: string | null;
  email: string | null;
  memo: string | null;
};

export default function EditCustomerPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaults, setDefaults] = useState<CustomerFormValues | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("customers")
        .select("id, name, email, memo")
        .eq("id", id)
        .single();

      setLoading(false);

      if (error) {
        alert(error.message);
        return;
      }

      const c = data as CustomerRow;
      setDefaults({
        name: c.name ?? "",
        email: c.email ?? "",
        memo: c.memo ?? "",
      });
    };

    load();
  }, [id, supabase]);

  const onSubmit = async (values: CustomerFormValues) => {
    setIsSubmitting(true);

    const { error } = await supabase
      .from("customers")
      .update(values)
      .eq("id", id);

    setIsSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  if (loading || !defaults) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl p-6">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-6">
        <CustomerForm
          title="Edit Customer"
          submitLabel="Save changes"
          isSubmitting={isSubmitting}
          defaultValues={defaults}
          backHref="/dashboard"
          onSubmit={onSubmit}
        />
      </div>
    </main>
  );
}
