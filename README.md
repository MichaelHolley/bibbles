<div align="center">

<img src="src/lib/assets/favicon.svg" alt="" width="72" height="72" />

# Bibbles

**A cozy pomodoro timer that floats over your other tabs.**

Focus, break, repeat. Start the timer and a small always-on-top window follows you
across tabs and apps, so the countdown is never more than a glance away.

</div>

---

## Why Bibbles

Most browser timers live in a tab you forget about. Bibbles uses the browser's
**Document Picture-in-Picture** window, the same thing Google Meet uses for its floating
call, to keep a real, clickable timer on top of whatever you're working in.

- **Floats when you start.** Press Start and the mini timer pops out. You can pause and
  skip right from it.
- **Loops on its own.** Focus rolls into a break and back into focus until you stop it. You
  never have to come back and press Start again.
- **Fits any window size.** Shrink the floating window and the layout changes with it:
  a ring, then a compact row, then just the clock and a play button.
- **Easy on the eyes.** Warm oat colours by day and a dark ember theme by night. It follows
  your system's light or dark mode until you pick one.

## Rhythms

Pick one of three focus and break pairs, in minutes:

| Rhythm    | Focus | Break |
| --------- | ----: | ----: |
| Classic   |    25 |     5 |
| Deep work |    50 |    10 |
| Sprint    |    15 |     3 |

## Your timers

For anything that isn't a pomodoro, like steeping tea, a stretch or a nap, add a named
one-off timer from 1 to 180 minutes. It runs once, chimes and resets.

## Little things

- A soft chime and a desktop notification when a phase ends
- <kbd>Space</kbd> starts and pauses
- The time left shows in the tab title while the timer runs
- The timer counts down to a fixed end time, so it stays accurate in background tabs
- Your rhythm, timers and theme are saved in your browser. There's no account and no server.

## Browser support

The floating window needs the Document Picture-in-Picture API, which is available in
**Chrome and Edge 116+**. In other browsers the timer works the same inside its tab, just
without the floating window.

## Run it locally

```sh
pnpm install
pnpm dev
```

Before you push, check your changes with:

```sh
pnpm run check
pnpm run lint
```

## Built with

[SvelteKit](https://svelte.dev/docs/kit) and Svelte 5 runes,
[Tailwind CSS](https://tailwindcss.com) v4, [Zod](https://zod.dev) and TypeScript.
Set in [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) and
[Figtree](https://fonts.google.com/specimen/Figtree).
