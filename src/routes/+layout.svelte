<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/nav.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import Header from '$lib/components/header.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<main class="container mx-auto flex min-h-screen max-w-sm flex-col gap-4 pt-6 pb-4">
  <Header />
  <Nav />
  <ModeWatcher defaultMode="dark" />
  {@render children()}
</main>
