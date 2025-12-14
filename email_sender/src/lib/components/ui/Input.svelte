<script lang="ts">
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
</script>

<input
  type={type}
  placeholder={placeholder}
  bind:value
  class="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
