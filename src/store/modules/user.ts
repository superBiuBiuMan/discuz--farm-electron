import { defineStore } from 'pinia'
import { ref } from "vue";
import {CropInfo, FishInfo, UserInfo} from "@/store/types/User.ts";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getKey} from "@/utils/secret.ts";

export const useUserInfo = defineStore('userInfo',() => {
  //农场作物信息
  const cropInfo = ref<CropInfo[]>([]);
  //渔场信息
  const fishInfo = ref<FishInfo[]>([]);
  //用户信息
  const userInfo = ref<Partial<UserInfo>>({

  })
  //初始化数据登录后
  const init = async () => {
    const params = {
      mod:'user',
      act:'run'
    }
    const data = {
      uIdx: '',
      farmKey: getKey(),
      uinY:'',
      farmTime: 0
    }
    let result = await request({ url:Url.user.baseInfo, method:"post", params,data});
    result = result?.data ?? {};
  }
  return {
    cropInfo,
    fishInfo,
    userInfo,
    init,
  }
})
