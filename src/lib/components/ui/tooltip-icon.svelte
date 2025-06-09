<script lang="ts">
  import { Info } from '@lucide/svelte';
  import * as Drawer from '$lib/components/ui/drawer/index.js';
  import * as Tooltip from '$lib/components/ui/tooltip/index.js';
  import { MediaQuery } from 'svelte/reactivity';

  interface Props {
    title: string;
  }

  let { title }: Props = $props();
  let drawerOpen = $state(false);
  const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

{#if isDesktop.current}
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Info class="size-4" />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>{title}</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
{:else}
  <Drawer.Root bind:open={drawerOpen}>
    <Drawer.Trigger>
      <Info class="size-4" />
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Information</Drawer.Title>
        <Drawer.Description>
          {title}
        </Drawer.Description>
      </Drawer.Header>
    </Drawer.Content>
  </Drawer.Root>
{/if}
