<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {useUserInfo} from "@/store";
const columns:ColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    width: 40,
  },
  {
    title: '作物名称',
    dataIndex: 'name',
  },
  {
    title: '等级',
    dataIndex: 'level',
    width: 40,
  },
  {
    title: '季',
    dataIndex: 'season',
    width: 40,
  },
  {
    title: '成熟时间',
    dataIndex: 'harvestTime',
  },
];
const userStore = useUserInfo();
</script>

<template>
<div class="vegetable">
  <!--:scroll="{ y: 194 }"-->
  <a-table
      size="small"
      :columns="columns"
      :data-source="userStore.cropInfo"
      :pagination="false"
      :scroll="{ y: 220 }"
  />
</div>
</template>

<style scoped lang="sass">

</style>
