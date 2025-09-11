export const load: LayoutServerLoad = async ({ route }) => {
    const modules = import.meta.glob('/src/routes/**/+page.{svelte,svx,md}', { eager: true })
  
    const pages = Object.entries(modules).map(([path, mod]: any) => {
      const url = path
        .replace(/^\/src\/routes/, '')
        .replace(/\/\+page\.(svelte|svx|md)$/, '')
  
      const parts = url.split('/').filter(Boolean)
  
      return {
        url: url || '/',
        folder: parts[0] ?? null,
        name: parts.length > 1 ? parts.at(-1) : 'index',
        title: mod.metadata?.title ?? parts.at(-1) ?? 'index',
        description: mod.metadata?.description,
        thumbnail: mod.metadata?.thumbnail
      }
    })
  
    let childrenPages = []
  
    if (route.id === '/') {
      // Startseite → nur erste Ebene
      childrenPages = pages.filter((p) => p.name === 'index' && p.url !== '/')
    } else {
      // z. B. route.id = "/intro/+page" → folder = "intro"
      const folder = route.id.split('/')[1]
      childrenPages = pages.filter(
        (p) => p.folder === folder && p.name !== 'index'
      )
    }
  
    return {
      title: 'Artificial Impasto',
      description: '',
      childrenPages
    }
  }
  