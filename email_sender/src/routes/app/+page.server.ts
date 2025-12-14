import { redirect } from '@sveltejs/kit';

/**
 * Redirect /app -> /app/dashboard so visiting /app doesn't return 404.
 */
export function load() {
  throw redirect(307, '/app/dashboard');
}
