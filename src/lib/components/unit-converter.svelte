<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Save, Trash2 } from '@lucide/svelte';
  import QuickConvertionButton from './quick-convertion-button.svelte';
  import AnimatedInput from './animated-input.svelte';
  import { conversionState } from '$lib/state/conversionState.svelte';
  import { onMount } from 'svelte';
  import autoAnimate from '@formkit/auto-animate';

  let savedConversions = $state<number[]>([]);

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

  function handleQuickConversion(lbs: number) {
    updateValues(Number((lbs * 0.453592).toFixed(2)), lbs);
  }

  function saveConversion() {
    if (conversionState.lbValue && conversionState.lbValue > 0) {
      const currentSaved = getSavedConversions();
      if (!currentSaved.includes(conversionState.lbValue)) {
        currentSaved.push(conversionState.lbValue);
        currentSaved.sort((a, b) => a - b);
        localStorage.setItem('savedConversions', JSON.stringify(currentSaved));
        savedConversions = currentSaved;
      }
    }
  }

  function getSavedConversions(): number[] {
    if (typeof localStorage === 'undefined') return [];
    const saved = localStorage.getItem('savedConversions');
    return saved ? JSON.parse(saved) : [];
  }

  function deleteConversion(lbValue: number) {
    const currentSaved = getSavedConversions();
    const filteredSaved = currentSaved.filter((value) => value !== lbValue);
    localStorage.setItem('savedConversions', JSON.stringify(filteredSaved));
    savedConversions = filteredSaved;
  }

  onMount(() => {
    savedConversions = getSavedConversions();
  });
</script>

<div class="flex flex-col gap-6" use:autoAnimate>
  <div class="flex gap-6">
    <AnimatedInput value={conversionState.kgValue ?? 0} oninput={handleKgChange} />
    <p class="text-muted-foreground min-w-10 cursor-default self-end text-4xl select-none">kg</p>
  </div>

  <div class="flex gap-6">
    <AnimatedInput value={conversionState.lbValue ?? 0} oninput={handleLbChange} />
    <p class="text-muted-foreground min-w-10 cursor-default self-end text-4xl select-none">lb</p>
  </div>

  {#if conversionState.lbValue && conversionState.lbValue > 0}
    <div class="flex gap-2">
      <Button onclick={saveConversion} variant="secondary" size="sm" class="flex-1">
        <Save size={16} />
        Save conversion
      </Button>
      <Button onclick={() => updateValues(null, null)} variant="outline" size="sm">
        <Trash2 size={16} />
      </Button>
    </div>
  {/if}

  <Separator />

  <div class="flex flex-col gap-3">
    {#if savedConversions.length > 0}
      <h3 class="text-muted-foreground text-lg">Saved conversions</h3>

      <div class="grid grid-cols-2 gap-4" use:autoAnimate>
        {#each savedConversions as lbValue}
          <QuickConvertionButton
            {lbValue}
            onclick={() => handleQuickConversion(lbValue)}
            ondelete={() => deleteConversion(lbValue)}
          />
        {/each}
      </div>
    {:else}
      <h3 class="text-muted-foreground text-lg">No saved conversions</h3>
      <p class="text-muted-foreground text-sm">
        Enter a weight and save it to see quick conversions here.
      </p>
    {/if}
  </div>
</div>
