export interface CropInfo {
  id:number,//种子id
  index:number,//编号(土地编号)
  name:string,//作物名称
  level:string | number,//等级
  season?:string | number,//季
  q:number,//状态更新时间(秒) ??
  r:number ,//播种时间 ??
  isMaturation:boolean//是否成熟
  harvestTime:number,//成熟倒计时
  isWithered:boolean//是否枯萎
  //土地类型?
}

//渔场
export interface FishInfo {
  index:number,//编号
  name:string,//鱼苗名称
  time?:string | number ,//收获时间
}

//用户信息
export interface UserInfo {
  uId:string,
  name:string,//昵称
  avatar:string,//头像
  level:string | number,//等级
  money:string | number,//金钱
  points:string | number,//积分
  yuanba:string | number,// 元宝
  dog:string | number,//狗狗
  exp:string | number,//经验
  yellowLevel:string | number,//黄钻等级
}

//好友信息列表
export interface FriendListInfo {
  exp: number;                    // 用户经验值
  headPic: string;                // 用户头像的URL
  money: number;                  // 金额
  pastrueExp: number;             // 过去的真实经验?
  pf: number;
  uId: number;                    // 用户ID
  uin: number;                    // 用户识别号码
  userName: string;               // 用户名
  yellowlevel: number;            // 黄钻等级
  yellowstatus: number;           // 黄钻状态
}

//原始返回
export interface FarmlandStatus {
  a: number //作物ID
  b: number //成长状态
  c: number
  d: number
  e: number
  f: number //杂草
  g: number //虫子
  h: number
  i: number
  j: number //当前季度(0代表第一季,1代表第二季,2代表第三季,3代表第四季,以此类推)
  k: number //产量
  l: number //最少剩余
  m: number //剩余
  n: Array< any > // 偷窃信息
  o: number
  p: Array< any > //灾害信息
  q: number //种植时间1 (第一季的时候,取这个作为种植时间)??  注释可能有误
  r: number //种植时间2 (当j>0的时候,也就是第二季或以上的时候,取这个作为种植时间) ?? 注释可能有误
  bitma: number
  pId: number
  bitmap: number
  goldLand: number
}

//用户背包
export interface UserFarmBagInfo {
  cropList: any[];
  fishList: any[];
  goodsList: any[];
}

export interface CropShoppingInfo {
  cId: number //作物ID
  cLevel: number //作物等级
  cName: string //作物名称
  cType: number
  cropExp: number //作物经验
  expect: number //预计收获
  growthCycle: number //成长周期(秒)
  isFlower: number //是否是花卉类型
  maturingTime: number //多少季作物
  output: number //产量
  price: number //种子价格
  sale: number //单个售价
  isYouji?:number,//1为有机种子
  isRed?:number,//1为红土地 2为黑土地
  isVip:number,//1为vip种子
  isvip:number,//1为vip种子
}
//用户农场商店
export interface UserFarmShoppingInfo {
  organicSeeds: CropShoppingInfo[] //有机种子
  normalSeeds: CropShoppingInfo[] //普通种子
  redSeeds: CropShoppingInfo[] //红土地种子
  blackSeeds: CropShoppingInfo[] //黑土地种子
  vipSeeds: CropShoppingInfo[] //vip种子
}

export enum FarmBagType {
  seed=1,//种子
  fish=23,//鱼苗
  tool=10,//道具
}
