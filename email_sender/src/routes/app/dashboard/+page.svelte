  <script lang="ts">
    import { onMount, onDestroy } from "svelte";

    interface DashboardStatus {
      pollNeeded: boolean;
      pollInterval: number;
      hasActiveBatch: boolean;
      hasScheduledJobs: boolean;
      hasRunningScheduledJobs: boolean;
      activeBatchCount: number;
      scheduledJobCount: number;
      lastUpdated: string;
    }

    interface ScheduledJob {
      id: string;
      name: string;
      status: string;
      createdAt: string;
      nextRun: string;
    }

    interface DashboardData {
      batch: any;
      scheduledJobs: ScheduledJob[];
      timestamp: string;
    }

    let status: DashboardStatus | null = null;
    let data: DashboardData | null = null;
    let loading = true;

    let pollTimeout: number | undefined;

    async function fetchStatus() {
      try {
        const res = await fetch("/api/dashboard/poll-status", {
          credentials: "include"
        });
        const json = await res.json();

        if (json?.success) {
          status = json.data ?? null;
        }
      } catch (err) {
        console.error("Error fetching poll status:", err);
      }
    }

    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/data", {
          credentials: "include"
        });
        const json = await res.json();

        if (json?.success) {
          data = json.data ?? null;
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        loading = false;

        if (status?.pollNeeded) {
          pollTimeout = window.setTimeout(
            fetchData,
            status.pollInterval ?? 30000
          );
        }
      }
    }

    onMount(async () => {
      await fetchStatus();
      await fetchData();
    });

    onDestroy(() => {
      if (pollTimeout) clearTimeout(pollTimeout);
    });
  </script>

  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-semibold mb-4">📊 Dashboard</h1>

    {#if loading}
      <div class="text-gray-500">Loading dashboard...</div>
    {:else}
      <!-- ================= STATUS CARDS ================= -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-green-100 rounded p-4 shadow">
          <h2 class="font-semibold">Active Batch Jobs</h2>
          <p class="text-2xl">{status?.activeBatchCount ?? 0}</p>
          <p class="text-sm text-gray-600">Currently running</p>
        </div>

        <div class="bg-yellow-100 rounded p-4 shadow">
          <h2 class="font-semibold">Scheduled Jobs</h2>
          <p class="text-2xl">{status?.scheduledJobCount ?? 0}</p>
          <p class="text-sm text-gray-600">Pending or running</p>
        </div>

        <div class="bg-red-100 rounded p-4 shadow">
          <h2 class="font-semibold">Running Scheduled</h2>
          <p class="text-2xl">{status?.hasRunningScheduledJobs ? 1 : 0}</p>
          <p class="text-sm text-gray-600">Currently running</p>
        </div>
      </div>

      <!-- ================= SCHEDULED JOBS TABLE ================= -->
      <div class="bg-white rounded shadow p-4 mt-4 overflow-x-auto">
        <h2 class="font-semibold mb-3">🗓️ Scheduled Jobs</h2>

        {#if data?.scheduledJobs?.length}
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job Name</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Next Run</th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
              {#each data.scheduledJobs as job}
                <tr>
                  <td class="px-4 py-2 text-sm text-gray-700">{job.name}</td>
                  <td class="px-4 py-2 text-sm text-gray-700">{job.status}</td>
                  <td class="px-4 py-2 text-sm text-gray-700">{job.createdAt}</td>
                  <td class="px-4 py-2 text-sm text-gray-700">{job.nextRun}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else}
          <p class="text-gray-500">No scheduled jobs found.</p>
        {/if}
      </div>

      <div class="text-sm text-gray-400 mt-2">
        Last Updated: {status?.lastUpdated ?? "-"}
      </div>
    {/if}
  </div>
