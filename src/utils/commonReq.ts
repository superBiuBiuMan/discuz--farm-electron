//普遍要用到的操作
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getReqInfo} from "@/utils/reqDataParam.ts";
import {userInfoStore} from "@/store";

/**
 * 收获作物
 * @param place 土地编号,如果需要批量,逗号分割,eg:0,1,2,3
 */
export const harvestAllCrop = (place:string) => {
  return new Promise(async (resolve, reject) => {
    const data1 = getReqInfo(["uIdx", "farmTime", "farmKey"]);
    const data = {
      ...data1,
      tName: userInfoStore.userInfo.name,
      ownerId: userInfoStore.userInfo.uId,
      fName: userInfoStore.userInfo.name,
      place,//收获的土地0~23
    }
    const result = await request({ url:Url.harvest.farmHarvestAll, method:"post", data,headers:{ "Content-Type":"application/x-www-form-urlencoded"} });
    const direction = result?.data?.direction;
    direction ? reject() : resolve(result?.data?.status?.cropStatus);
  })
}

/**
 * 播种
 * @param place 土地编号
 * @param cId 播种作物id
 */
export const plantCrop = (place:string,cId:string) => {
    const data1 = getReqInfo(["uIdx", "farmTime", "farmKey"]);
    const data = {
      ...data1,
      ...data1,
      tName: userInfoStore.userInfo.name,
      ownerId: userInfoStore.userInfo.uId,
      fName: userInfoStore.userInfo.name,
      place,
      cId,
    }
    return request({ url:Url.harvest.farmPlant, method:"post", data,headers:{ "Content-Type":"application/x-www-form-urlencoded"} });
}

/**
 * 铲除土地(强铲和枯萎铲除)
 * @param place 土地编号
 */
export const witherDigCrop = (place:string) => {
  return new Promise(async (resolve, reject) => {
    const data1 = getReqInfo(["uIdx", "farmTime", "farmKey"]);
    const data = {
      ...data1,
      tName: userInfoStore.userInfo.name,
      ownerId: userInfoStore.userInfo.uId,
      place,//铲除的土地0~23
      fName: userInfoStore.userInfo.name,
      // cropStatus:0 作物状态,貌似不传也可以
    }
    const result = await request({ url:Url.harvest.farmWitherDig, method:"post", data,headers:{ "Content-Type":"application/x-www-form-urlencoded"} });
    const direction = result?.data?.direction;
    direction ? reject() : resolve("");
  })
}
