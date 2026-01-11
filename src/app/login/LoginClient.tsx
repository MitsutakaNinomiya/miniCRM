"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// ↓ここから下は、もともと page.tsx に書いてたログインUIと処理を移植
export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 例：redirect先を取ってるなら
  const next = searchParams.get("next") ?? "/dashboard";

  // 以降、既存の useForm / onSubmit / state / UI をそのまま貼る
  // ...
  return (
    <div>
      {/* ここに既存のログインUI */}
    </div>
  );
}
