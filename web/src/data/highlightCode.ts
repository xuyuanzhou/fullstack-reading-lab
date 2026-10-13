import type { HLJSApi, Language } from 'highlight.js'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import css from 'highlight.js/lib/languages/css'
import dart from 'highlight.js/lib/languages/dart'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import http from 'highlight.js/lib/languages/http'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import lua from 'highlight.js/lib/languages/lua'
import nginx from 'highlight.js/lib/languages/nginx'
import properties from 'highlight.js/lib/languages/properties'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('java', java)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('http', http)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('dart', dart)
hljs.registerLanguage('dockerfile', dockerfile)
hljs.registerLanguage('lua', lua)
hljs.registerLanguage('c', c)
hljs.registerLanguage('properties', properties)
hljs.registerLanguage('vue', vue)
hljs.registerLanguage('redis', redis)

const ALIASES: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  html: 'xml',
  yml: 'yaml',
  sh: 'bash',
  shell: 'bash',
  docker: 'dockerfile',
  astro: 'xml',
  svelte: 'xml',
}

const PLAIN = new Set(['', 'text', 'txt', 'plain', 'plaintext'])

function vue(_api: HLJSApi): Language {
  return {
    name: 'Vue',
    contains: [
      { className: 'tag', begin: /<\/?(?:script|style|template)\b[^>]*>/ },
      { begin: /(?<=<script\b[^>]*>)/, end: /(?=<\/script>)/, subLanguage: 'javascript' },
      { begin: /(?<=<style\b[^>]*>)/, end: /(?=<\/style>)/, subLanguage: 'css' },
      { begin: /(?<=<template\b[^>]*>)/, end: /(?=<\/template>)/, subLanguage: 'xml' },
    ],
  }
}

function redis(api: HLJSApi): Language {
  return {
    name: 'Redis',
    case_insensitive: true,
    keywords: 'APPEND GET SET DEL INCR DECR EXPIRE TTL EXISTS HGET HSET HDEL LPUSH RPUSH SADD SREM ZADD PUBLISH EVAL SCAN TYPE PING AUTH SELECT NX EX PX XX KEEPTTL GETDEL SETNX',
    contains: [api.HASH_COMMENT_MODE, api.QUOTE_STRING_MODE, api.NUMBER_MODE],
  }
}

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Color a fenced lesson snippet. Diagrams and unknown labels stay plain text. */
export function highlightLessonCode(lang: string, source: string) {
  const key = lang.trim().toLowerCase()
  if (PLAIN.has(key)) return escapeHtml(source)
  const name = ALIASES[key] || key
  if (!hljs.getLanguage(name)) return escapeHtml(source)
  return hljs.highlight(source, { language: name, ignoreIllegals: true }).value
}
