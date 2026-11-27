import { z } from 'zod';
import { load, save } from '#lib/storage.js';

const themeSchema = z.enum(['oat', 'ember']);
type Theme = z.infer<typeof themeSchema>;
const key = 'bibbles:theme';

class ThemeStore {
	current = $state<Theme>(
		load(key, themeSchema, matchMedia('(prefers-color-scheme: dark)').matches ? 'ember' : 'oat')
	);

	toggle() {
		this.current = this.current === 'oat' ? 'ember' : 'oat';
		save(key, this.current);
	}
}

export const theme = new ThemeStore();
