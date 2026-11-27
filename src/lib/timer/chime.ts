let ctx: AudioContext | null = null;

export function unlockAudio() {
	ctx ??= new AudioContext();
	if (ctx.state === 'suspended') void ctx.resume();
}

export function chime() {
	if (!ctx) return;
	const start = ctx.currentTime;
	[659.25, 880, 1046.5].forEach((freq, i) => {
		const osc = ctx!.createOscillator();
		const gain = ctx!.createGain();
		const t = start + i * 0.18;
		osc.type = 'sine';
		osc.frequency.value = freq;
		gain.gain.setValueAtTime(0, t);
		gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
		gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
		osc.connect(gain).connect(ctx!.destination);
		osc.start(t);
		osc.stop(t + 1.5);
	});
}
