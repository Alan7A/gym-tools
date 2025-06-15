<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import clsx from 'clsx/lite';
  import { selectAll } from '$lib/utils';

  type Props = {
    min?: number;
    value?: number;
    max?: number;
    oninput: (event: Event) => void;
  };

  let { min = 0, value = $bindable(0), max = 9999, oninput }: Props = $props();
  const defaultValue = value;

  let input: HTMLInputElement;

  let isFocused = $state(false);
  // Hide the caret during transitions so you can't see it shifting around:
  let showCaret = $state(true);

  function handleInput(event: Event) {
    const inputValue = input.value;

    if (inputValue === '') {
      value = defaultValue;
      oninput(event);
      return;
    }

    if (inputValue.endsWith('.')) {
      oninput(event);
      return;
    }

    const num = parseFloat(inputValue);
    if (!isNaN(num) && min <= num && num <= max) {
      value = num;
    }

    oninput(event);
  }

  function handleFocus(event: Event) {
    isFocused = true;
    selectAll(event);
  }

  function handleBlur() {
    isFocused = false;
  }
</script>

<div
  class="focus-within:ring-accent group flex flex-1 items-stretch rounded-md text-4xl font-semibold ring ring-zinc-200 transition-[box-shadow] focus-within:ring-2 dark:ring-zinc-800"
>
  <div
    class="relative grid w-full items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]"
  >
    <input
      bind:this={input}
      class={clsx(
        showCaret ? 'caret-primary' : 'caret-transparent',
        'spin-hide bg-background w-full rounded-lg py-2.5 !text-center font-[inherit] text-transparent outline-none [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      )}
      style="font-kerning: none"
      type="number"
      {min}
      step="1"
      autocomplete="off"
      inputmode="numeric"
      {max}
      {value}
      oninput={handleInput}
      onfocus={handleFocus}
      onblur={handleBlur}
    />
    <NumberFlow
      {value}
      locales="en-US"
      format={{ useGrouping: false }}
      aria-hidden="true"
      animated={!isFocused}
      on:animationsstart={() => (showCaret = false)}
      on:animationsfinish={() => (showCaret = true)}
      class="pointer-events-none w-full"
      willChange
    />
  </div>
</div>
