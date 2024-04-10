<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";

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
const data = [
  {
    index: 1,
    name: '苹果',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 2,
    name: '香蕉',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 3,
    name: '梨',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 4,
    name: '菠萝',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 5,
    name: '葡萄',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 6,
    name: '橘子',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 7,
    name: '葡萄',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 8,
    name: '橘子',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 9,
    name: '葡萄',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 10,
    name: '橘子',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 11,
    name: '葡萄',
    level: 1,
    season: 1,
    harvestTime: 1
  },
  {
    index: 12,
    name: '橘子',
    level: 1,
    season: 1,
    harvestTime: 1
  },
]
</script>

<template>
<div class="vegetable">
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
