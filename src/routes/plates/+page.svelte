<script>
  import { Dumbbell } from '@lucide/svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import PlateCalculator from '$lib/components/plate-calculator.svelte';
  import TooltipIcon from '$lib/components/ui/tooltip-icon.svelte';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="flex items-center gap-2 text-lg">
      <Dumbbell class="text-primary h-5 w-5" />
      Plate calculator
    </Card.Title>
    <Card.Description class="flex items-center gap-1">
      Calculate total weight on your barbell
      <TooltipIcon title="Click on 'Total weight:' label to calculate warmup sets" />
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <PlateCalculator />
  </Card.Content>
</Card.Root>
