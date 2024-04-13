import { ref } from "vue";

//@ts-ignore
export const useFarmSetting = (props:any,emit:any) => {
  //关闭对话框
  const closeModal = () => {
    emit('close', false);
  }
  const formState = ref({
    seedPlantMode: 0,//等级播种
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
