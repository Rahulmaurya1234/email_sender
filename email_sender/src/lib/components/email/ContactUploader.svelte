<script lang="ts">
  let excelProcessed = false;
  let totalContacts = 0;
  let sendRange = 'all';

  function onExcelChange() {
    excelProcessed = true;
    totalContacts = 120;
  }
</script>

<div class="w-full md:w-1/2 border rounded-md p-4 bg-white">
  <div class="border rounded">
    <div class="border px-4 py-3 bg-gray-100 font-semibold">
      📄 File Uploads
    </div>

    <div class="p-4 space-y-4">
      <input type="file" class="border p-2 w-full" on:change={onExcelChange} />

      {#if excelProcessed}
        <div class="bg-green-50 border border-green-400 p-3 rounded">
          ✅ Excel Processed – {totalContacts} contacts
        </div>

        <select class="border p-2 w-full">
          <option>Send All</option>
          <option>Send First N</option>
          <option>Send Range</option>
        </select>
      {/if}

      <input type="file" class="border p-2 w-full" accept=".html" />
    </div>
  </div>
</div>
