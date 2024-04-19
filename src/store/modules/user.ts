import { defineStore } from 'pinia'
import {nextTick, ref} from "vue";
import {CropInfo, FishInfo, FriendListInfo, UserInfo} from "@/store/types/User.ts";
import request from "@/utils/request.ts";
import Url from "@/urls";
import {getFarmTime, getFarmKey} from "@/utils/secret.ts";
import {harvestAllCrop, plantCrop, witherDigCrop} from "@/utils/commonReq.ts";
import {getReqInfo} from "@/utils/reqDataParam.ts";
export const computedTime = (time:number,cropInfo:any,serverTime:number) => {
  return  cropInfo.growthCycle + time - serverTime;
}

export enum CropStatusEnum {
  Withered=7,//已枯萎
}

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
  const userInfo = ref<Partial<UserInfo>>({});
  //好友列表
  const friendListInfo = ref<Partial<FriendListInfo>[]>([]);
  //用户背包信息
  const userBagInfo = ref({
    cropList:[],//种子
    fishList:[],//鱼苗
    goodsList:[],//道具
  });
  //获取商店信息
  //获取背包信息
  const getUserBagInfo = async () => {
    const data = getReqInfo(["uIdx","farmTime","farmKey"]);
    let result:any = await request({ url:Url.bag.getFarmBag, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    result = result?.data ?? [];
    userBagInfo.value.cropList = result?.filter((item:any) => item.type === 1) ?? [];//种子
    userBagInfo.value.fishList = result?.filter((item:any) => item.type === 23) ?? [];//鱼苗
    userBagInfo.value.goodsList = result?.filter((item:any) => item.type === 10) ?? [];//道具
  }
  //播种空地
  const plantEmptyLand = async () => {
    cropInfo.value.map(async (item) => {
      if(!item.id){
        //播种
        console.log('播种',item);
        await plantCrop(item.index + "","933");
      }
      else{
        if(item.isMaturation && !item.isWithered){
          console.log('作物已经成熟',item);
          //作物收获
          await harvestAllCrop(item.index + "");
          await witherDigCrop(item.index + "");//铲除
          await plantCrop(item.index + "","933");//播种
        }else{
          if(item.isWithered){
            await witherDigCrop(item.index + "");//如果是枯萎的,铲除
            await plantCrop(item.index + "","933");//播种
          }
        }
      }
    })
    //重新查询数据
    await getCropInfo();
  }
  let bbbb = true;
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
          // isMaturation:(item.r && item.q && harvestTime < 0 ? true : false),
          isMaturation:(!!(item.r && item.q && harvestTime < 0)),
          isWithered:item.b === CropStatusEnum.Withered,
        }
    }) ?? [];
    if(bbbb === true && cropInfo.value.some(item => !item.id || item.isWithered || item.isMaturation)){
      //播种空地和收获作物
      console.log('播种空地和收获作物',cropInfo.value)
      plantEmptyLand();
      bbbb = false;
    }
    console.log('作物信息',cropInfo.value)
  }

  //获取渔场信息
  const getFishInfo = async () => {
    const data = {
      uIdx: userInfo.value.uId,
      farmTime: getFarmTime(),
      farmKey: getFarmKey(),
      ownerId: userInfo.value.uId,
    }
    //获取农场基本信息
    let result:any = await request({ url:Url.user.fishInfo, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    result = result?.data ?? {};
    let {  fish,open } = result;
    //判断是否是数组
    if(!Array.isArray(fish)){
      fish = Object.values(fish);
    }
    if(open === 0){
      //todo 用户未开通鱼塘
    }else{
      let fishList = await window.ipcRenderer.invoke("getFishInfoList",{ list: fish.map((item:any) => item.fid)})
      .then((res:any) => {
        const temp:any = {};
        res.forEach((item:any) => {
          temp[item.id] = item;
        })
        return temp;
      })
      .catch(() => []);
      fishInfo.value = fish.map((item:any,index:number) => {
        const currentInfo = fishList[item.fid] ?? {};//当前作物信息
        return {
          index:index,
          id:currentInfo.id,
          name:currentInfo.crop_name ?? "-",
        }
      }) ?? [];
    }
  }

  //应用用户数据
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

  //获取用户好友
  const getFriendList = async () => {
    const data = {
      uIdx: userInfo.value.uId,
      farmTime: getFarmTime(),
      farmKey: getFarmKey(),
    }
    //获取好友列表
    let result:any = await request({ url:Url.user.friendList, method:"post", headers:{ "Content-Type":"application/x-www-form-urlencoded" } ,data});
    friendListInfo.value = result?.data ?? [];
  }

  //每一秒动态更新数据种子数据
  const startWatch = () => {
    if(timer.value) clearInterval(timer.value);
    //创建计时器
    cropInfo.value.forEach(item => {
      if(!item.isMaturation  && item.harvestTime && item.harvestTime >0){
        setTimeout(() => {
          console.log('收获作物',item);
          //倒计时,执行收获作物操作
          // harvestAllCrop(item.index + "").then((status) => {
          //   if(status === CropStatusEnum.Withered){
          //     //枯萎状态,铲除并重新播种
          //     witherDigCrop(item.index + "").then(() => {
          //       //播种
          //       plantCrop(item.index + "","933");
          //     })
          //   }
          // })
          //重新查询土地信息
          getCropInfo();
        },item.harvestTime * 1000)
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
    await getUserBagInfo();
    await getCropInfo();
    await getFishInfo();
    await getFriendList();
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
