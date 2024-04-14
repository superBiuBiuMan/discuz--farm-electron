import { defineStore } from 'pinia'
import { ref } from "vue";
import {CropInfo, FishInfo, FriendListInfo, UserInfo} from "@/store/types/User.ts";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getFarmTime, getFarmKey} from "@/utils/secret.ts";

export const computedTime = (time:number,cropInfo:any,serverTime:number) => {
  return  cropInfo.growthCycle + time - serverTime;
}

export const useUserInfo = defineStore('userInfo',() => {
  //服务器时间
  const serverTime = ref<number>(0);
  //农场作物信息
  const cropInfo = ref<CropInfo[]>([]);
  //渔场信息
  const fishInfo = ref<FishInfo[]>([]);
  //用户信息
  const userInfo = ref<Partial<UserInfo>>({});
  //好友列表
  const friendListInfo = ref<Partial<FriendListInfo>[]>([]);

  //获取农场信息
  const getCropInfo = async () => {
    const data = {
      uIdx: '',
      farmKey: getFarmKey(),
      uinY:'',
      farmTime: 0
    }
    //获取农场基本信息
    let result:any = await request({ url:Url.user.baseInfo, method:"post", data});
    result = result?.data ?? {};
    //设置服务器时间
    serverTime.value = result?.serverTime?.time ?? 0;
    //设置用户信息
    setUserInfo(result);
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
    cropInfo.value = farmlandStatusOrigin.map((item,index) => {
        const currentInfo = cropListObj[item.a] ?? {};//当前作物信息
        const harvestTime = computedTime(item.q,currentInfo,result?.serverTime?.time);
        return {
          index:index+1,
          id:currentInfo.id,
          name:currentInfo.cName ?? "-",
          level:currentInfo.cLevel ?? "-",
          r:item.r,
          q:item.q,
          season:item.j+1,
          harvestTime,
          isMaturation:item.r && item.q  && harvestTime < 0,
        }
    }) ?? [];
  }

  //获取渔场信息
  const getFishInfo = async () => {
    const data = {
      uIdx: 1,
      farmTime: getFarmTime(),
      farmKey: getFarmKey(),
      ownerId: 1,
    }
    //获取农场基本信息
    let result:any = await request({ url:Url.user.fishInfo, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    result = result?.data ?? {};
    const {  fish,open } = result;
    if(open === 0){
      //todo 用户未开通鱼塘
    }else{
      let fishList = await window.ipcRenderer.invoke("getFishInfoList",{ list: fish.map((item:any) => item.fid)})
      .then((res:any) => {
        const temp:any = {};
        res.forEach((item:any) => {
          temp[item.id] = item;
        })
        return temp;
      })
      .catch(() => []);
      fishInfo.value = fish.map((item:any,index:number) => {
        const currentInfo = fishList[item.fid] ?? {};//当前作物信息
        return {
          index:index+1,
          id:currentInfo.id,
          name:currentInfo.crop_name ?? "-",
        }
      }) ?? [];
    }
  }

  //应用用户数据
  const setUserInfo = (userInfoOrigin:any) => {
    const { exp,user } = userInfoOrigin || {};
    const info = {
      id:user.uId,
      name:user?.userName ?? "-",//昵称
      avatar:user?.headPic ?? "",//头像
      // level:string | number,//等级
      money:user?.money ?? "",//金钱
      // points:string | number,//积分
      yuanba:user?.FB ?? "",//元宝
      // dog:string | number,//狗狗
      // exp:string | number,//经验
      yellowLevel:user?.yellowLevel,//黄钻等级
    }
    userInfo.value = info;

  }

  //获取用户好友
  const getFriendList = async () => {
    const data = {
      uIdx: 1,
      farmTime: getFarmTime(),
      farmKey: getFarmKey(),
    }
    //获取好友列表
    let result:any = await request({ url:Url.user.friendList, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    friendListInfo.value = result?.data ?? [];
  }
  //初始化数据登录后
  const init = async () => {
    await getCropInfo();
    await getFishInfo();
    await getFriendList();
  }
  return {
    serverTime,
    cropInfo,
    fishInfo,
    userInfo,
    friendListInfo,
    init,
  }
})
