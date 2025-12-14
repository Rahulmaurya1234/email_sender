<script lang="ts">
  import { goto } from '$app/navigation';
  goto('/login'); // ye exact path hona chahiye
  import Sidebar from '$lib/components/shared/Sidebar.svelte';
  import Navbar from '$lib/components/shared/Navbar.svelte';
  import Footer from '$lib/components/shared/Footer.svelte';
  export let data: { user: { name: string; email: string } };
</script>

<div class="min-h-screen flex flex-col bg-gray-100">
  <header>
    <Navbar user={data.user} />
  </header>

  <div class="flex flex-1">
   <Sidebar user={data.user} />
    <main class="flex-1 p-6 bg-gray-100">
      <slot />
    </main>
  </div>

  <footer>
    <Footer/>
  </footer>
</div>
