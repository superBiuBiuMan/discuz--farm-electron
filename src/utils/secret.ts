// @ts-ignore
import { MD5 } from "crypto-js"
/**
 * 获取farmKey
 */
export function getFarmKey ():string {
  const _loc1_:string = "OPdfqwn^&*w(281flebnd1##roplaq";
  const _loc2_:string = Date.now() + "";
  const _loc3_:number = parseInt(_loc2_.substr(_loc2_.length - 1),10);
  const _loc4_:string = _loc1_.substr(_loc3_);
  return MD5(_loc2_ + _loc4_).toString();
}

/**
 * 获取farmTime
 */
export function getFarmTime():number{
  return Math.floor(Date.now() / 1000)
}


/**
 * 秒转换为时分秒格式
 */
/**
 * 将秒数转换为时分秒格式字符串
 * @param {number} seconds - 要转换的秒数
 * @returns {string} - 转换后的时分秒格式字符串
 */
export function formatSeconds(seconds: number): string {
  // 计算小时、分钟和剩余秒数
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);
  const remainingSeconds: number = seconds % 60;

  // 将时间格式化为字符串，并确保时、分、秒都以两位数字显示
  const formattedHours: string = String(hours).padStart(2, '0');
  const formattedMinutes: string = String(minutes).padStart(2, '0');
  const formattedSeconds: string = String(remainingSeconds).padStart(2, '0');

  // 返回格式化后的时分秒字符串
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
