import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

// Add this line to export createClient as the default export
export default createClient;