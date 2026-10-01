import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = 'https://bubcoxpkrxxyomdzkkeh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_5qB4zjXcXXET9BvRYFA9-w_7z9w_Ig0';

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
