<script setup lang="ts">
import { NCard, useMessage, NRow, NCol, NStatistic } from "naive-ui";
import { BusinessItem } from '../libs/business';
import { directus } from "../libs/directus";

const props = defineProps<{ businessItem: BusinessItem; count?: number; operator: string; }>()
const emit = defineEmits(['addCount', 'refreshCount']);

const message = useMessage()

const addBusiness = (businessType: string) => {
    directus.items('business').createOne({
        type: businessType,
        operator: [{
            directus_users_id: {
                id: props.operator
            }
        }],
    }).then((newItem) => {
      message.success('记录成功~')
      emit('addCount', businessType)
      emit('refreshCount');
    })
    .catch(() => {
      message.error('记录失败了，可以再点一下试试')
    });
};
</script>

<template>
  <n-card class="business-card" hoverable :header-style="{ paddingBottom: '8px' }" @click="addBusiness(businessItem.key)" >
    <template #header>
      <span class="business-card_title">{{ businessItem.title }}</span></template
    >
    <n-row class="business-card_description">
      {{ businessItem.description }}
    </n-row>
    <template #footer>
      <n-row>
        <n-col :span="12">
          <n-statistic label="本周总计" :value="count || 0">
            <template #prefix>
            </template>
          </n-statistic>
        </n-col>
        <n-col :span="12">
          <n-statistic label="我创建的" :value="count || 0">
          </n-statistic>
        </n-col>
      </n-row>
    </template>
  </n-card>
</template>

<style scoped>
.business-card {
  width: 240px;
  margin: 0 32px 32px 0;
  cursor: pointer;
}

.business-card_title {
  font-weight: bold;
}

</style>
