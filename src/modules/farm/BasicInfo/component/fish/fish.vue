<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {userInfoStore} from "@/store";
const columns:ColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    width: 40,
  },
  {
    title: '鱼苗名称',
    dataIndex: 'name',
  },
  {
    title: '收获时间',
    dataIndex: 'harvestTime',
  },
];
</script>

<template>
<div class="fish">
  <a-table
      size="small"
      :columns="columns"
      :data-source="userInfoStore.fishInfo"
      :pagination="false"
      :scroll="{ y: 220 }"
  />
</div>
</template>

<style scoped lang="sass">

</style>
