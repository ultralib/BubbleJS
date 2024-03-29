import { Refs } from "../types/ComponentType.type"

export default function WatchRef<T>(watcher: (newVal: T, oldVal: T) => void) {
  return function (target: any, propertyKey: string) {
    target[Refs] = target[Refs] ?? {}
    target[Refs][propertyKey] = {
      set(key: string, newVal: T, oldVal: T) {
        watcher(newVal, oldVal)
        return newVal
      }
    }
  }
}

/* TS5 Implementation:
export default function WatchRef<T>(watcher?: (oldVal: T, newVal: T) => void) {
  return function <T extends any>(value: T, ctx: ClassFieldDecoratorContext) {
    console.log('watchref', value, ctx);
    ctx.addInitializer(function (this: any) {
      this[Refs] = this[Refs] ?? {}
      this[Refs][ctx.name] = watcher ?? null
    })
  }
}
*/