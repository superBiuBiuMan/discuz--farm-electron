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

  });
  //获取农场信息渔场
  const getCropInfo = async () => {
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
    //获取农场基本信息
    let result:any = await request({ url:Url.user.baseInfo, method:"post", params,data});
    result = result?.data ?? {};
    const farmlandStatusOrigin:any[]= result?.farmlandStatus ?? [];//土地作物信息
    let cropListObj = await window.ipcRenderer.invoke("getCorpInfoList",{ list: farmlandStatusOrigin.map(item => item.a)})
                      .then((res:any) => {
                        const temp:any = {};
                        res.forEach((item:any) => {
                          temp[item.id] = item;
                        })
                        return temp;
                      })
                      .catch(() => []);
    console.log(cropListObj,farmlandStatusOrigin)
    cropInfo.value = farmlandStatusOrigin.map((item,index) => {
        const currentInfo = cropListObj[item.a] ?? {};//当前作物信息
        return {
          index:index+1,
          id:currentInfo.id,
          name:currentInfo.cName ?? "-",
          level:currentInfo.cLevel ?? "-",
        }
    }) ?? [];
  }
  //初始化数据登录后
  const init = async () => {
    getCropInfo();
  }
  return {
    cropInfo,
    fishInfo,
    userInfo,
    init,
  }
})
