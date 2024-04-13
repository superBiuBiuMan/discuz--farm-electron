<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {useUserInfo} from "@/store";
const userStore = useUserInfo();
const columns:ColumnsType = [
  // {
  //   title: '等级',
  //   dataIndex: 'level',
  //   width: 40,
  // },
  {
    title: '昵称',
    dataIndex: 'userName',
  },
  {
    title: '成熟倒计时',
    dataIndex: 'harvestTime',
  },
];

</script>

<template>
<div class="friend">
  <a-table
      size="small"
      :columns="columns"
      :data-source="userStore.friendListInfo"
      :pagination="false"
      :scroll="{ y: 320 }"
  />
</div>
</template>

<style scoped lang="sass">
.friend
</style>
