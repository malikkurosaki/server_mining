import store from "store2"

type keyStore = "keyWord" | "trainai_list_store" | "trainai_suggest"

export function useStore(key: keyStore) {
  return {
      get() {
          return store(key)
      },
      set(val: any) {
          store(key, val)
      },
      has() {
          return store.has(key)
      },
      isEmpty() {
          return store(key) != undefined && store(key).length === 0
      }
  }
}