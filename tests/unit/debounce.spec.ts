import 'jsdom-global/register'
import Vue from 'vue'
import Component from 'vue-class-component'
import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { Debounce } from '../../src/vue-debounce-decorator'

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

test('properties can be updated from inside debounced wrapper (correct bindings for "this")', async done => {
  const wrapper = mount(factory())
  wrapper.vm.bounce('new value')
  jest.runAllTimers()
  expect(spy).toHaveBeenCalledTimes(1)
  await flushPromises()
  expect(wrapper.vm.someValue).toBe('new value')
  done()
})
