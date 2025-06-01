<script>
  import { Calculator } from '@lucide/svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import MaxRepCalculator from '$lib/components/max-rep-calculator.svelte';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="flex items-center gap-2 text-lg">
      <Calculator class="text-primary h-5 w-5" />
      Max Rep Calculator
    </Card.Title>
    <Card.Description>Estimate your one-rep max (1RM)</Card.Description>
  </Card.Header>
  <Card.Content>
    <MaxRepCalculator />
  </Card.Content>
</Card.Root>
