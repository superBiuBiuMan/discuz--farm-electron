<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {useUserInfo} from "@/store";
import {formatSeconds} from "@/utils/secret.ts";
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
      :scroll="{ y: 220 }">
    <template #bodyCell="{ column, record }">

      <!--成熟时间-->
      <template v-if="column.dataIndex === 'harvestTime'">
        <!--成熟-->
        <template v-if="record.isMaturation">
          <a-tag color="orange">已成熟</a-tag>
        </template>
        <!--未成熟-->
        <template v-else>
         {{ record.harvestTime ? formatSeconds(record.harvestTime) : '-' }}
        </template>
      </template>

    </template>
  </a-table>
</div>
</template>

<style scoped lang="sass">

</style>
