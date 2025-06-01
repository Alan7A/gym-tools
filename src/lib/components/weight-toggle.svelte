<script lang="ts">
  import { cn, formatNumber } from '$lib/utils';

  type Props = {
    kgWeight: number;
    class?: string;
  };

  let { kgWeight, class: className }: Props = $props();

  let isKg = $state(true);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<span class={cn('cursor-pointer', className)} onclick={() => (isKg = !isKg)}>
  {formatNumber(isKg ? kgWeight : kgWeight * 2.20462)}
  {isKg ? 'kg' : 'lb'}
</span>
