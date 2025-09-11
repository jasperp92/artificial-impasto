<script lang="ts">
    let { children, data } = $props()
    const { title, description, childrenPages } = data
  </script>
  
  <main class="flex-1 p-6">
    <h1>{title}</h1>
    <h3>{description}</h3>
  
    {#if childrenPages.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-4">
        {#each childrenPages as child}
          <a href={child.url} class="block border rounded p-2 hover:bg-slate-100/25">
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
  
    {@render children?.()}
  </main>
  