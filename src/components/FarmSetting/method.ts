import {onMounted, ref} from "vue";
import {useSetting} from "@/store";
import {SeedPlantMode} from "@/store/types/Setting.ts";
//@ts-ignore
export const useFarmSetting = (props:any,emit:any) => {
  const settingStore = useSetting();
  onMounted(() => {
    formState.value.seedPlantMode = settingStore.setting.seedPlantMode;
  })
  //关闭对话框
  const closeModal = () => {
    emit('close', false);
  }
  const formState = ref({
    seedPlantMode: SeedPlantMode.LEVEL,//等级播种
  });
  const onFinish = (value:any) => {
    console.log(value)
  }
  return {
    closeModal,
    formState,
    onFinish,
  };
};
