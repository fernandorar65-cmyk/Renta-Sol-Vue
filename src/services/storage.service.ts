/**
 * Servicio de almacenamiento que abstrae localStorage
 * Permite fácil testing y migración a otros sistemas de storage
 */
class StorageService {
  private storage: Storage

  constructor() {
    // Verificar si estamos en un entorno que soporta localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      this.storage = window.localStorage
    } else {
      // Fallback para SSR o entornos sin localStorage
      this.storage = this.createMemoryStorage()
    }
  }

  private createMemoryStorage(): Storage {
    const store = new Map<string, string>()
    return {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      get length() {
        return store.size
      },
      key: (index: number) => Array.from(store.keys())[index] ?? null,
    } as Storage
  }

  getItem(key: string): string | null {
    try {
      return this.storage.getItem(key)
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error)
      return null
    }
  }

  setItem(key: string, value: string): void {
    try {
      this.storage.setItem(key, value)
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error)
    }
  }

  removeItem(key: string): void {
    try {
      this.storage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error)
    }
  }

  clear(): void {
    try {
      this.storage.clear()
    } catch (error) {
      console.error('Error clearing storage', error)
    }
  }
}

export const storageService = new StorageService()

