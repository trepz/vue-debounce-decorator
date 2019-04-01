import 'jsdom-global/register'
import Vue from 'vue'
import Component from 'vue-class-component'
import flushPromises from 'flush-promises'
import { mount } from '@vue/test-utils'
import { Debounce } from '../../src/vue-debounce-decorator'

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
    bounced() {}
  }
  return Comp
}

test('basic debouncing', () => {})
