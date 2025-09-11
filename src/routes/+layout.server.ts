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

  const segments = route.id.split('/').filter(Boolean)
  const isHome = route.id === '/'
  const isSectionIndex = segments.length === 1   // z. B. '/intro', '/method', ...

  let childrenPages: any[] = []

  if (isHome) {
    // Startseite: nur erste Ebene auflisten
    childrenPages = pages.filter((p) => p.name === 'index' && p.url !== '/')
  } else if (isSectionIndex) {
    const folder = segments[0]
    // Nur auf der Ordner-Indexseite die Unterseiten listen
    childrenPages = pages.filter((p) => p.folder === folder && p.name !== 'index')
  } else {
    // Unterseiten wie '/intro/gen-ai' bekommen KEINE childrenPages
    childrenPages = []
  }

  return {
    title: 'Artificial Impasto',
    description: '',
    childrenPages
  }
}