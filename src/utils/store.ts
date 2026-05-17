const K = 'pt_'

interface Draft {
  [key: string]: string
}

interface Submission extends Draft {
  ts: string
}

export const store = {
  get: <T>(k: string, fb: T): T => {
    try {
      const r = localStorage.getItem(K + k)
      return r ? (JSON.parse(r) as T) : fb
    } catch (e) {
      console.log(e)
      return fb
    }
  },
  set: (k: string, v: unknown): void => {
    try {
      localStorage.setItem(K + k, JSON.stringify(v))
    } catch (e) {
      console.log(e)
    }
  },
  rm: (k: string): void => {
    try {
      localStorage.removeItem(K + k)
    } catch (e) {
      console.log(e)
    }
  },
  visits(): number {
    const n = (store.get<number>('visits', 0) + 1)
    store.set('visits', n)
    store.set('last', new Date().toISOString())
    return n
  },
  draft: {
    save: (d: Draft) => store.set('draft', d),
    get: () => store.get<Draft>('draft', {}),
    clear: () => store.rm('draft'),
  },
  submit(d: Draft) {
    const l = store.get<Submission[]>('subs', [])
    l.push({ ...d, ts: new Date().toISOString() })
    store.set('subs', l)
  },
}