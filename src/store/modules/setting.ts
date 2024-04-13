import { defineStore } from 'pinia'
import {reactive, ref} from "vue";
import {SeedPlantMode} from "@/store/types/Setting.ts";


export const useSetting = defineStore('setting',() => {
  const setting = reactive({
    seedPlantMode:SeedPlantMode.LEVEL,//播种模式
  });

  const setSetting = () => {

  }
  return {
    setting,
    setSetting,
  }
})
