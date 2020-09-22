/** A cache takes in some identifying/original data item and returns something of type T */
export interface ICache<I, T> {
  get(item: I): Promise<CacheItem<T>>
  delete(item: I): void
  clear(): void
  set(item: I): Promise<CacheItem<T>>
}

export interface ICacheManager<I, T> {
  id(item: I): string
  generate(item: I): T | Promise<T>
}

// class ErrorCacheManager<I, T> implements ICacheManager<I, T> {
//   id(_item: I): string {
//     throw new Error("Method not implemented.")
//   }
//   generate(_item: I): T {
//     throw new Error("Method not implemented.")
//   }
// }

export type CacheItem<T> = {
  error: Error | any
  item: T | null
}

export class Cacher<I, T> implements ICache<I, T> {
  private c: Map<string, CacheItem<T>> = new Map()
  private cm: ICacheManager<I, T> // = new ErrorCacheManager()

  constructor(cm: ICacheManager<I, T>) {
    this.cm = cm
  }
  //   TODO: do we like this error handling?
  async get(item: I): Promise<CacheItem<T>> {
    const id = this.cm.id(item)
    if (this.c.has(id)) {
      return (async () => this.c.get(id)!)()
    } else {
      return this.set(item)
    }
  }
  async set(item: I): Promise<CacheItem<T>> {
    const id = this.cm.id(item)
    try {
      const out = await this.cm.generate(item)
      const fin = { item: out, error: null }
      this.c.set(id, fin)
      return fin
    } catch (error) {
      const fin = { item: null, error }
      this.c.set(id, fin)
      return fin
    }
  }
  delete(item: I): void {
    this.c.delete(this.cm.id(item))
  }
  clear(): void {
    this.c.clear()
  }
}
