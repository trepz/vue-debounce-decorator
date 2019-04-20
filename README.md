# vue-debounce-decorator

[![Build Status](https://travis-ci.org/trepz/vue-debounce-decorator.svg?branch=master)](https://travis-ci.org/trepz/vue-debounce-decorator)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Debounce vue class methods using the `@Debounce()` decorator with [vue class components](https://github.com/vuejs/vue-class-component).

```javascript
import Vue from 'vue'
import Component from 'vue-class-component'
import { Debounce } from 'vue-debounce-decorator'

@Component
export default class App extends Vue {
  @Debounce(500)
  debouncedMethod() {
    console.log(`This method is debounced by 500ms`)
  }
}
```

## Installing

```
yarn add -D vue-debounce-decorator
```

or

```
npm i vue-debounce-decorator --save-dev
```
