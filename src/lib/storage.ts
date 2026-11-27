import type { z } from 'zod';

export function load<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return fallback;
		const parsed = schema.safeParse(JSON.parse(raw));
		return parsed.success ? parsed.data : fallback;
	} catch {
		return fallback;
	}
}

export function save(key: string, value: unknown) {
	localStorage.setItem(key, JSON.stringify(value));
}
