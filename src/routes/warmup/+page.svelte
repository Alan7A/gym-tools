<script>
  import { Flame } from '@lucide/svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import WarmupCalculator from '$lib/components/warmup-calculator.svelte';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="flex items-center gap-2 text-lg">
      <Flame class="text-primary h-5 w-5" />
      Warmup Calculator
    </Card.Title>
    <Card.Description>Generate optimal warmup sets</Card.Description>
  </Card.Header>
  <Card.Content>
    <WarmupCalculator />
  </Card.Content>
</Card.Root>
