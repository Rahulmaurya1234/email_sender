<script lang="ts">
  import type { SMTPConfig } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let showModal = false;
  export let mode: "add" | "edit" = "add";
  export let config: Partial<SMTPConfig> = {};

  const dispatch = createEventDispatcher();

  function save() {
    dispatch('save', config);
  }

  function close() {
    dispatch('close');
  }
</script>

{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-3">{mode === "add" ? "Add New" : "Edit"} SMTP Config</h3>
      <div class="space-y-2">
        <input type="text" placeholder="Name" class="border px-3 py-2 w-full rounded" bind:value={config.name} />
        <input type="text" placeholder="Host" class="border px-3 py-2 w-full rounded" bind:value={config.host} />
        <input type="number" placeholder="Port" class="border px-3 py-2 w-full rounded" bind:value={config.port} />
        <input type="text" placeholder="User" class="border px-3 py-2 w-full rounded" bind:value={config.user} />
        <input type="password" placeholder="Password" class="border px-3 py-2 w-full rounded" bind:value={config.pass} />
        <input type="email" placeholder="From Email" class="border px-3 py-2 w-full rounded" bind:value={config.fromEmail} />
        <input type="text" placeholder="From Name" class="border px-3 py-2 w-full rounded" bind:value={config.fromName} />
        <label class="flex items-center gap-2 mt-1">
          <input type="checkbox" bind:checked={config.isDefault} />
          <span>Set as Default</span>
        </label>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button class="px-3 py-1 rounded border hover:bg-gray-100" on:click={close}>Cancel</button>
        <button class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" on:click={save}>Save</button>
      </div>
    </div>
  </div>
{/if}
