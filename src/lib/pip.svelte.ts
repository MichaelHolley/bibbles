import { mount, unmount } from 'svelte';
import PipTimer from '#lib/components/PipTimer.svelte';

class Pip {
	supported = typeof window !== 'undefined' && 'documentPictureInPicture' in window;
	window = $state<Window | null>(null);

	async open() {
		if (this.window) return this.window.focus();
		const api = window.documentPictureInPicture;
		if (!api) return;
		const win = await api.requestWindow({ width: 300, height: 320 });
		copyStyles(win.document);
		const app = mount(PipTimer, { target: win.document.body, props: { doc: win.document } });
		win.addEventListener('pagehide', () => {
			void unmount(app);
			this.window = null;
		});
		this.window = win;
	}

	close() {
		this.window?.close();
	}
}

function copyStyles(target: Document) {
	for (const sheet of document.styleSheets) {
		try {
			const style = target.createElement('style');
			style.textContent = [...sheet.cssRules].map((r) => r.cssText).join('\n');
			target.head.append(style);
		} catch {
			if (sheet.href) {
				const link = target.createElement('link');
				link.rel = 'stylesheet';
				link.href = sheet.href;
				target.head.append(link);
			}
		}
	}
}

export const pip = new Pip();
