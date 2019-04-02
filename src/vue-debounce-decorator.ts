import { createDecorator } from 'vue-class-component'

export function Debounce(time: number): PropertyDecorator {
  return createDecorator((opts, handler) => {
    if (!opts.methods) throw new Error('This decorator must be used on a vue instance.')
    opts.methods[handler] = debounce(opts.methods[handler], time, this)
  })
}

export function debounce(fun: any, time: number, thisArg: any) {
  let timeoutId: number | undefined

  const wrapper = Object.assign(
    (...args: any[]) => {
      wrapper.clear()

      timeoutId = setTimeout(() => {
        timeoutId = undefined
        fun.apply(thisArg, args)
      }, time)
    },
    {
      clear() {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = undefined
        }
      },
    },
  )
  return wrapper
}
