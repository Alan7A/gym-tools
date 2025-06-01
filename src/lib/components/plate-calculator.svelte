<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { formatNumber, selectAll } from '$lib/utils';

  let barWeight = $state(20);
  let targetWeight = $state(0);
  let plateCounts = $state<Record<number, number>>({});

  const plates = [20, 15, 10, 5, 2.5, 1];

  const showResult = $derived(barWeight > 0 && targetWeight > 0);

  $effect(() => {
    const target = targetWeight;
    const bar = barWeight;

    if (isNaN(target) || isNaN(bar)) return;

    const weightToLoad = target - bar;
    if (weightToLoad <= 0) {
      plateCounts = {};
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

    plateCounts = newPlateCounts;
  });

  const getTotalWeight = () => {
    const bar = barWeight || 0;
    const platesWeight = Object.entries(plateCounts).reduce((total, [weight, count]) => {
      return total + Number(weight) * count * 2;
    }, 0);
    return bar + platesWeight;
  };
</script>

<div class="flex flex-col gap-6">
  <div class="flex gap-4">
    <div class="flex flex-col gap-2">
      <p>Bar weight (kg)</p>
      <Input
        type="number"
        placeholder="Enter bar weight"
        bind:value={barWeight}
        onfocus={selectAll}
        class="h-12 !text-xl"
      />
    </div>
    <div class="flex flex-col gap-2">
      <p>Target weight (kg)</p>
      <Input
        type="number"
        placeholder="Enter target weight"
        bind:value={targetWeight}
        onfocus={selectAll}
        class="h-12 !text-xl"
      />
    </div>
  </div>

  {#if showResult}
    <div class="flex flex-col gap-2">
      <p>Plates per side:</p>
      {#each plates as plate}
        {#if plateCounts[plate] > 0}
          <div class="bg-muted flex justify-between rounded-md p-2">
            <p>{plate} kg plates</p>
            <p>x{plateCounts[plate]}</p>
          </div>
        {/if}
      {/each}
    </div>

    <div
      class="bg-primary/20 border-primary/50 flex items-center justify-between rounded-lg border px-3 py-4"
    >
      <p>Total weight:</p>
      <p class="text-primary text-xl font-semibold">{getTotalWeight()} kg</p>
    </div>
  {/if}
</div>
