<script lang="ts">
  import { goto } from '$app/navigation';

  // ✅ layout se aane wala user object
  export let user: {
    name: string;
    email: string;
  };

  // 🔹 UI ke liye email nikaal lo
  $: userEmail = user?.email ?? 'user@example.com';

  let showDropdown = false;

  async function logout(): Promise<void> {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!res.ok) {
        const text = await res.text();
        alert('Logout failed: ' + text);
        return;
      }

      const data = await res.json();

      if (data?.success) {
        goto('/login');
      } else {
        alert(data?.message ?? 'Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Logout failed');
    }
  }

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
</script>

<nav class="bg-blue-600 p-4 rounded mx-4 mt-0 mb-4 flex flex-col md:flex-row justify-between">
  
  <!-- LEFT -->
  <div class="text-white text-2xl font-semibold mb-2 md:mb-0">
    <a href="/app/dashboard">📧 Bulk Email Sender</a>
  </div>

  <!-- RIGHT -->
  <div class="flex flex-col ml-20 md:flex-row gap-2 w-full md:w-auto items-center">
    
    <a href="/app/send" class="text-white ml-10 px-3 py-1 rounded hover:bg-blue-500">
      Compose
    </a>

    <a href="/app/reports" class="text-white ml-10 px-3 py-1 rounded hover:bg-blue-500">
      Report
    </a>

    <a href="/app/config" class="text-white ml-10 px-3 py-1 rounded hover:bg-blue-500">
      My Config
    </a>

    <!-- USER DROPDOWN -->
    <div class="relative inline-block">
      <button
        on:click={toggleDropdown}
        class="px-4 py-2 bg-green-600 text-white rounded-full flex items-center gap-2"
      >
        {userEmail}
      </button>

      {#if showDropdown}
        <div class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
          <ul class="text-gray-700 divide-y divide-gray-200">

            <li class="px-4 py-3 text-sm text-gray-500 bg-gray-50">
              {userEmail}
            </li>

            <li>
              <a
                href="/app/config"
                class="block px-4 py-3 hover:bg-gray-100"
              >
                SMTP Configuration
              </a>
            </li>

            <li>
              <button
                on:click={logout}
                class="w-full px-4 py-3 text-red-600 hover:bg-red-50 text-left"
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      {/if}
    </div>

  </div>
</nav>
