<script>
  import { Dumbbell } from '@lucide/svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import PlateCalculator from '$lib/components/plate-calculator.svelte';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="flex items-center gap-2 text-lg">
      <Dumbbell class="text-primary h-5 w-5" />
      Plate calculator
    </Card.Title>
    <Card.Description>Calculate total weight on your barbell</Card.Description>
  </Card.Header>
  <Card.Content>
    <PlateCalculator />
  </Card.Content>
</Card.Root>
