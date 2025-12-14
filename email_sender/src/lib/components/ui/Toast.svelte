<script lang="ts">
  import { toasts } from '$lib/stores/toast'; // store import
</script>

<style>
  .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 9999;
  }
</style>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <div
      class="px-4 py-2 rounded shadow text-white"
      class:bg-green-500={toast.type === 'success'}
      class:bg-red-500={toast.type === 'error'}
      class:bg-blue-500={toast.type === 'info'}
    >
      {toast.message}
    </div>
  {/each}
</div>
