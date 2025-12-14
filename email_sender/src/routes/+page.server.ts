import { redirect } from '@sveltejs/kit';

/**
 * Redirect root (/) to /app where the main UI lives.
 * This avoids the 404 at the root when no +page.svelte exists.
 */
export function load() {
	throw redirect(307, '/app');
}
