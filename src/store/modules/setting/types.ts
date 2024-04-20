
//播种模式
export enum SeedPlantMode {
  //等级播种
  LEVEL = 0,
  //时间播种
}

export interface Setting {
  seedPlantMode:SeedPlantMode
}
