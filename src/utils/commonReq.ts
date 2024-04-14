//普遍要用到的操作
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getReqInfo} from "@/utils/reqDataParam.ts";
import {userInfoStore} from "@/store";
//收获所有作物
export const harvestAllCrop = (land:string) => {
  const data1 = getReqInfo(["uIdx", "farmTime", "farmKey"]);
  const data = {
    ...data1,
    tName: userInfoStore.userInfo.name,
    ownerId: userInfoStore.userInfo.uId,
    place: land,//收获的土地0~23
    fName: userInfoStore.userInfo.name,
  }
  request({ url:Url.harvest.farmHarvestAll, method:"post", data,headers:{ "Content-Type":"application/x-www-form-urlencoded"} })
}
