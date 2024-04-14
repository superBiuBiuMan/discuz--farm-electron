import {userInfoStore} from "@/store";
import { message } from 'ant-design-vue';


export const useBasicInfo = () => {

  //刷新
  const refresh = () => {
    message.info("刷新中...")
    //重新获取个人信息
    userInfoStore.init().finally(() => {
      message.success("刷新成功")
    });
  }


  return {
    refresh,
  }
}
