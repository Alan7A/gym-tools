<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Minus, Plus, Trash2 } from '@lucide/svelte';
  import QuickConvertionButton from './quick-convertion-button.svelte';
  import AnimatedInput from './animated-input.svelte';
  import { conversionState } from '$lib/state/conversionState.svelte';

  function updateValues(newKgValue: number | null, newLbValue: number | null) {
    conversionState.kgValue = newKgValue;
    conversionState.lbValue = newLbValue;
  }

  function handleKgChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value === '') {
      updateValues(null, null);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        updateValues(numValue, Number((numValue * 2.20462).toFixed(2)));
      }
    }
  }

  function handleLbChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value === '') {
      updateValues(null, null);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        updateValues(Number((numValue * 0.453592).toFixed(2)), numValue);
      }
    }
  }

  function updateKg(step: number) {
    const currentValue = conversionState.kgValue ?? 0;
    const newValue = currentValue + step;
    updateValues(newValue, Number((newValue * 2.20462).toFixed(2)));
  }

  function updateLb(step: number) {
    const currentValue = conversionState.lbValue ?? 0;
    const newValue = currentValue + step;
    updateValues(Number((newValue * 0.453592).toFixed(2)), newValue);
  }

  function handleQuickConversion(lbs: number) {
    updateValues(Number((lbs * 0.453592).toFixed(2)), lbs);
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex gap-6">
    <AnimatedInput value={conversionState.kgValue ?? 0} oninput={handleKgChange} />
    <p class="text-muted-foreground min-w-10 cursor-default self-end text-4xl select-none">kg</p>
  </div>

  <div class="flex gap-6">
    <AnimatedInput value={conversionState.lbValue ?? 0} oninput={handleLbChange} />
    <p class="text-muted-foreground min-w-10 cursor-default self-end text-4xl select-none">lb</p>
  </div>

  <Separator />

  <h3 class="text-muted-foreground text-lg">Quick conversions</h3>

  <div class="grid grid-cols-2 gap-4">
    <QuickConvertionButton lbsValue="1" onclick={() => handleQuickConversion(1)} />
    <QuickConvertionButton lbsValue="5" onclick={() => handleQuickConversion(5)} />
    <QuickConvertionButton lbsValue="10" onclick={() => handleQuickConversion(10)} />
    <QuickConvertionButton lbsValue="15" onclick={() => handleQuickConversion(15)} />
    <QuickConvertionButton lbsValue="35" onclick={() => handleQuickConversion(35)} />
    <QuickConvertionButton lbsValue="45" onclick={() => handleQuickConversion(45)} />
  </div>
</div>
