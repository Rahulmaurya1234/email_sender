import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { userDatabase } from '$lib/server/userDatabase';


export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const password = formData.get('password')?.toString();

    if (!name || !email || !password) {
      return fail(400, { error: '⚠️ Please fill all fields' });
    }

    if (password.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters' });
    }

    try {
      const userId = await userDatabase.createUser(email, name, password);

      // Create session
      const token = await userDatabase.createSession(userId);
      cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7
      });

      throw redirect(303, '/app/dashboard');
    } catch (err) {
      return fail(400, { error: err instanceof Error ? err.message : 'Registration failed' });
    }
  }
};
