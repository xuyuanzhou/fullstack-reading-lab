declare module 'highlight.js/lib/languages/*' {
  import type { LanguageFn } from 'highlight.js'
  const lang: LanguageFn
  export default lang
}
