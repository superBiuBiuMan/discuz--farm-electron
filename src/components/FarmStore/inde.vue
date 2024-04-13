<script setup lang="ts">
import { useFarmStore } from "./method.ts";
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
export interface Props {
  visible: boolean
}
export interface Emits {
  (event: "close", data: boolean): void
}
const {
  closeModal,
  harvestColumns,
  seedColumns,
  harvestDataList,
  seedDataList,
} = useFarmStore(props,emit);
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
      <a-tab-pane key="1" tab="蔬果">
        <a-table
            size="small"
            :columns="harvestColumns"
            :data-source="harvestDataList"
            :pagination="false"
            :scroll="{ y: 250 }"
        />
      </a-tab-pane>
      <a-tab-pane key="5" tab="种子">
        <a-table
            size="small"
            :columns="seedColumns"
            :data-source="seedDataList"
            :pagination="false"
            :scroll="{ y: 250 }"
        />
      </a-tab-pane>
      <a-tab-pane key="3" tab="成鱼" >

      </a-tab-pane>
      <a-tab-pane key="2" tab="鲜花">

      </a-tab-pane>

      <a-tab-pane key="4" tab="收到的花束">

      </a-tab-pane>

      <a-tab-pane key="6" tab="材料">

      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<style scoped lang="sass">
.farm-store

</style>
