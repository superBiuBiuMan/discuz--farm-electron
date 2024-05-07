import { defineStore } from 'pinia'
import {reactive} from "vue";
import {SeedPlantMode} from "@/store/modules/setting/types.ts";


export default defineStore('setting',() => {
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