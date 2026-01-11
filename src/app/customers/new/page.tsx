"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import CustomerForm, { CustomerFormValues } from "@/components/CustomerForm";

export default function NewCustomerPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: CustomerFormValues) => {
    setIsSubmitting(true);

    const { error } = await supabase.from("customers").insert(values);

    setIsSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };




  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-6">
        <CustomerForm
          title="New Customer"
          submitLabel="Create"
          isSubmitting={isSubmitting}
          backHref="/dashboard"
          onSubmit={onSubmit}
        />

        
      </div>
    </main>
  );
}
