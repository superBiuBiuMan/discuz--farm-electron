import { createPinia } from "pinia";
export * from "./modules/test.ts";
export * from "./modules/user.ts"

const pinia = createPinia();
export default pinia;
