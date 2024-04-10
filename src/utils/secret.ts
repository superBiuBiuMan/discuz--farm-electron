// @ts-ignore
import { MD5 } from "crypto-js"
/**
 * 获取farmKey
 */
export const getKey = ():string => {
  const _loc1_:string = "OPdfqwn^&*w(281flebnd1##roplaq";
  const _loc2_:string = Date.now() + "";
  const _loc3_:number = parseInt(_loc2_.substr(_loc2_.length - 1),10);
  const _loc4_:string = _loc1_.substr(_loc3_);
  return MD5(_loc2_ + _loc4_).toString();
}
