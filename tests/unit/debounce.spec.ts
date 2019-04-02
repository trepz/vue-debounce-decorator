import 'jsdom-global/register'
import Vue from 'vue'
import Component from 'vue-class-component'
import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { Debounce, debounce } from '../../src/vue-debounce-decorator'

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

test('debouncing function outside of vue', () => {
  const mock = jest.fn()
  const debouncedMock = debounce(mock, 500, this)
  for (let i = 0; i < 10; i++) {
    debouncedMock()
  }
  jest.runAllTimers()
  expect(mock).toHaveBeenCalledTimes(1)

  debouncedMock()
  jest.runAllTimers()
  expect(mock).toHaveBeenCalledTimes(2)
})

test('basic debouncing in vue component', () => {
  const wrapper = mount(factory())
  const spy = jest.spyOn(wrapper.vm, 'bounce')
  Array.from(Array(10), _ => wrapper.vm.bounce('new'))

  jest.runAllTimers()

  expect(spy).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.someValue).toBe('new')

  spy.mockRestore()
})
