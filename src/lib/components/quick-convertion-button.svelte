<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { X } from '@lucide/svelte';

  type Props = {
    lbValue: number;
    onclick: () => void;
    ondelete: () => void;
  };

  const { lbValue, onclick, ondelete }: Props = $props();

  const kgValue = (lbValue * 0.453592).toFixed(2);
</script>

<div class="relative">
  <Button variant="outline" class="flex h-16 w-full flex-col" {onclick}>
    <p class="text-primary">{lbValue} lbs</p>
    <p class="text-muted-foreground">{kgValue} kg</p>
  </Button>

  {#if ondelete}
    <Button
      variant="ghost"
      size="sm"
      class="text-muted-foreground absolute top-0 right-0 h-6 w-6 rounded-full p-0"
      onclick={ondelete}
    >
      <X size={12} />
    </Button>
  {/if}
</div>
