import {userInfoStore} from "@/store";
import {getFarmKey , getFarmTime } from "@/utils/secret.ts";

export type DataParam = "farmKey" | "farmTime" | "uIdx" | "ownerId";
export type GetReqInfoReturn =  {
  [key in DataParam]: string | number;
}
//获取请求信息
export function getReqInfo(list:DataParam[]):GetReqInfoReturn{
  const data:any = {};
  list.forEach(item => {
    if(item === "uIdx"){
      data[item] = userInfoStore.userInfo.uId;
    }
    if(item === "farmTime"){
      data[item] = getFarmTime();
    }
    if (item === "farmKey") {
      data[item] = getFarmKey();
    }
    if(item === "ownerId"){
      data[item] = userInfoStore.userInfo.uId;
    }
  })
  return data;
}

