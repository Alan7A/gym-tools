<script>
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import WarmupSet from '$lib/components/warmup-set.svelte';
  import { selectAll } from '$lib/utils';
  import autoAnimate from '@formkit/auto-animate';
  import { warmupCalculatorState } from '$lib/state/warmupCalculatorState.svelte';
</script>

<div class="flex flex-col gap-4" use:autoAnimate>
  <div class="flex flex-col gap-2">
    <p>Target weight (kg)</p>
    <Input
      type="number"
      placeholder="Enter your max working weight"
      bind:value={warmupCalculatorState.targetWeight}
      onfocus={selectAll}
      class="h-12 !text-xl"
    />
  </div>
  {#if warmupCalculatorState.targetWeight > 0}
    <p>Warmup sets:</p>
    <Card.Root class="py-4">
      <Card.Content class="flex flex-col gap-2 px-4">
        <Card.Title>2 Warmup sets</Card.Title>
        <WarmupSet
          setNumber={1}
          targetWeight={warmupCalculatorState.targetWeight}
          percentage={50}
          reps={8}
        />
        <WarmupSet
          setNumber={2}
          targetWeight={warmupCalculatorState.targetWeight}
          percentage={70}
          reps={5}
        />
      </Card.Content>
    </Card.Root>
    <Card.Root class="py-4">
      <Card.Content class="flex flex-col gap-2 ">
        <Card.Title>1 Warmup set</Card.Title>
        <WarmupSet
          setNumber={1}
          targetWeight={warmupCalculatorState.targetWeight}
          percentage={60}
          reps={8}
        />
      </Card.Content>
    </Card.Root>
  {/if}
</div>
