import { createPinia } from "pinia";
export * from "./modules/user.ts"

const piniaStore = createPinia();
export default piniaStore;
