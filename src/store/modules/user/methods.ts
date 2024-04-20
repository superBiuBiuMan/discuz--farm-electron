import {getReqInfo} from "@/utils/reqDataParam.ts";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getFarmKey, getFarmTime} from "@/utils/secret.ts";
import {FishInfo, FriendListInfo, UserFarmBagInfo} from "@/store/modules/user/types.ts";
import {harvestAllCrop, plantCrop, witherDigCrop} from "@/utils/commonReq.ts";
export type NumString = string | number;
export enum CropStatusEnum {
  Withered=7,//已枯萎
}
export const computedTime = (time:number,cropInfo:any,serverTime:number) => {
  return  cropInfo.growthCycle + time - serverTime;
}
//获取背包信息
export const getUserFarmBagInfo = async ():Promise<UserFarmBagInfo> => {
  const data = getReqInfo(["uIdx","farmTime","farmKey"]);
  let result:any = await request({ url:Url.bag.getFarmBag, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
  result = result?.data ?? [];
  return {
    cropList:result?.filter((item:any) => item.type === 1) ?? [],//种子
    fishList:result?.filter((item:any) => item.type === 23) ?? [],//鱼苗
    goodsList:result?.filter((item:any) => item.type === 10) ?? [],//道具
  }
}

//获取渔场信息
export const getFarmFishInfo = async (uId:NumString):Promise<FishInfo[]> => {
  const data = {
    uIdx:uId,
    farmTime: getFarmTime(),
    farmKey: getFarmKey(),
    ownerId: uId,
  }
  //获取农场基本信息
  let result:any = await request({ url:Url.user.fishInfo, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
  result = result?.data ?? {};
  let {  fish,open } = result;
  //判断是否是数组
  if(!Array.isArray(fish)){
    fish = Object.values(fish);
  }
  if(open === 0){
    //todo 用户未开通鱼塘
    return [];
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
    const endResult =  fish.map((item:any,index:number) => {
      const currentInfo = fishList[item.fid] ?? {};//当前作物信息
      return {
        index:index,
        id:currentInfo.id,
        name:currentInfo.crop_name ?? "-",
      }
    }) ?? [];
    return endResult;
  }
}

//获取用户好友
export const getFriendList = async (uId:NumString):Promise<FriendListInfo[]> => {
  const data = {
    uIdx: uId,
    farmTime: getFarmTime(),
    farmKey: getFarmKey(),
  }
  //获取好友列表
  let result:any = await request({ url:Url.user.friendList, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
  return result?.data ?? [];
}

