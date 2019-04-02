import 'jsdom-global/register'
import Vue from 'vue'
import Component from 'vue-class-component'
import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { Debounce, debounce } from '../../src/vue-debounce-decorator'

jest.useFakeTimers()
let spy = jest.fn()

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
    bounce(value: string = '') {
      spy()
      this.someValue = value
    }
  }
  return Comp
}

afterEach(() => spy.mockReset())

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
  for (let i = 0; i < 10; i++) {
    wrapper.vm.bounce()
  }
  jest.runAllTimers()

  expect(spy).toHaveBeenCalledTimes(1)

  wrapper.vm.bounce()
  jest.runAllTimers()
  expect(spy).toHaveBeenCalledTimes(2)
})
