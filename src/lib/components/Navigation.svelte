<script>
    import { page } from '$app/stores'
    import ThemeToggle from './ThemeToggle.svelte';
  
    $: currentPath = $page.url.pathname
  
    // Root-Ordner (+page.svx)
    const roots = Object.entries(
      import.meta.glob('/src/routes/*/+page.{svelte,svx,md}', { eager: true })
    ).map(([path, mod]) => {
      const folder = path
        .replace('/src/routes/', '')
        .replace('/+page.svelte', '')
        .replace('/+page.svx', '')
        .replace('/+page.md', '')
  
      return {
        url: '/' + folder,
        title: mod.metadata?.title ?? folder,
        order: mod.metadata?.order ?? 0,
        folder
      }
    }).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  
    // Unterseiten (+page.svx in Unterordnern)
    const children = {}
    for (const [path, mod] of Object.entries(
      import.meta.glob('/src/routes/*/*/+page.{svelte,svx,md}', { eager: true })
    )) {
      const parts = path.replace('/src/routes/', '').split('/')
      const folder = parts[0]
      const child = parts[1].replace('+page.svelte', '').replace('+page.svx', '').replace('+page.md', '')
  
      if (!children[folder]) children[folder] = []
      children[folder].push({
        url: '/' + folder + '/' + child,
        title: mod.metadata?.title ?? child,
        order: mod.metadata?.order ?? 0
      })
      
children[folder].sort((a, b) => a.order - b.order)
    }
  </script>
  
  <nav class="font-mono space-y-2">
    <a href="/" class={`hover:font-bold ${currentPath === "/" ? 'underline' : ''}`}>Artifical Impasto</a>
    {#each roots as root}
      <div class="mt-4">
        <!-- Root -->
        <div class="mb-2">
          <a
            href={root.url}
            class={`hover:font-bold ${currentPath === root.url ? 'underline' : ''}`}
          >
            {root.title}
          </a>
        </div>
  
        <!-- Unterseiten -->
        {#if currentPath === root.url || currentPath.startsWith(root.url + '/')}
          {#if children[root.folder]}
            <ul>
              {#each children[root.folder] as child, idx (child.url)}
                {@const isLast = idx === children[root.folder].length - 1}
                <li
                  class={`relative pl-2 -mb-2.5 pb-4 ${
                    !isLast ? 'border-l border-zinc-900 dark:border-zinc-100' : ''
                  }`}
                >
                  <span class="absolute top-2.5 left-0 h-px w-2 bg-zinc-900 dark:bg-zinc-100" />
  
                  <a
                    href={child.url}
                    class={`hover:font-bold ml-1 ${currentPath === child.url ? 'underline' : ''}`}
                  >
                    {child.title}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        {/if}
      </div>
    {/each}
  </nav>
  