import { createPinia } from "pinia";
export * from "./modules/user.ts";
export * from "./modules/setting.ts";
const piniaStore = createPinia();
export default piniaStore;
