<script lang="ts">
  let jobs = [
    { id: 1, name: 'Morning Campaign', status: 'Scheduled', date: '2025-12-14' },
    { id: 2, name: 'Newsletter', status: 'Completed', date: '2025-12-12' }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Scheduled Jobs</h1>

<ul class="space-y-2">
  {#each jobs as job}
    <li class="p-4 bg-white shadow rounded flex justify-between items-center">
      <span>{job.name} - {job.status}</span>
      <a class="text-blue-600 hover:underline" href={`/app/scheduled/${job.id}`}>
        Details
      </a>
    </li>
  {/each}
</ul>
