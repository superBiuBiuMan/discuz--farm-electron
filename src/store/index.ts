import { createPinia } from "pinia";
import UserInfoStore from "./modules/user";
import SettingStore from "./modules/setting";
const piniaStore = createPinia();

export const userInfoStore = UserInfoStore(piniaStore);
export const settingStore = SettingStore(piniaStore);

export default piniaStore;



