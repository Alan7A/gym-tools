<script lang="ts">
  import WeightToggle from './weight-toggle.svelte';
  import { plateCalculatorState } from '$lib/state/plateCalculatorState.svelte';
  import { goto } from '$app/navigation';

  type Props = {
    setNumber: number;
    targetWeight: number;
    percentage: number;
    reps: number;
  };

  const { setNumber, targetWeight, percentage, reps }: Props = $props();
  const weight = $derived(targetWeight * (percentage / 100));

  function goToPlateCalculator() {
    plateCalculatorState.targetWeight = weight;
    goto('/plates');
  }
</script>

<div class="bg-accent flex justify-between rounded-lg px-4 py-3">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="flex cursor-pointer items-center gap-4" onclick={goToPlateCalculator}>
    <p>Set {setNumber}</p>
    <p class="text-muted-foreground text-lg">{percentage}%</p>
  </div>
  <div class="flex flex-col items-end gap-1">
    <WeightToggle kgWeight={weight} class="text-primary text-lg font-semibold" />
    <p class="text-muted-foreground text-sm">{reps} reps</p>
  </div>
</div>
