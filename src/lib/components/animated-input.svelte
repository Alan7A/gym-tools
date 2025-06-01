<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import clsx from 'clsx/lite';
  import { selectAll } from '$lib/utils';
  import { Minus, Plus } from '@lucide/svelte';

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
    let next = value;
    if (input.value === '') {
      next = defaultValue;
    } else {
      const num = input.valueAsNumber;
      if (!isNaN(num) && min <= num && num <= max) next = num;
    }
    // Manually update the input.value in case the number stays the same e.g. 09 == 9
    input.value = String(next);
    value = next;
    oninput(event);
  }

  function handleFocus(event: Event) {
    isFocused = true;
    selectAll(event);
  }

  function handleBlur() {
    isFocused = false;
  }

  //   function handlePointerDown(event: PointerEvent, diff: number) {
  //     animated = true;
  //     if (event.pointerType === 'mouse') {
  //       event?.preventDefault();
  //       input.focus();
  //     }
  //     const newVal = Math.min(Math.max(value + diff, min), max);
  //     value = newVal;
  //   }
</script>

<div
  class="focus-within:ring-accent group flex flex-1 items-stretch rounded-md text-3xl font-semibold ring ring-zinc-200 transition-[box-shadow] focus-within:ring-2 dark:ring-zinc-800"
>
  <!-- <div class="flex flex-col">
    <button
      aria-hidden="true"
      tabindex={-1}
      class="flex items-center pr-[.325em] pl-[.5em]"
      disabled={min != null && value <= min}
      onpointerdown={(event) => handlePointerDown(event, -1)}
    >
      <Minus class="size-4" absoluteStrokeWidth strokeWidth="3.5" />
    </button>
    <button
      aria-hidden="true"
      tabindex={-1}
      class="flex items-center pr-[.325em] pl-[.5em]"
      disabled={min != null && value <= min}
      onpointerdown={(event) => handlePointerDown(event, -1)}
    >
      <Minus class="size-4" absoluteStrokeWidth strokeWidth="3.5" />
    </button>
  </div> -->
  <div
    class="relative grid w-full items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]"
  >
    <input
      bind:this={input}
      class={clsx(
        showCaret ? 'caret-primary' : 'caret-transparent',
        'spin-hide w-full bg-transparent py-2 !text-center font-[inherit] text-transparent outline-none [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
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
