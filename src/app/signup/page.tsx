"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string().email("メール形式が正しくありません"),
  password: z.string().min(6, "パスワードは6文字以上"),
});

type Values = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Values) => {
    setServerError(null);
    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp(values);

    setIsSubmitting(false);

    if (error) {
      setServerError(error.message);
      return;
    }

    // メール確認がONだとここでログイン状態にならないことがある
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {serverError && (
              <p className="text-sm text-red-500">{serverError}</p>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="taro@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create account"}
                </Button>
              </form>
            </Form>

            <div className="text-sm text-muted-foreground">
              すでにアカウントある？{" "}
              <Link className="underline" href="/login">
                ログイン
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
