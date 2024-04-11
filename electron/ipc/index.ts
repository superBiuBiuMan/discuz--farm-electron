import { ipcMain } from "electron";
import Connect from "../db/index.ts"


ipcMain.handle("getInfo",() => {
  return Connect('cropList')
  .select()
  .where('id','=', '1')
})
