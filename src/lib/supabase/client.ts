import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

console.log("SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("ANON_KEY length", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
