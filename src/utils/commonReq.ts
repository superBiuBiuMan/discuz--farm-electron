//普遍要用到的操作
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getFarmTime} from "@/utils/secret.ts";
//收获所有作物
export const harvestAllCrop = () => {
  const data = {
    tName: 'admin',
    ownerId: 1,
    farmTime: getFarmTime(),
    place: 0,
    farmKey: '6348b1d283a9618dda9feaf01059aa5c',
    fName: 'admin',
    uIdx: 1,
  }
  request({ url:Url.harvest.farmHarvestAll, method:"post", data,headers:{ "Content-Type":"application/x-www-form-urlencoded"} })
}
