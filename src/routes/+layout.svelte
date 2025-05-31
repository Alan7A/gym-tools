<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/nav.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import Header from '$lib/components/header.svelte';

  let { children } = $props();
</script>

<main class="container mx-auto flex min-h-screen max-w-sm flex-col gap-4 py-4">
  <Header />
  <Nav />
  <ModeWatcher defaultMode="dark" />
  {@render children()}
</main>
