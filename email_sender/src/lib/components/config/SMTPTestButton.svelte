<script lang="ts">
  import type { SMTPConfig } from '$lib/types';
  import { addToast } from '$lib/stores/toast';  

  export let config: SMTPConfig;
  let testing = false;

  async function testConnection() {
    testing = true;
    try {
      const res = await fetch(`/api/config/smtp/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        addToast(data.message || 'Connection successful!', 'success');
      } else {
        addToast(data.message || 'Connection failed!', 'error');
      }
    } catch (err) {
      console.error(err);
      addToast('Error testing SMTP config', 'error');
    }
    testing = false;
  }
</script>

<button
  class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50"
  on:click={testConnection}
  disabled={testing}
>
  {#if testing}
    Testing...
  {:else}
    Test
  {/if}
</button>
