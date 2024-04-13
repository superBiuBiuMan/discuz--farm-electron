<script setup lang="ts">
import Vegetables from "./component/vegetable/index.vue";
import Fish from "./component/fish/fish.vue";
import {useUserInfo} from "@/store";
import { storeToRefs } from "pinia";
const { userInfo } = storeToRefs(useUserInfo());
</script>

<template>
<div class="info">
  <!--基础信息-->
  <div class="info_name">
    <!--头像和操作-->
    <div class="info_name_right">
      <div class="info_name_right_img">
        <img :src="userInfo.avatar" alt=""/>
      </div>
      <div class="info_name_right_operation">
        <a-space>
          <a-button size="small" type="link">农场</a-button>
          <a-button size="small" type="link">刷新</a-button>
        </a-space>
      </div>
    </div>
    <!--信息-->
    <div class="info_name_left">
      <a-row>
        <a-col :span="8">
          <label>昵称:</label>
          <span>{{  userInfo.name  }}</span>
        </a-col>
        <a-col :span="8">
          <label>等级:</label>
          <span></span>
        </a-col>
        <a-col :span="8">
          <label>金币:</label>
          <span>{{ userInfo.money }}</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <label>积分:</label>
          <span></span>
        </a-col>
        <a-col :span="8">
          <label>元宝:</label>
          <span>{{ userInfo.yuanba }}</span>
        </a-col>
        <a-col :span="8">
          <label>狗粮:</label>
          <span></span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <label>狗狗:</label>
          <span></span>
        </a-col>
      </a-row>
    </div>
  </div>
  <div class="info_detail">
    <a-tabs size="small" style="padding: 0">
      <a-tab-pane key="1" tab="菜地">
        <Vegetables/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="鱼塘" force-render>
        <Fish/>
      </a-tab-pane>
    </a-tabs>
  </div>
</div>
</template>

<style scoped lang="sass">
.info

  &_name
    display: flex
    height: 70px
    &_left
      width: 75%
    &_right
      width: 25%
      height: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      &_img
        height: 50%
        img
          height: 100%
          border-radius: 50%
          aspect-ratio: 1 / 1

  &_detail
    height: calc( 100% - 70px )
  :deep(.ant-tabs-nav)
    margin-bottom:0
  :deep(.ant-tabs-tab)
    padding: 6px
</style>
