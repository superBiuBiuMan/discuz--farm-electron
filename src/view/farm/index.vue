<script setup lang="ts">
import Operations from "@/modules/farm/Operations/index.vue";
import BasicInfo from "@/modules/farm/BasicInfo/index.vue";
import FriendInfo from "@/modules/farm/Friend/index.vue";
import ShowLogs from "@/modules/farm/ShowLogs/index.vue";
</script>

<template>
  <div class="farm">
    <!--顶部按钮-->
    <div class="farm_btn"><Operations/></div>
    <!--基本信息-->
    <div class="farm_info">
      <BasicInfo/>
      <FriendInfo/>
    </div>
    <!--操作日志-->
    <div class="farm_logs">
      <div class="farm_logs_tips">操作次数: 1000      金币: 1111  </div>
      <ShowLogs/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.farm
  display: flex
  flex-direction: column

  //顶部按钮
  &_btn
    margin-bottom: 10px
  //基本信息
  &_info
    display: flex
    & > div
      flex: 1
      height: 350px
  //操作日志
  &_logs
    &_tips
      margin: 4px 0

</style>
