import { createClient } from '@supabase/supabase-js';
import { env } from '~/configuration/environment';
import { Database } from './interfaces';

export const client = createClient<Database>(env.supabase.url, env.supabase.key);
