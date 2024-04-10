<script setup lang="ts">
import LoginImg from "@/assets/favicon.png"
import BagImg from "@/assets/btnIcons/bag.png";
import WarehouseImg from "@/assets/btnIcons/warehouse.png";
import StoreImg from "@/assets/btnIcons/store.png"
import Setting from "@/assets/btnIcons/setting.png";
</script>

<template>
  <div class="operation">
      <a-button class="operation_btns">
        <template #icon><img :src="LoginImg" alt=""/></template>
        <span class="operation_btns_text">登录</span>
      </a-button>
      <a-button class="operation_btns">
        <template #icon><img :src="BagImg" alt=""/></template>
        <span class="operation_btns_text">背包</span>
      </a-button>
      <a-button class="operation_btns">
        <template #icon><img :src="WarehouseImg" alt=""/></template>
        <span class="operation_btns_text">仓库</span>
      </a-button>
      <a-button class="operation_btns">
        <template #icon><img :src="StoreImg" alt=""/></template>
        <span class="operation_btns_text">商店</span>
      </a-button>
      <a-button class="operation_btns">
        <template #icon><img :src="Setting" alt=""/></template>
        <span class="operation_btns_text">设置</span>
      </a-button>
  </div>
</template>

<style scoped lang="sass">
.operation
  display: flex
  &_btns
    display: flex
    align-items: center
    img
      width: 40px
      aspect-ratio:  1 /1
    &_text
      padding-left: 10px
</style>
