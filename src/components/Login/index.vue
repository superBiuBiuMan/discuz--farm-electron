<script setup lang="ts">
import type { Props,Emits} from "./types.ts"
import { useLogin } from "./method.ts";
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const {
  closeModal,
  onFinish,
  formState,
} = useLogin(props,emit);

const handleTest = () => {
  //@ts-ignore
  window.ipcRenderer.getInfo().then(res => {
    console.log(res)
  })

}
</script>

<template>
  <!--@finish="onFinish"-->
  <!--@finishFailed="onFinishFailed"-->
  <!--:model="formState"-->
  <a-modal class="login"
           :open="props.visible"
           @cancel="closeModal"
           title="登录"
           :footer="null"
           :closable="false"
           :maskClosable="false"
           width="400px"
  >
    <div class="login_wrapper">
      <a-form
          name="login"
          :model="formState"
          autocomplete="off"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          @finish="onFinish"
          label-align="right"
      >
        <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username"/>
        </a-form-item>
        <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset: 8 }">
          <a-button type="primary" html-type="submit">登录</a-button>
          <a-button type="primary" @click="handleTest">测试</a-button>
          <a-button style="margin-left: 10px" @click="closeModal">取消</a-button>
        </a-form-item>
        <!--验证码-->
        <!--<a-form-item-->
        <!--    label="Password"-->
        <!--    name="password"-->
        <!--    :rules="[{ required: true, message: '请输入验证码!' }]"-->
        <!--&gt;-->
        <!--  <a-input-password v-model:value="formState.code"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item :wrapper-col="{ offset: 8, span: 16 }">-->
        <!--  <a-button type="primary" html-type="submit">提交</a-button>-->
        <!--</a-form-item>-->
      </a-form>
    </div>


  </a-modal>
</template>

<style scoped lang="sass">
.login
  &_wrapper
    padding-top: 30px
    //padding: 20px
</style>
