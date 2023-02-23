import { z } from "zod";

export const schema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(8, "At least 8 characters are required")
	})