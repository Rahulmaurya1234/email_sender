<script>
  let enabled = false;
</script>

<div class="border rounded bg-white mt-4">
  <div class="border-b px-4 py-3 font-semibold">⚡ Batch Processing</div>

  <div class="p-4">
    <label class="flex gap-2">
      <input type="checkbox" bind:checked={enabled} />
      Enable batch processing
    </label>

    {#if enabled}
      <div class="grid grid-cols-3 gap-3 mt-3">
        <input class="border p-2" placeholder="Batch size" />
        <input class="border p-2" placeholder="Batch delay" />
        <input class="border p-2" placeholder="Email delay" />
      </div>
    {/if}
  </div>
</div>
