import {ColumnsType} from "ant-design-vue/lib/table/interface";
import {watch,ref} from "vue";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getReqInfo} from "@/utils/reqDataParam.ts";
//@ts-ignore
export const useFarmStore = (props:any,emit:any) => {
  //蔬果数据
  const harvestDataList = ref<any[]>([]);
  //种子数据
  const seedDataList = ref<any[]>([]);
  //关闭对话框
  const closeModal = () => {
    emit('close', false);
  }
  //蔬果列
  const harvestColumns:ColumnsType = [
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
      title:"售价",
      dataIndex: 'price',
    },
    {
      title:"是否锁定",
      dataIndex: 'isLock',
    },
    {
      title:"等级",
      dataIndex: 'level',
    }
  ]
  //种子列
  const seedColumns:ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'cId',
      width: 40,
    },
    {
      title:"等级",
      dataIndex: 'level',
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
      title:"单个售价",
      dataIndex: 'price',
    },
    {
      title:"成熟时间",
      dataIndex: 'lifecycle',
    },
  ]
  //获取蔬果数据
  const getHarvestDataList = async () => {
    const data = getReqInfo(['uIdx', 'farmTime', 'farmKey']);
    let result:any = await request({ url:Url.bag.getFarmStore, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    harvestDataList.value = result?.data?.crop ?? [];
  }
  //获取种子数据
  const getSeedDataList = async () => {
    const data = getReqInfo(['uIdx', 'farmTime', 'farmKey']);
    // const data = {};
    let result:any = await request({ url:Url.bag.getFarmStoreSeed, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    seedDataList.value = result?.data ?? [];
  }
  watch(props,() => {
    if(props.visible) {
      init();
    }
  })
  //初始化
  const init = () => {
    getHarvestDataList();
    getSeedDataList();
  }
  return {
    closeModal,
    seedDataList,
    harvestDataList,
    harvestColumns,
    seedColumns,
    init,
  }
}
