import {getReqInfo} from "@/utils/reqDataParam.ts";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getFarmKey, getFarmTime} from "@/utils/secret.ts";
import {FishInfo, FriendListInfo, UserFarmBagInfo,UserFarmShoppingInfo} from "../user/types.ts";
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

//获取农场用户好友
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


//获取农场商店
export const getFarmShopping = async ():Promise<UserFarmShoppingInfo> => {
  const data = getReqInfo(["uIdx","farmTime","farmKey"]);
  let result:any = await request({ url:Url.shopping.getFarmStore, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});

  const organicList:any[] = []//有机种子
  const normalList:any[] = [];//普通种子
  const redList:any[] = [];//红土地种子
  const blackList:any[] = [];//黑土地种子
  const vipList:any[] = [];//vip种子

  result?.data?.forEach(item => {
    if(item.isRed === 1){
      //红土地种子
      redList.push(item);
    }
    else if(item.isYouji === 1){
      //有机种子
      organicList.push(item);
    }
    else if(item.isRed === 2){
      //黑土地
      blackList.push(item);
    }else if(item.isVip === 1 || item.isvip === 1){
      //vip种子
      vipList.push(item);
    }else{
      //普通种子
      normalList.push(item);
    }
  })
  return {
    organicList,
    normalList,
    redList,
    blackList,
    vipList
  }
}
