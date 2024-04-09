import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

//pinia
import Pinia from "./store/index";

const app = createApp(App);

app.use(Antd);//应用antd
app.use(Pinia);//应用pinia

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
