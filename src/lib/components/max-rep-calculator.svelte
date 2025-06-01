<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import { formatNumber, selectAll } from '$lib/utils';
  import autoAnimate from '@formkit/auto-animate';

  type OneRMResult = {
    formula: string;
    result: number;
  };

  let weight = $state(0);
  let reps = $state(0);

  const showResult = $derived(weight > 0 && reps > 0);

  const formulas = $derived([
    {
      formula: 'Brzycki',
      result: weight * (36 / (37 - reps))
    },
    {
      formula: 'Epley',
      result: weight * (1 + reps / 30)
    },
    {
      formula: 'McGlothin',
      result: (100 * weight) / (101.3 - 2.67123 * reps)
    },
    {
      formula: 'Lombardi',
      result: weight * Math.pow(reps, 0.1)
    }
  ]);

  const results = $derived(
    formulas.map((formula) => ({
      formula: formula.formula,
      result: formula.result
    }))
  );

  let averageResult = $derived(
    results.reduce((acc, curr) => acc + curr.result, 0) / results.length
  );
</script>

<div class="flex flex-col gap-6" use:autoAnimate>
  <div class="flex gap-4">
    <div class="flex flex-col gap-2">
      <p>Weight (kg)</p>
      <Input
        type="number"
        placeholder="Weight lifted"
        bind:value={weight}
        onfocus={selectAll}
        class="h-12 !text-xl"
      />
    </div>
    <div class="flex flex-col gap-2">
      <p>Reps</p>
      <Input
        type="number"
        placeholder="Reps done"
        bind:value={reps}
        onfocus={selectAll}
        class="h-12 !text-xl"
      />
    </div>
  </div>

  {#if showResult}
    <div
      class="bg-primary/20 border-primary/50 flex items-center justify-between rounded-lg border px-3 py-5"
    >
      <p class="text-primary font-semibold">Estimated 1RM:</p>
      <p class="text-2xl font-semibold text-white">
        {formatNumber(averageResult)} kg
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <p>Formula results:</p>
      {#each results as result}
        <div class="bg-accent flex justify-between rounded-md p-3">
          <p class="text-sm">{result.formula}</p>
          <p class="text-lg font-semibold">{formatNumber(result.result)} kg</p>
        </div>
      {/each}
    </div>

    <div class="flex flex-col gap-2">
      <p>Training percentages:</p>
      {#each [95, 90, 85, 80, 75] as percentage}
        <div class="bg-accent flex justify-between rounded-md p-3">
          <p class="text-sm">{percentage}%</p>
          <p class="text-lg font-semibold">{formatNumber(averageResult * (percentage / 100))} kg</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
