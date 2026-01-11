"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  
} from "@/components/ui/form";

const customerSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || z.string().email().safeParse(v).success, {
      message: "メール形式が正しくありません",
    }),
  memo: z.string().optional().or(z.literal("")),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

type Props = {
  title: string;
  defaultValues?: Partial<CustomerFormValues>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: CustomerFormValues) => Promise<void> | void;
  backHref?: string;

};




export default function CustomerForm({
    
  title,
  defaultValues,
  submitLabel = "Save",
  isSubmitting = false,
  backHref,
  onSubmit,
}: Props) {
    const router = useRouter();
    
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      memo: defaultValues?.memo ?? "",
    },
    mode: "onSubmit",
  });

  return (
    <Card className="max-w-xl">
      <CardHeader className="space-y-1">
  <div className="flex items-center justify-between gap-3">
    <CardTitle>{title}</CardTitle>

        <Button
    type="button"
    variant="ghost"
    onClick={(e) => {
        e.preventDefault(); // ← フォーム送信を絶対防ぐ
        if (backHref) router.push(backHref);
        else router.back();
    }}
    >
    ← Back
    </Button>

  </div>
</CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values);
            })}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="例：山田 太郎" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="例：taro@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="メモ（任意）"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
