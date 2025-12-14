<script lang="ts">
  export let open = false;
  export let title = '';
</script>

{#if open}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">{title}</h2>
      <slot />
    </div>
  </div>
{/if}
