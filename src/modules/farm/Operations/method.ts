import { ref } from "vue";

export  const useOperation = () => {
  // 登录是否可见
  const loginVisible = ref<boolean>(false);
  //背包是否可见
  const bagVisible = ref<boolean>(false);
  //仓库是否可见
  const storeVisible = ref<boolean>(false);
  //设置是否可见
  const settingVisible = ref<boolean>(false);


  // 设置登录可见
  const setLoginVisible = (visible: boolean) => {
    loginVisible.value = visible;
  }

  //打开背包
  const setBagVisible = (visible:boolean) => {
    bagVisible.value = visible;
  }
  // 设置仓库可见
  const setStoreVisible = (visible: boolean) => {
    storeVisible.value = visible;
  }
  // 设置设置是否可见
  const setSettingVisible = (visible: boolean) => {
    settingVisible.value = visible;
  }
  return {
    loginVisible,
    storeVisible,
    bagVisible,
    settingVisible,
    setLoginVisible,
    setSettingVisible,
    setBagVisible,
    setStoreVisible,
  }
}
