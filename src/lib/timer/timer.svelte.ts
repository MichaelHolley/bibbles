import { z } from 'zod';
import { load, save } from '#lib/storage.js';
import { chime, unlockAudio } from './chime';
import {
	customTimerInputSchema,
	customTimerSchema,
	phaseLabels,
	presetIdSchema,
	presets,
	type CustomTimer,
	type Phase,
	type PresetId
} from './presets';

const MINUTE = 60_000;
const keys = { preset: 'bibbles:preset', customs: 'bibbles:customs' };

class Timer {
	presetId = $state<PresetId>(load(keys.preset, presetIdSchema, 'classic'));
	customs = $state<CustomTimer[]>(load(keys.customs, z.array(customTimerSchema), []));
	phase = $state<Phase>('focus');
	custom = $state<CustomTimer | null>(null);
	focusDone = $state(0);

	durationMs = $state(0);
	#leftMs = $state(0);
	#endAt = $state<number | null>(null);
	#now = $state(Date.now());
	#interval: ReturnType<typeof setInterval> | undefined;

	preset = $derived(presets[this.presetId]);
	running = $derived(this.#endAt !== null);
	remainingMs = $derived(
		this.#endAt === null ? this.#leftMs : Math.max(0, this.#endAt - this.#now)
	);
	progress = $derived(this.durationMs === 0 ? 0 : 1 - this.remainingMs / this.durationMs);
	label = $derived(this.custom?.name ?? phaseLabels[this.phase]);
	clock = $derived(formatClock(this.remainingMs));
	session = $derived(this.focusDone + (this.phase === 'focus' ? 1 : 0));
	fresh = $derived(!this.running && this.remainingMs === this.durationMs);

	constructor() {
		this.#load(this.preset.focus * MINUTE);
	}

	start() {
		unlockAudio();
		if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
			void Notification.requestPermission();
		}
		this.#now = Date.now();
		this.#endAt = this.#now + this.#leftMs;
		clearInterval(this.#interval);
		this.#interval = setInterval(() => this.#tick(), 250);
	}

	pause() {
		this.#leftMs = this.remainingMs;
		this.#stop();
	}

	toggle() {
		if (this.running) this.pause();
		else this.start();
	}

	reset() {
		this.#load(this.durationMs);
	}

	skip() {
		const wasRunning = this.running;
		this.#advance(false);
		if (wasRunning && !this.custom) this.start();
	}

	selectPhase(phase: Phase) {
		this.custom = null;
		this.phase = phase;
		this.#load(this.preset[phase] * MINUTE);
	}

	selectPreset(id: PresetId) {
		this.presetId = id;
		save(keys.preset, id);
		this.focusDone = 0;
		this.selectPhase('focus');
	}

	selectCustom(timer: CustomTimer) {
		this.custom = timer;
		this.#load(timer.minutes * MINUTE);
	}

	addCustom(input: unknown) {
		const parsed = customTimerInputSchema.safeParse(input);
		if (!parsed.success) return false;
		const { name, minutes } = parsed.data;
		this.customs.push({ id: crypto.randomUUID(), name: name || `${minutes} minutes`, minutes });
		save(keys.customs, this.customs);
		return true;
	}

	removeCustom(id: string) {
		this.customs = this.customs.filter((t) => t.id !== id);
		save(keys.customs, this.customs);
		if (this.custom?.id === id) this.selectPhase(this.phase);
	}

	#tick() {
		this.#now = Date.now();
		if (this.remainingMs === 0) this.#finish();
	}

	#finish() {
		chime();
		const finished = this.label;
		this.#advance(true);
		if (!this.custom) this.start();
		notify(`${finished} is done`, this.custom ? 'Nicely done.' : `${this.label} has started`);
	}

	#advance(completed: boolean) {
		if (this.custom) return this.#load(this.durationMs);
		if (this.phase === 'break') return this.selectPhase('focus');
		if (completed) this.focusDone++;
		this.selectPhase('break');
	}

	#load(ms: number) {
		this.#stop();
		this.durationMs = ms;
		this.#leftMs = ms;
	}

	#stop() {
		clearInterval(this.#interval);
		this.#endAt = null;
	}
}

function formatClock(ms: number) {
	const total = Math.ceil(ms / 1000);
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function notify(title: string, body: string) {
	if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
	new Notification(title, { body });
}

export const timer = new Timer();
