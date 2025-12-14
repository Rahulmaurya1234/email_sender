<script lang="ts">
  import { onMount } from "svelte";

  interface Log {
    email: string;
    status: string;
    subject: string;
    timestamp: string;
  }

  interface Stats {
    sent: number;
    failed: number;
    queued: number;
  }

  let logs: Log[] = [];
  let filteredLogs: Log[] = [];
  let stats: Stats = { sent: 0, failed: 0, queued: 0 };
  let loading = true;

  let searchQuery = "";
  let currentPage = 1;
  let logsPerPage = 10;

  async function fetchReport() {
    loading = true;
    try {
      const res = await fetch("/api/report");
      const data = await res.json();
      if (data.success) {
        logs = data.data.logs;
        stats = data.data.stats;
        applyFilter();
      }
    } catch (err) {
      console.error(err);
    }
    loading = false;
  }

  function applyFilter() {
    if (searchQuery.trim() === "") {
      filteredLogs = logs;
    } else {
      filteredLogs = logs.filter(
        (log) =>
          log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    currentPage = 1; // reset page
  }

  function exportCSV() {
    window.open("/api/report/export/csv", "_blank");
  }

  function exportJSON() {
    window.open("/api/report/export/json", "_blank");
  }

  async function clearLogs() {
    if (confirm("Are you sure you want to clear all logs?")) {
      const res = await fetch("/api/report/clear", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        logs = [];
        filteredLogs = [];
        stats = { sent: 0, failed: 0, queued: 0 };
        alert("Logs cleared successfully");
      }
    }
  }

  const totalPages = () => Math.ceil(filteredLogs.length / logsPerPage);

  const paginatedLogs = () => {
    const start = (currentPage - 1) * logsPerPage;
    return filteredLogs.slice(start, start + logsPerPage);
  };

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

  function nextPage() {
    if (currentPage < totalPages()) currentPage++;
  }

  onMount(fetchReport);
</script>

<div class="p-4 space-y-4">

  <!-- ================= STATS CARDS ================= -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-green-100 p-4 rounded shadow">
      <h3 class="font-semibold">Sent</h3>
      <p class="text-xl">{stats.sent}</p>
    </div>
    <div class="bg-red-100 p-4 rounded shadow">
      <h3 class="font-semibold">Failed</h3>
      <p class="text-xl">{stats.failed}</p>
    </div>
    <div class="bg-yellow-100 p-4 rounded shadow">
      <h3 class="font-semibold">Queued</h3>
      <p class="text-xl">{stats.queued}</p>
    </div>
  </div>

  <!-- ================= ACTION BUTTONS ================= -->
  <div class="flex gap-2 flex-wrap">
    <button on:click={exportCSV} class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
      Export CSV
    </button>
    <button on:click={exportJSON} class="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700">
      Export JSON
    </button>
    <button on:click={clearLogs} class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
      Clear Logs
    </button>
    <input type="text" placeholder="Search logs..." bind:value={searchQuery} 
      on:input={applyFilter} class="border px-3 py-1 rounded ml-2 flex-1" />
  </div>

  <!-- ================= LOGS TABLE ================= -->
  {#if loading}
    <div class="text-center py-4">Loading...</div>
  {:else}
    <div class="overflow-x-auto bg-white rounded shadow mt-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each paginatedLogs() as log}
            <tr>
              <td class="px-4 py-2 text-sm text-gray-700">{log.email}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{log.status}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{log.subject}</td>
              <td class="px-4 py-2 text-sm text-gray-700">{log.timestamp}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      {#if filteredLogs.length === 0}
        <div class="p-4 text-center text-gray-500">No logs found</div>
      {/if}
    </div>

    <!-- ================= PAGINATION ================= -->
    {#if filteredLogs.length > logsPerPage}
      <div class="flex justify-center items-center gap-2 mt-3">
        <button on:click={prevPage} class="px-3 py-1 border rounded hover:bg-gray-100" disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages()}</span>
        <button on:click={nextPage} class="px-3 py-1 border rounded hover:bg-gray-100" disabled={currentPage === totalPages()}>Next</button>
      </div>
    {/if}
  {/if}
</div>
