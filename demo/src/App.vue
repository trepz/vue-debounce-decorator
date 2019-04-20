<template>
  <div id="app">
    <div class="button" @click="increment">Clicked {{ timesClicked }} times!</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Debounce } from '../../src/vue-debounce-decorator'

@Component
export default class App extends Vue {
  timesClicked = 0

  @Debounce(500)
  increment() {
    this.timesClicked++
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.button {
  background: orange;
  max-width: 400px;
  border-radius: 4px;
  padding: 10px;
  color: white;
  margin: 30px auto;
  cursor: pointer;
  user-select: none;
  font-size: 30px;
}
</style>
