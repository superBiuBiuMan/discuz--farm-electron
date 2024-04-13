export interface CropInfo {
  index:number,//编号
  name:string,//作物名称
  level:string | number,//等级
  season?:string | number,//季
  q?:string,
  r?:string,
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
  id:string,
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

//原始返回
export interface FarmlandStatus {
  a: number //作物ID
  b: number
  c: number
  d: number
  e: number
  f: number
  g: number
  h: number
  i: number
  j: number
  k: number
  l: number
  m: number
  n: Array< any >
  o: number
  p: Array< any >
  q: number
  r: number
  bitma: number
  pId: number
  bitmap: number
  goldLand: number
}

