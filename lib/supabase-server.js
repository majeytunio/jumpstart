import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
export const supabaseServerClient = (ctx) => createServerSupabaseClient(ctx);