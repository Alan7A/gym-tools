<script>
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { ArrowUpDown, BicepsFlexed, Dumbbell, Flame } from '@lucide/svelte';
  import { page } from '$app/state';
</script>

<Tabs.Root value={page.url.pathname.split('/')[1]}>
  <Tabs.List class="w-full">
    <Tabs.Trigger value="" class="p-0">
      <a href="/" class="flex h-full w-full items-center justify-center gap-1 p-1">
        <ArrowUpDown class="h-4 w-4" />
        Converter
      </a>
    </Tabs.Trigger>
    <Tabs.Trigger value="plates" class="p-0">
      <a href="/plates" class="flex h-full w-full items-center justify-center gap-1 p-1">
        <Dumbbell class="h-4 w-4" />
        Plates
      </a>
    </Tabs.Trigger>
    <Tabs.Trigger value="warmup" class="p-0">
      <a href="/warmup" class="flex h-full w-full items-center justify-center gap-1 p-1">
        <Flame class="h-4 w-4" />
        Warmup
      </a>
    </Tabs.Trigger>
    <Tabs.Trigger value="max-rep" class="p-0">
      <a href="/max-rep" class="flex h-full w-full items-center justify-center gap-1 p-1">
        <BicepsFlexed class="h-4 w-4" />
        Max Rep
      </a>
    </Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
