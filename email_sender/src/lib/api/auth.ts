import type { createUser } from '$lib/types';
import type { LoginUser } from '$lib/types';


export async function registerUser(data: createUser) {
	const res = await fetch('http://localhost:3000/api/register/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.message || 'Registration failed');
	}

	return res.json();
}


// src/lib/api/login.ts

interface LoginResponse {
	success: boolean;
	message: string;
	user?: {
		id: string;
		email: string;
		name: string;
	};
}

export async function loginUser(data: LoginUser): Promise<LoginResponse> {
	const res = await fetch('http://localhost:3000/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include', // IMPORTANT: cookie store
		body: JSON.stringify(data)
	});

	const result = await res.json();

	if (!res.ok || !result.success) {
		throw new Error(result.message || 'Login failed');
	}

	return result;
}

// Logout

import { writable } from 'svelte/store';

export interface User {
	email: string;
}

export const user = writable<User | null>({
	email: 'user@example.com'
});

