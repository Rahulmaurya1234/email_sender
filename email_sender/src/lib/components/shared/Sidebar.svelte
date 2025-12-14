<script lang="ts">
  // ✅ ADD THIS
  export let user: {
    name: string;
    email: string;
  };

  import { onMount } from 'svelte';

  type BatchStatus = {
    running: boolean;
    total?: number;
    sent?: number;
  };

  let batchStatus: BatchStatus | null = null;
  let scheduledJobs: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const [batchRes, scheduledRes] = await Promise.all([
        fetch('/api/batch-status', { credentials: 'include' }),
        fetch('/api/scheduled-jobs', { credentials: 'include' })
      ]);

      if (batchRes.ok) {
        const b = await batchRes.json();
        batchStatus = b?.data ?? null;
      }

      if (scheduledRes.ok) {
        const s = await scheduledRes.json();
        scheduledJobs = s?.data ?? [];
      }
    } catch (err) {
      console.error('Dashboard load failed', err);
    } finally {
      loading = false;
    }
  });
</script>


<aside class="bg-white rounded-lg shadow-md p-4 m-4">
  <h2 class="font-semibold text-lg mb-3">📊 Active Jobs Dashboard</h2>

  {#if loading}
    <div class="text-gray-400">Loading status...</div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Active Batch -->
      <div class="bg-gray-50 rounded p-3">
        ⚡ Active Batch Jobs:
        {#if batchStatus?.running}
          <span class="font-semibold text-green-600">
            Running ({batchStatus.sent}/{batchStatus.total})
          </span>
        {:else}
          None
        {/if}
      </div>

      <!-- Scheduled -->
      <div class="bg-gray-50 rounded p-3">
        📅 Upcoming Scheduled Jobs:
        {#if scheduledJobs.length > 0}
          <span class="font-semibold text-blue-600">
            {scheduledJobs.length}
          </span>
        {:else}
          None
        {/if}
      </div>
    </div>

    <!-- Recent activity -->
    <div class="mt-4 border-l-2 border-gray-200 pl-4">
      <h6 class="font-semibold">📈 Recent Activity</h6>

      {#if scheduledJobs.length > 0}
        <ul class="text-sm text-gray-600 mt-2 space-y-1">
          {#each scheduledJobs.slice(0, 3) as job}
            <li>
              • Scheduled at
              <span class="font-medium">
                {new Date(job.scheduledTime).toLocaleString()}
              </span>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="text-gray-400">No recent activity</div>
      {/if}
    </div>
  {/if}
</aside>
