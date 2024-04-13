import { ref } from "vue";

export  const useOperation = () => {
  // 登录是否可见
  const loginVisible = ref<boolean>(false);
  const bagVisible = ref<boolean>(true);

  // 设置登录可见
  const setLoginVisible = (visible: boolean) => {
    loginVisible.value = visible;
  }

  //打开背包
  const setBagVisible = (visible:boolean) => {
    bagVisible.value = visible;
  }

  return {
    loginVisible,
    bagVisible,
    setLoginVisible,
    setBagVisible,
  }
}
