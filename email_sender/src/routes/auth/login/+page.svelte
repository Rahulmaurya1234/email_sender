

<script lang="ts">
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let loading = false;
  let errorMsg = '';

  async function handleLogin() {
    loading = true;
    errorMsg = '';
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message || 'Login failed');

      goto('/app/dashboard'); // SPA navigation, no reload
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : 'Login failed';
    } finally {
      loading = false;
    }
  }
</script>



<div class="bg-blue-100 p-4 flex items-center justify-center min-h-screen">
  <div class="bg-white p-12 rounded-xl shadow-lg w-full max-w-lg min-h-135">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-2">Email Sender</h1>
    <p class="text-center text-gray-500 ">Secure bulk email management</p>
    <div class="space-y-5 ">

    <!--click button -->

     <div class="bg-white p-6 flex items-center rounded-xl w-full max-w-sm gap-2">

  <!-- Sign in-->

  <button on:click={() => goto('/auth/login')}
          class="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
    Sign In
  </button>

  <!-- Sing up -->
  <button  on:click={() => goto('/auth/register')}
          class="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition">
    Sign Up
  </button>
</div>


    <!-- Login Form -->
    <form on:submit|preventDefault={handleLogin} class="space-y-5 ">
      <div >
        <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
        <input type="email" id="email" placeholder="you@example.com" 
               bind:value={email}
               class="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
      </div>
      <div >
        <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
        <input type="password" id="password" placeholder="Password" 
               bind:value={password}
               class="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
      </div>

      <button id="myBtn" type="submit" 
              class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
        sign in
      </button>
    </form>
    </div>

    <p class="text-center text-gray-400 mt-6 text-sm">
      Secure authentication with session management
    </p>
  </div>
  </div>
