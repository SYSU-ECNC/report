<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BusinessList } from "../libs/business";
import { directus } from "../libs/directus";
import { NH2, NText } from "naive-ui";
import BusinessCard from "./BusinessCard.vue";

defineProps<{ operator: string }>();

const businessList = ref<BusinessList>();
const businessCount = ref<{ [key: string]: number }>({});

const addCount = (businessType: string) => {
  businessCount.value[businessType] = (businessCount.value[businessType] || 0) + 1;
}

const refreshCount = () => {
  const now = new Date();
  const nowWeekday = now.getDay();
  const daysAfterLastThursday =
    (nowWeekday >= 4 ? nowWeekday : nowWeekday + 7) - 4;
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysAfterLastThursday,
    0,
    0,
    0
  );

  directus
    .items("business")
    .readByQuery({
      fields: ["id", "type"],
      limit: -1,
      filter: {
        date_created: {
          _gte: startDate,
        },
      },
    })
    .then((items) => {
      const countMap: { [key: string]: number } = {};

      if (items.data) {
        items.data.forEach((item) => {
          countMap[item.type!] = (countMap[item.type!] || 0) + 1;
        });
      }
      businessCount.value = countMap;

      console.log(businessCount);
    });
};

onMounted(async () => {
  directus
    .singleton("BusinessDefinition")
    .read()
    .then((definitionItem) => {
      if (definitionItem && definitionItem.definition) {
        businessList.value = JSON.parse(definitionItem.definition);
      }
    })
    .then(refreshCount);
});
</script>

<template>
  <div v-if="businessList" v-for="category in businessList">
    <n-h2 align-text type="info">
      <n-text>{{ category.title }}</n-text>
    </n-h2>
    <div class="business-line">
      <business-card
        v-for="item in category.children"
        :business-item="item"
        :count="businessCount[item.key]"
        :operator="operator"
        @refresh-count="refreshCount"
        @add-count="addCount"
      />
    </div>
  </div>
</template>

<style scoped>
.business-line {
  display: flex;
  flex-wrap: wrap;
}
</style>
