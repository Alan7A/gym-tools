<script lang="ts">
  import { formatNumber } from '$lib/utils';
  import WeightToggle from './weight-toggle.svelte';

  type Props = {
    setNumber: number;
    targetWeight: number;
    percentage: number;
    reps: number;
  };

  const { setNumber, targetWeight, percentage, reps }: Props = $props();
  const weight = $derived(targetWeight * (percentage / 100));
</script>

<!-- TODO: On click take this weigth to the disks calculator -->
<div class="bg-accent flex justify-between rounded-lg px-4 py-3">
  <div class="flex items-center gap-4">
    <p>Set {setNumber}</p>
    <p class="text-muted-foreground text-lg">{percentage}%</p>
  </div>
  <div class="flex flex-col items-end gap-1">
    <WeightToggle kgWeight={weight} class="text-primary text-lg font-semibold" />
    <p class="text-muted-foreground text-sm">{reps} reps</p>
  </div>
</div>
