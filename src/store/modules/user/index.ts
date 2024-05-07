import {defineStore} from 'pinia'
import { nextTick, ref} from "vue";
import {
  CropInfo,
  FishInfo,
  FriendListInfo,
  UserFarmBagInfo,
  UserFarmShoppingInfo,
  UserInfo
} from "./types.ts";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getFarmKey} from "@/utils/secret.ts";
import { sleep } from "@/utils/common.ts";
import {harvestAllCrop, plantCrop, witherDigCrop} from "@/utils/commonReq.ts";

import {computedTime, CropStatusEnum, getFarmFishInfo, getFriendList, getUserFarmBagInfo,getFarmShopping} from "./methods.ts";


export default defineStore('userInfo',() => {
  //计时器
  const timer = ref<any>(null);
  //服务器时间
  const serverTime = ref<number>(0);
  //农场作物信息
  const cropInfo = ref<CropInfo[]>([]);
  //渔场信息
  const fishInfo = ref<FishInfo[]>([]);
  //用户基本信息
  const userInfo = ref<UserInfo>({
    uId:'',
    name:'',//昵称
    avatar:'',//头像
    level:'',//等级
    money:'',//金钱
    points:'',//积分
    yuanba:'',// 元宝
    dog:'',//狗狗
    exp:'',//经验
    yellowLevel:'',//黄钻等级
  });
  //好友列表
  const friendListInfo = ref<Partial<FriendListInfo>[]>([]);
  //用户背包信息
  const userBagInfo = ref<UserFarmBagInfo>({
    cropList:[],//种子
    fishList:[],//鱼苗
    goodsList:[],//道具
  });
  //用户农场商店
  const userFarmShoppingInfo = ref<UserFarmShoppingInfo>({
    organicSeeds:[],//有机种子
    normalSeeds:[],//普通种子
    redSeeds:[],//红土地种子
    blackSeeds:[],//黑土地种子
    vipSeeds:[],//vip种子
  });
  //获取农场信息
  const getCropInfo = async () => {
    const data = {
      uIdx: '',
      farmKey: getFarmKey(),
      uinY:'',
      farmTime: 0
    }
    //获取农场基本信息
    let result:any = await request({ url:Url.user.baseInfo, method:"post", data});
    result = result?.data ?? {};
    console.log('基本信息',result)
    //设置服务器时间
    serverTime.value = result?.serverTime?.time ?? 0;
    //设置用户信息
    setUserInfo(result);
    const farmlandStatusOrigin:any[]= result?.farmlandStatus ?? [];//土地作物信息
    let cropListObj = await window.ipcRenderer.invoke("getCorpInfoList",{ list: farmlandStatusOrigin.map(item => item.a)})
                      .then((res:any) => {
                        const temp:any = {};
                        res.forEach((item:any) => {
                          temp[item.id] = item;
                        })
                        return temp;
                      })
                      .catch(() => []);
    cropInfo.value = farmlandStatusOrigin.map((item,index) => {
        const currentInfo = cropListObj[item.a] ?? {};//当前作物信息
        const harvestTime = computedTime(item.q,currentInfo,result?.serverTime?.time);
        return {
          index:index,
          id:currentInfo.id,
          name:currentInfo.cName ?? "-",
          level:currentInfo.cLevel ?? "-",
          r:item.r,
          q:item.q,
          season:item.j+1,
          harvestTime,
          isMaturation:(!!(item.r && item.q && harvestTime < 0)),//是否成熟
          isWithered:item.b === CropStatusEnum.Withered,//是否枯萎
        }
    }) ?? [];
    console.log('作物信息',cropInfo.value)
    if(cropInfo.value.some(item => !item.id || item.isWithered || item.isMaturation)){
      console.log('进入播种逻辑');
      //播种空地和收获作物
      cropInfo.value.map(async (item) => {
        if(!item.id){
          //播种
          await plantCrop(item.index + "",'6085');
          await sleep(300);
        }
        else{
          if(item.isMaturation && !item.isWithered){
            console.log('作物已经成熟',item,item.index);
            //作物收获
            await harvestAllCrop(item.index + "");
            await sleep(300);
          }else{
            //枯萎并播种
            if(item.isWithered){
              console.log('作物已经枯萎',item,item.index);
              await witherDigCrop(item.index + "");//如果是枯萎的,铲除
              await sleep(300);
              await plantCrop(item.index + "","6085");//播种
              await sleep(300);
            }
          }
        }
      });
      await sleep(2000);
      await getCropInfo();
    }
  }

  //用户数据
  const setUserInfo = (userInfoOrigin:any) => {
    const { exp,user } = userInfoOrigin || {};
    const info = {
      uId:user.uId,
      name:user?.userName ?? "-",//昵称
      avatar:user?.headPic ?? "",//头像
      // level:string | number,//等级
      money:user?.money ?? "",//金钱
      // points:string | number,//积分
      yuanba:user?.FB ?? "",//元宝
      // dog:string | number,//狗狗
      // exp:string | number,//经验
      yellowLevel:user?.yellowLevel,//黄钻等级
    }
    userInfo.value = info;
  }


  //每一秒动态更新数据种子数据
  const startWatch = () => {
    if(timer.value) clearInterval(timer.value);
    //创建计时器
    cropInfo.value.forEach(item => {
      if(!item.isMaturation  && item.harvestTime && item.harvestTime >0){
        setTimeout(() => {
          console.log('倒计时结束-收获作物',item);
          //倒计时,执行收获作物操作
          getCropInfo();
          //添加长一点的延迟(10秒)
        },item.harvestTime * 10000)
      }
    })

    //每一秒动态更新收获数据
    timer.value = setInterval(() => {
      cropInfo.value = cropInfo.value.map(item => {
        const time = --item.harvestTime;
        return {
          ...item,
          isMaturation:time < 0 ,
          harvestTime:time,
        }
      })
    },1100)
  }
  //初始化数据登录后
  const init = async () => {
    //获取用户背包
    const res = await getUserFarmBagInfo();
    userBagInfo.value.cropList = res.cropList;
    userBagInfo.value.fishList = res.fishList;
    userBagInfo.value.goodsList = res.goodsList;
    //获取商店(便于播种)
    const shoppInfo = await getFarmShopping();
    userFarmShoppingInfo.value.normalSeeds = shoppInfo.normalSeeds;
    userFarmShoppingInfo.value.organicSeeds = shoppInfo.organicSeeds;
    userFarmShoppingInfo.value.vipSeeds = shoppInfo.vipSeeds;
    userFarmShoppingInfo.value.blackSeeds = shoppInfo.blackSeeds;
    userFarmShoppingInfo.value.redSeeds = shoppInfo.redSeeds;
    console.log('shoppInfo信息',shoppInfo);
    //土地处理
    await getCropInfo();
    //鱼塘信息
    fishInfo.value = await getFarmFishInfo(userInfo.value.uId);
    //好友信息
    friendListInfo.value = await getFriendList(userInfo.value.uId);
    nextTick(() => {
      startWatch();
    })
  }
  return {
    serverTime,
    cropInfo,
    fishInfo,
    userInfo,
    friendListInfo,
    userBagInfo,
    init,
  }
})
