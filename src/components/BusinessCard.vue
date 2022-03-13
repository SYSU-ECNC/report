<script setup lang="ts">
import { NCard, NRow, NTooltip, useLoadingBar } from "naive-ui";
import { ref } from "vue";
import { BusinessItem } from "../libs/business";

const props = defineProps<{
  businessItem: BusinessItem;
  count?: number;
  operator: string;
}>();
const emit = defineEmits(["addCount", "refreshCount"]);

const loadingBar = useLoadingBar();

const addBusiness = (businessType: string) => {
  loadingBar.start();
  emit("addCount", businessType, () => {
    loadingBar.finish();
  });
};
</script>

<template>
  <n-tooltip>
    当前统计周期内已被点击 {{ count || 0 }} 次
    <template #trigger placement="top" trigger="hover">
      <n-card
        class="business-card"
        hoverable
        embedded
        :style="{
          background: businessItem.background,
          color: businessItem.color,
          borderColor: businessItem.borderColor,
        }"
        :header-style="{ paddingBottom: '8px' }"
        :data-count="count || 0"
        @click="addBusiness(businessItem.key)"
      >
        <template #header>
          <span
            class="business-card_title"
            :style="{
              color: businessItem.color,
            }"
            >{{ businessItem.title }}</span
          ></template
        >
        <n-row class="business-card_description">
          {{ businessItem.description }}
        </n-row>
      </n-card>
    </template>
  </n-tooltip>
</template>

<style scoped>
@import url("https://fonts.loli.net/css2?family=Petit+Formal+Script&display=swap");

.business-card {
  width: 240px;
  margin: 0 32px 32px 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.business-card::after {
  display: block;
  content: attr(data-count);
  position: absolute;
  right: 12px;
  bottom: -32px;
  font-size: 64px;
  font-family: "Petit Formal Script", cursive;
  opacity: 0.3;
}

.business-card_title {
  font-weight: bold;
}
</style>
