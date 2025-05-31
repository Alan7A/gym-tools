<script>
  import { Button } from '$lib/components/ui/button';

  const { lbsValue, onclick } = $props();

  const kgValue = (lbsValue * 0.453592).toFixed(2);
</script>

<Button variant="outline" class="flex h-16 flex-col" {onclick}>
  <p class="text-primary">{lbsValue} lbs</p>
  <p class="text-muted-foreground">{kgValue} kg</p>
</Button>
