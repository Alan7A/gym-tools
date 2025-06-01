<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { selectAll } from '$lib/utils';
  import autoAnimate from '@formkit/auto-animate';
  import { plateCalculatorState } from '$lib/state/plateCalculatorState.svelte';
  import WeightToggle from './weight-toggle.svelte';

  const plates = [20, 15, 10, 5, 1];

  const showResult = $derived(
    plateCalculatorState.barWeight > 0 && plateCalculatorState.targetWeight > 0
  );

  $effect(() => {
    const target = plateCalculatorState.targetWeight;
    const bar = plateCalculatorState.barWeight;

    if (isNaN(target) || isNaN(bar)) return;

    const weightToLoad = target - bar;
    if (weightToLoad <= 0) {
      plateCalculatorState.plateCounts = {};
      return;
    }

    const weightPerSide = weightToLoad / 2;
    const newPlateCounts: Record<number, number> = {};
    let remaining = weightPerSide;

    for (const plate of plates) {
      const count = Math.floor(remaining / plate);
      if (count > 0) {
        newPlateCounts[plate] = count;
        remaining -= count * plate;
      }
    }

    plateCalculatorState.plateCounts = newPlateCounts;
  });

  const getTotalWeight = () => {
    const bar = plateCalculatorState.barWeight || 0;
    const platesWeight = Object.entries(plateCalculatorState.plateCounts).reduce(
      (total, [weight, count]) => {
        return total + Number(weight) * count * 2;
      },
      0
    );
    return bar + platesWeight;
  };
</script>

<div class="flex flex-col gap-6" use:autoAnimate>
  <div class="flex gap-4">
    <div class="flex flex-col gap-2">
      <p>Bar weight (kg)</p>
      <Input
        type="number"
        placeholder="Enter bar weight"
        bind:value={plateCalculatorState.barWeight}
        onfocus={selectAll}
        class="h-12 !text-xl"
      />
    </div>
    <div class="flex flex-col gap-2">
      <p>Target weight (kg)</p>
      <Input
        type="number"
        placeholder="Enter target weight"
        bind:value={plateCalculatorState.targetWeight}
        onfocus={selectAll}
        class="h-12 !text-xl"
      />
    </div>
  </div>

  {#if showResult}
    <div class="flex flex-col gap-2" use:autoAnimate>
      <p>Plates per side:</p>
      {#each plates as plate}
        {#if plateCalculatorState.plateCounts[plate] > 0}
          <div class="bg-muted flex justify-between rounded-md p-2">
            <p><WeightToggle kgWeight={plate} /> plates</p>
            <p>x{plateCalculatorState.plateCounts[plate]}</p>
          </div>
        {/if}
      {/each}
    </div>

    <div
      class="bg-primary/20 border-primary/50 flex items-center justify-between rounded-lg border px-3 py-4"
    >
      <p>Total weight:</p>
      <WeightToggle kgWeight={getTotalWeight()} class="text-primary text-xl font-semibold" />
    </div>
  {/if}
</div>
