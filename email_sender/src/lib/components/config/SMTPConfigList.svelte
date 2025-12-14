<script lang="ts">
  import SMTPTestButton from './SMTPTestButton.svelte';
  import type { SMTPConfig } from '$lib/types';
  import { createEventDispatcher } from 'svelte';

  export let configs: SMTPConfig[] = [];

  const dispatch = createEventDispatcher();

  function handleEdit(cfg: SMTPConfig) {
    dispatch('edit', cfg);
  }

  function handleDelete(id: string) {
    dispatch('delete', id);
  }

  function handleTest(cfg: SMTPConfig) {
    dispatch('test', cfg);
  }

  function handleSetDefault(id: string) {
    dispatch('setdefault', id);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each configs as cfg}
    <div class="border rounded p-4 shadow hover:shadow-lg">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold">{cfg.name} {cfg.isDefault ? "(Default)" : ""}</h3>
        <div class="flex gap-1">
          <!-- ✅ Pass 'config' instead of 'cfg' -->
          <SMTPTestButton config={cfg} on:test={() => handleTest(cfg)} />
          <button class="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500" on:click={() => handleEdit(cfg)}>Edit</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" on:click={() => handleDelete(cfg.id)}>Delete</button>
        </div>
      </div>
      <div class="text-sm text-gray-700 space-y-1">
        <p>Host: {cfg.host}</p>
        <p>Port: {cfg.port}</p>
        <p>User: {cfg.user}</p>
        <p>From Email: {cfg.fromEmail}</p>
        <p>Secure: {cfg.secure ? "Yes" : "No"}</p>
      </div>
      {#if !cfg.isDefault}
        <button class="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm" on:click={() => handleSetDefault(cfg.id)}>
          Set as Default
        </button>
      {/if}
    </div>
  {/each}
</div>
