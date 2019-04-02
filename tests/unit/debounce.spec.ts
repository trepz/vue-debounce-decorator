import 'jsdom-global/register'
import Vue from 'vue'
import Component from 'vue-class-component'
import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { Debounce } from '../../src/vue-debounce-decorator'

jest.useFakeTimers()

// Component factory
const factory = (debounceTime: number = 500, componentOptions?: any) => {
  @Component({
    template: `
      <div>{{ someValue }}</div>
    `,
    ...componentOptions,
  })
  class Comp extends Vue {
    someValue = 'Hello'

    @Debounce(debounceTime)
    bounce(value: string) {
      this.someValue = value
    }
  }
  return Comp
}

test('basic debouncing', () => {
  const wrapper = mount(factory())
  const spy = jest.spyOn(wrapper.vm, 'bounce')
  Array.from(Array(10), _ => wrapper.vm.bounce('new'))

  jest.runAllTimers()

  expect(spy).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.someValue).toBe('new')

  spy.mockRestore()
})
