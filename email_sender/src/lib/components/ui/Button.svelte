<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
  type={type}
  class={`px-4 py-2 rounded font-medium ${
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }`}
>
  <slot />
</button>
