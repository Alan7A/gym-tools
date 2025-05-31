<script>
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { ArrowUpDown, BicepsFlexed, Dumbbell, Flame } from '@lucide/svelte';
</script>

<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="converter">
      <ArrowUpDown class="h-4 w-4" />
      <a href="/">Converter</a>
    </Tabs.Trigger>
    <Tabs.Trigger value="disk">
      <Dumbbell class="h-4 w-4" />
      <a href="/disks">Disks</a>
    </Tabs.Trigger>
    <Tabs.Trigger value="warmup">
      <Flame class="h-4 w-4" />
      <a href="/warmup">Warmup</a>
    </Tabs.Trigger>
    <Tabs.Trigger value="max-rep">
      <BicepsFlexed class="h-4 w-4" />
      <a href="/max-rep">Max Rep</a>
    </Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
