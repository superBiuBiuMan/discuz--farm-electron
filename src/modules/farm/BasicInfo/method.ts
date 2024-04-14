import {useUserInfo} from "@/store";
import { message } from 'ant-design-vue';


export const useBasicInfo = () => {

  //刷新
  const refresh = () => {
    const userStore = useUserInfo();
    message.info("刷新中...")
    //重新获取个人信息
    userStore.init().finally(() => {
      message.success("刷新成功")
    });
  }


  return {
    refresh,
  }
}
