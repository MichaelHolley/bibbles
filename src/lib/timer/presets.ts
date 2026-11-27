import { z } from 'zod';

export const phases = ['focus', 'break'] as const;
export type Phase = (typeof phases)[number];

export const phaseLabels: Record<Phase, string> = {
	focus: 'Focus',
	break: 'Break'
};

export const presetIdSchema = z.enum(['classic', 'deep', 'sprint']);
export type PresetId = z.infer<typeof presetIdSchema>;

export type Preset = Record<Phase, number> & { name: string };

export const presets: Record<PresetId, Preset> = {
	classic: { name: 'Classic', focus: 25, break: 5 },
	deep: { name: 'Deep work', focus: 50, break: 10 },
	sprint: { name: 'Sprint', focus: 15, break: 3 }
};

export const customTimerInputSchema = z.object({
	name: z.string().trim().max(24).default(''),
	minutes: z.coerce.number().int().min(1).max(180)
});

export const customTimerSchema = z.object({
	id: z.string(),
	name: z.string().min(1).max(24),
	minutes: z.number().int().min(1).max(180)
});

export type CustomTimer = z.infer<typeof customTimerSchema>;
