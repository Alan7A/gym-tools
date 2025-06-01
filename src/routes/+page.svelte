<script>
  import { ArrowUpDown } from '@lucide/svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import UnitConverter from '$lib/components/unit-converter.svelte';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="flex items-center gap-2 text-lg">
      <ArrowUpDown class="text-primary h-5 w-5" />
      Unit Converter
    </Card.Title>
    <Card.Description>Quick conversion between kilograms and pounds</Card.Description>
  </Card.Header>
  <Card.Content>
    <UnitConverter />
  </Card.Content>
</Card.Root>
