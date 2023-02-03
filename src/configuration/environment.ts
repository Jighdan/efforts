import { z } from 'zod';

interface Environment {
	supabase: {
		url: string;
		key: string;
	}
}

const envSchema = z.object({
	supabase: z.object({
		url: z.string(),
		key: z.string(),
	})
});

export const env: Environment = envSchema.parse({
	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY
	}
});
