import { createDecorator } from 'vue-class-component'

export function Debounce(time: number): PropertyDecorator {
  return createDecorator(() => {})
}
