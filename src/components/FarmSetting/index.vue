<script setup lang="ts">
import { useFarmSetting } from "./method.ts"
import { ref } from "vue";
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
  formState,
  onFinish,
} = useFarmSetting(props,emit);
</script>

<template>
  <a-modal
      class="bag"
      :open="props.visible"
      @cancel="closeModal"
      :footer="null"
      :maskClosable="false"
      width="800px"
  >
    <a-tabs >
      <a-tab-pane key="1" tab="播种设置">
        <a-form
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
        >
          <a-form-item
              label="按等级播种商店种子"
              name="seedPlantMode"
          >
            <a-input v-model:value="formState.seedPlantMode" disabled />
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="其他">

      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<style scoped lang="sass">

</style>
