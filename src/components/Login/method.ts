import { ref } from "vue";
import type {LoginInfo} from "@/components/Login/types.ts";
import request from "@/utils/request.ts";
import { message } from 'ant-design-vue';

import {useUserInfo} from "@/store";


export const useLogin = (props: any, emits: any) => {
  const  { init } = useUserInfo();

  //登录信息
  const formState = ref<LoginInfo>({
    username: 'admin',
    password: '1999825wmq',
    // code:'',
  })
  //确认登录
  const onFinish = (value:LoginInfo) => {
    const params = {
      mod: 'logging',
      action: 'login',
      loginsubmit: 'yes',
      infloat: 'yes',
      lssubmit: 'yes',
      inajax: 1,
    }
    const data = {
      ...value,
      fastloginfield: 'username',
      // formhash: 'ba93a787',
      quickforward: 'yes',
      handlekey: 'ls',
    }
    request({
      method:"post",
      url:"/member.php",
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params,
      data,
    }).then((res:any) => {
      const xmlString = res?.data ?? "";
      // 创建DOMParser对象
      const parser = new DOMParser();
      // 解析XML字符串
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      // 获取根元素
      const rootElement = xmlDoc.getElementsByTagName("root")[0];
      // 获取CDTA内容
      const cdata = rootElement.childNodes[0];
      // 提取CDTA内容
      const cdataContent = cdata.nodeValue ?? "";
      if(!cdataContent.includes("errorhandle_ls")){
        //登录成功
        message.success("登录成功");
        //初始化数据
        init();
        //关闭对话框
        closeModal();
      }else{
        //登录失败
        message.error(cdataContent);
      }
    })
  }

  //关闭弹窗
  const closeModal = () => {
    emits('close', false)
  }
  return {
    closeModal,
    onFinish,
    formState,
  }
}
