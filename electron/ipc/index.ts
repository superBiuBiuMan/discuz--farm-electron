import { ipcMain } from "electron";
import Connect from "../db/index.ts"
export type UniNumber = number | string;
export interface GetInfoListArgs {
  list:UniNumber[],
}

//种子列表返回种子数据
ipcMain.handle("getCorpInfoList",(_, { list }:GetInfoListArgs) => {
  if(!list || !list.length) return [];
  return Connect('cropList')
  .select().whereIn('id',list);
})

//鱼列表返回鱼的数据
ipcMain.handle("getFishInfoList",(_,{ list }:GetInfoListArgs) => {
  if(!list || !list.length) return [];
  return Connect("fishList")
  .select().whereIn('id',list);
})
