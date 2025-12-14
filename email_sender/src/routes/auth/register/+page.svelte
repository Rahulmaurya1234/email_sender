<script lang="ts">
  import { goto } from '$app/navigation';
  import type { CreateUser } from '$lib/types';

  let form: CreateUser = {
    name: '',
    email: '',
    password: ''
  };

  let error = '';
  let loading = false;

  async function submitForm() {
    if (!form.name || !form.email || !form.password) {
      error = '⚠️ Please fill all fields';
      return;
    }

    error = '';
    loading = true;

    try {
      const res = await fetch('/auth/register', {   // ✅ BACKEND MATCH
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      // ✅ backend already sets session cookie
      goto('/app/dashboard');   // direct login
    } catch (e) {
      error = e instanceof Error ? e.message : 'Registration failed';
    } finally {
      loading = false;
    }
  }
</script>


<div class="bg-blue-100 flex items-center justify-center min-h-screen">
  <div class="bg-white p-6 m-4 rounded-xl shadow-lg w-full max-w-lg min-h-135">

    <h1 class="text-3xl font-bold text-center text-blue-600 mb-2">
      Email Sender
    </h1>
    <p class="text-center text-gray-500">
      Secure bulk email management
    </p>

    <!-- SWITCH BUTTONS (SAME UI) -->
    <div class="bg-white p-6 flex items-center rounded-xl w-full max-w-sm gap-2">

  <!-- SIGN IN -->
  <button on:click={() => goto('/auth/login')}
          class="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
    Sign In
  </button>

  <!-- SIGN UP -->
  <button  on:click={() => goto('/auth/register')}
          class="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition">
    Sign Up
  </button>

</div>

    <!-- REGISTER FORM -->
    <form on:submit|preventDefault={submitForm} class="space-y-4">

      <div>
        <label for="name" class="block text-gray-700 font-medium mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          bind:value={form.name}
          placeholder="Name"
          class="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label for="email" class="block text-gray-700 font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          bind:value={form.email}
          placeholder="you@example.com"
          class="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label for="password" class="block text-gray-700 font-medium mb-1">
          Password (min 6 chars)
        </label>
        <input
          id="password"
          type="password"
          bind:value={form.password}
          placeholder="Password"
          class="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {#if error}
        <p class="text-red-600 text-sm">{error}</p>
      {/if}

      <button
        type="submit"
        disabled={loading}
        class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? 'Creating...' : 'Create Account'}
      </button>

    </form>

    <p class="text-center text-gray-400 mt-6 text-sm">
      Secure authentication with session management
    </p>
  </div>
</div>
