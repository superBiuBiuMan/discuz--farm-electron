import { ref } from "vue";

export  const useOperation = () => {
  // 登录是否可见
  const loginVisible = ref<boolean>(true);

  // 设置登录可见
  const setLoginVisible = (visible: boolean) => {
    loginVisible.value = visible;
  }


  return {
    loginVisible,
    setLoginVisible,
  }
}
