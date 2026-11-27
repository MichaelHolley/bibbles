// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface DocumentPictureInPicture extends EventTarget {
		requestWindow(options?: { width?: number; height?: number }): Promise<Window>;
		readonly window: Window | null;
	}

	interface Window {
		documentPictureInPicture?: DocumentPictureInPicture;
	}
}

export {};
