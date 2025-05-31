<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { ArrowUpDown, Trash2 } from '@lucide/svelte';
  import QuickConvertionButton from './quick-convertion-button.svelte';

  let kgValue = '';
  let lbValue = '';

  function updateValues(newKgValue: string, newLbValue: string) {
    kgValue = newKgValue;
    lbValue = newLbValue;
  }

  function handleKgChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value === '') {
      updateValues('', '');
    } else {
      const numValue = parseFloat(value);
      updateValues(value, (numValue * 2.20462).toFixed(2));
    }
  }

  function handleLbChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value === '') {
      updateValues('', '');
    } else {
      const numValue = parseFloat(value);
      updateValues((numValue * 0.453592).toFixed(2), value);
    }
  }

  function incrementKg() {
    const currentValue = kgValue === '' ? 0 : parseFloat(kgValue);
    const newValue = (currentValue + 1).toString();
    updateValues(newValue, (currentValue * 2.20462 + 2.20462).toFixed(2));
  }

  function decrementKg() {
    const currentValue = kgValue === '' ? 0 : parseFloat(kgValue);
    const newValue = currentValue - 1;
    if (newValue >= 0) {
      updateValues(newValue.toString(), (newValue * 2.20462).toFixed(2));
    }
  }

  function incrementLb() {
    const currentValue = lbValue === '' ? 0 : parseFloat(lbValue);
    const newValue = (currentValue + 1).toString();
    updateValues((currentValue * 0.453592 + 0.453592).toFixed(2), newValue);
  }

  function decrementLb() {
    const currentValue = lbValue === '' ? 0 : parseFloat(lbValue);
    const newValue = currentValue - 1;
    if (newValue >= 0) {
      updateValues((newValue * 0.453592).toFixed(2), newValue.toString());
    }
  }

  function clearValues() {
    updateValues('', '');
  }

  function handleQuickConversion(lbs: number) {
    updateValues((lbs * 0.453592).toFixed(2), lbs.toString());
  }

  function selectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    input.select();
  }
</script>

<div class="flex flex-col gap-8">
  <div class="flex justify-around">
    <div class="flex flex-col py-4">
      <button class="flex-1 text-4xl" on:click={incrementKg}>+</button>
      <button class="flex-1 text-4xl" on:click={decrementKg}>-</button>
    </div>
    <input
      type="number"
      placeholder="00"
      class="w-32 border-none text-center text-6xl [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      bind:value={kgValue}
      on:input={handleKgChange}
      on:focus={selectAll}
    />
    <p class="text-muted-foreground cursor-default self-end pb-4 text-4xl select-none">kg</p>
  </div>

  <Button variant="ghost" onclick={clearValues} class="mx-auto"><Trash2 /></Button>

  <div class="flex justify-around">
    <div class="flex flex-col py-4">
      <button class="flex-1 text-4xl" on:click={incrementLb}>+</button>
      <button class="flex-1 text-4xl" on:click={decrementLb}>-</button>
    </div>
    <input
      type="number"
      placeholder="00"
      class="w-32 border-none text-center text-6xl [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      bind:value={lbValue}
      on:input={handleLbChange}
      on:focus={selectAll}
    />
    <p class="text-muted-foreground cursor-default self-end pb-4 text-4xl select-none">lb</p>
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
