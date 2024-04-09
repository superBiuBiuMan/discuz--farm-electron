import { defineStore } from 'pinia'
import { ref } from "vue";

export const useTest =  defineStore('test',() => {
  const token = ref<string>("我是token");
  const changeToken = () => {
    token.value = "新toekn" + Math.random();
  }
  return {
    token,
    changeToken,
  }
})


