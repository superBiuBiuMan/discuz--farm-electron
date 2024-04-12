import { ipcMain } from "electron";
import Connect from "../db/index.ts"
export type UniNumber = number | string;
export interface GetCorpInfoListArgs {
  list:UniNumber[],
}

//种子列表返回种子数据
ipcMain.handle("getCorpInfoList",(_, { list }:GetCorpInfoListArgs) => {
  if(!list || !list.length) return [];
  return Connect('cropList')
  .select().whereIn('id',list);
})
