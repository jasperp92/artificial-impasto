<script>
    export let pages = []
  </script>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-4">
    {#each pages as page}
      <a
        href={page.url}
        class="block border-1 rounded overflow-hidden p-2 hover:bg-slate-100/25"
      >
        {#if page.thumbnail}
          <img
            src={page.thumbnail}
            alt={page.title}
            class="w-full h-40 object-cover"
          />
        {/if}
        <h3 class="font-tg text-4xl mt-2">{page.title}</h3>
        {#if page.description}
          <p class="text-sm">{page.description}</p>
        {/if}
      </a>
    {/each}
  </div>