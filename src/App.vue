<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// import { useTest } from './store'
// const abc = useTest();
// console.log(abc.token,'初始值');
// abc.changeToken();
// setTimeout(() => {
//   console.log(abc.token,'改变后')
// },3000);
</script>

<template>
  <div>
    <a href="https://electron-vite.github.io" target="_blank">
      <img src="/electron-vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
