<script>
  import { Dumbbell } from '@lucide/svelte';
  import ThemeToggle from './theme-toggle.svelte';
</script>

<div class="relative flex items-center justify-center gap-2">
  <Dumbbell class="h-8 w-8 text-blue-400" />
  <h1 class="text-2xl font-bold">Gym Tools</h1>
  <div class="absolute top-0 right-4">
    <ThemeToggle />
  </div>
</div>
