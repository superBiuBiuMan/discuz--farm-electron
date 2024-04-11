import { ipcMain } from "electron";
import {generateCropInfoDB} from "../utils/generate.ts";


ipcMain.handle("generateCropInfoDB", async () => {
  return generateCropInfoDB();
})
