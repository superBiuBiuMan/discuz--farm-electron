<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";

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
const data = [
    {
      index: 1,
      name: '红鱼',
      harvestTime: '2021-01-01'
    },
    {
      index: 2,
      name: '黄鱼',
      harvestTime: '2021-01-01'
    },
    {
      index: 3,
      name: '蓝鱼',
      harvestTime: '2021-01-01'
    },
]
</script>

<template>
<div class="fish">
  <a-table
      size="small"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :scroll="{ y: 194 }"
  />
</div>
</template>

<style scoped lang="sass">

</style>
