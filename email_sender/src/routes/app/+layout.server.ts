import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, fetch }) => {
  const token = cookies.get('session_token');

  if (!token) throw redirect(302, '/auth/login');

  const res = await fetch('http://localhost:3000/auth/me', {
    headers: { cookie: `session_token=${token}` }
  });

  const data = await res.json();
  if (!data.success) throw redirect(302, '/auth/login');

  return { user: data.user };
};
