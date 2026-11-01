// Safe wrappers: storage can throw in private mode or when blocked.
export function readJSON(key, store = 'local') {
  try {
    const s = store === 'session' ? window.sessionStorage : window.localStorage
    const raw = s.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeJSON(key, value, store = 'local') {
  try {
    const s = store === 'session' ? window.sessionStorage : window.localStorage
    s.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
}
