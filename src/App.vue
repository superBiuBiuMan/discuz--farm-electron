<script setup lang="ts">
import { ref } from 'vue';
import Farm from "./view/farm/index.vue";
import Ranch from "./view/ranch/index.vue";
const activeKey = ref<string>('1');

</script>



<template>
  <div class="main">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="农场">
        <Farm/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="牧场" force-render>
        <Ranch/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>



<style scoped lang="sass">
.main
  height: 100%
  width: 100%


</style>
