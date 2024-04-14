<script setup lang="ts">
import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {ref, watch} from "vue";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getReqInfo} from "@/utils/reqDataParam.ts";

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
const dataInfo = ref({
  cropList:[],
  fishList:[],
  goodsList:[],
})
const initData = async () => {
  const data = getReqInfo(["uIdx","farmTime","farmKey"]);
  let result:any = await request({ url:Url.bag.getFarmBag, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
  result = result?.data ?? [];
  dataInfo.value.cropList = result?.filter((item:any) => item.type === 1) ?? [];//种子
  dataInfo.value.fishList = result?.filter((item:any) => item.type === 23) ?? [];//鱼苗
  dataInfo.value.goodsList = result?.filter((item:any) => item.type === 10) ?? [];//道具
}
watch(props,() => {
  if(props.visible){
    //加载数据
    initData();
  }
})
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
            :data-source="dataInfo.cropList"
            :pagination="false"
            :scroll="{ y: 250 }"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="鱼苗">
        <a-table
            size="small"
            :columns="fishColumns"
            :data-source="dataInfo.fishList"
            :pagination="false"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="道具">
        <a-table
            size="small"
            :columns="goodsColumns"
            :data-source="dataInfo.goodsList"
            :pagination="false"
        />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<style scoped lang="sass">
.bag

</style>
