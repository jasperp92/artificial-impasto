<script lang="ts">
  import "../app.css"
  import Footer from "$lib/components/Footer.svelte"
  import Navigation from "$lib/components/Navigation.svelte"
  import ThemeToggle from "$lib/components/ThemeToggle.svelte"

  let { children, data } = $props()
  const { title, description, childrenPages } = data
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="relative min-h-screen font-sans dark mt-4">
  <!-- Sidebar -->
  <aside class="hidden md:block fixed top-6 left-0 h-screen w-48 border-r-0 px-4">
    <Navigation />
  </aside>

  <!-- Theme Toggle -->
  <div class="fixed top-6 right-4">
    <ThemeToggle />
  </div>

  <!-- Main -->
  <main class="flex-1 pl-6 pr-6 md:ml-48">
  

    {@render children?.()}

	{#if childrenPages.length > 0}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-4">
	  {#each childrenPages as child}
		<a
		  href={child.url}
		  class="block border-1 rounded overflow-hidden p-2 hover:bg-slate-100/25"
		>
		  {#if child.thumbnail}
			<img src={child.thumbnail} alt={child.title} class="w-full h-40 object-cover" />
		  {/if}
		  <h3 class="font-tg text-4xl mt-2">{child.title}</h3>
		  {#if child.description}
			<p class="text-sm">{child.description}</p>
		  {/if}
		</a>
	  {/each}
	</div>
  {/if}
  </main>
</div>

<Footer />