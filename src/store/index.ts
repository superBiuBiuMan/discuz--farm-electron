import { createPinia } from "pinia";
import UserInfoStore from "./modules/user.ts";
import SettingStore from "./modules/setting.ts";
const piniaStore = createPinia();

export const userInfoStore = UserInfoStore(piniaStore);
export const settingStore = SettingStore(piniaStore);

export default piniaStore;



