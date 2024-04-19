<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {userInfoStore} from "@/store";
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
export interface Props {
  visible: boolean
}
export interface Emits {
  (event: "close", data: boolean): void
}

//关闭对话框
const closeModal = () => {
  emit('close', false);
}
//种子列
const cropColumns:ColumnsType = [
  {
    title: 'ID',
    dataIndex: 'cId',
    width: 40,
  },
  {
    title:"名称",
    dataIndex: 'cName',
  },
  {
    title:"数量",
    dataIndex: 'amount',
    width: 60,
  },
  {
    title:"成熟时间(小时)",
    dataIndex: 'lifecycle',
  },
  {
    title:"等级",
    dataIndex: 'level',
  }
]
//鱼苗列
const fishColumns:ColumnsType = [
  {
    title: 'ID',
    dataIndex: 'fId',
    width: 40,
  },
  {
    title:"名称",
    dataIndex: 'tName',
  },
  {
    title:"数量",
    dataIndex: 'amount',
  },

]
//道具列
const goodsColumns:ColumnsType = [
  {
    title: 'ID',
    dataIndex: 'tId',
    width: 40,
  },
  {
    title:"名称",
    dataIndex: 'tName',
    width: 100,
  },
  {
    title:"数量",
    dataIndex: 'amount',
    width: 60,
  },
  {
    title:"描述",
    dataIndex:"depict",
  }
]
</script>

<template>
  <a-modal
      class="bag"
      :open="props.visible"
      @cancel="closeModal"
      :footer="null"
      :maskClosable="false"
      width="500px"
  >
    <a-tabs >
      <a-tab-pane key="1" tab="种子">
        <a-table
            size="small"
            :columns="cropColumns"
            :data-source="userInfoStore.userBagInfo.cropList"
            :pagination="false"
            :scroll="{ y: 250 }"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="鱼苗">
        <a-table
            size="small"
            :columns="fishColumns"
            :data-source="userInfoStore.userBagInfo.fishList"
            :pagination="false"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="道具">
        <a-table
            size="small"
            :columns="goodsColumns"
            :data-source="userInfoStore.userBagInfo.goodsList"
            :pagination="false"
        />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<style scoped lang="sass">
.bag

</style>
