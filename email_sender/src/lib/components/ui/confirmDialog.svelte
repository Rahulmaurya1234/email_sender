<script lang="ts">
  export let open = false;
  export let title = '';
  export let onConfirm: () => void;
  export let onCancel: () => void;
</script>

{#if open}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg p-6 w-full max-w-sm">
      <h2 class="text-xl font-bold mb-4">{title}</h2>
      <div class="flex justify-end gap-4">
        <button on:click={onCancel} class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button on:click={onConfirm} class="px-4 py-2 bg-red-600 text-white rounded">Confirm</button>
      </div>
    </div>
  </div>
{/if}
