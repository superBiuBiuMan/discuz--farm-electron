<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";

const columns:ColumnsType = [
  {
    title: '等级',
    dataIndex: 'level',
    width: 40,
  },
  {
    title: '昵称',
    dataIndex: 'name',
  },
  {
    title: '成熟倒计时',
    dataIndex: 'harvestTime',
  },
];
const data = [
    {
      name: '小明',
      level: 1,
      harvestTime: '01:00:00'
    },
    {
      name: '小红',
      level: 2,
      harvestTime: '01:00:00'
    },
    {
      name: '小刚',
      level: 3,
      harvestTime: '01:00:00'
    }, {
    name: '小明',
    level: 1,
    harvestTime: '01:00:00'
  },
  {
    name: '小红',
    level: 2,
    harvestTime: '01:00:00'
  },
  {
    name: '小刚',
    level: 3,
    harvestTime: '01:00:00'
  }, {
    name: '小明',
    level: 1,
    harvestTime: '01:00:00'
  },
  {
    name: '小红',
    level: 2,
    harvestTime: '01:00:00'
  },
  {
    name: '小刚',
    level: 3,
    harvestTime: '01:00:00'
  }, {
    name: '小明',
    level: 1,
    harvestTime: '01:00:00'
  },
  {
    name: '小红',
    level: 2,
    harvestTime: '01:00:00'
  },
  {
    name: '小刚',
    level: 3,
    harvestTime: '01:00:00'
  }, {
    name: '小明',
    level: 1,
    harvestTime: '01:00:00'
  },
  {
    name: '小红',
    level: 2,
    harvestTime: '01:00:00'
  },
  {
    name: '小刚',
    level: 3,
    harvestTime: '01:00:00'
  },
]
</script>

<template>
<div class="friend">
  <a-table
      size="small"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :scroll="{ y: 310 }"
  />
</div>
</template>

<style scoped lang="sass">
.friend
  background-color: green
</style>
