import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const password = formData.get('password')?.toString();

    // ✅ Validation
    if (!name || !email || !password) {
      return fail(400, { error: '⚠️ Please fill all fields' });
    }

    if (password.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters' });
    }

    try {
      // CALL BUN BACKEND API 
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return fail(400, { error: data.error || 'Registration failed' });
      }

      // ✅ Set session cookie (token comes from backend)
      cookies.set('session', data.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      throw redirect(303, '/app/dashboard');
    } catch (error) {
      console.error('Register error:', error);
      return fail(500, { error: 'Server error. Please try again.' });
    }
  }
};
