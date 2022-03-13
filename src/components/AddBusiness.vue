<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BusinessList } from "../libs/business";
import { directus } from "../libs/directus";
import {
  NH2,
  NText,
  NModal,
  NButton,
  NSpace,
  NInput,
  NBlockquote,
  useMessage,
} from "naive-ui";
import BusinessCard from "./BusinessCard.vue";

const props = defineProps<{ operator: string }>();

const businessList = ref<BusinessList>();
const businessCount = ref<{ [key: string]: number }>({});
const showAddCountModal = ref(false);
const addCountModalRecordId = ref(0);
const addCountModalTextValue = ref("");

const addCountModalConfirmLoading = ref(false);
const addCountModalDeleteLoading = ref(false);

const message = useMessage();

const resetModal = () => {
  addCountModalRecordId.value = 0;
  addCountModalTextValue.value = "";
  addCountModalConfirmLoading.value = false;
  addCountModalDeleteLoading.value = false;
  showAddCountModal.value = false;
};

const addRecord = (businessType: string, callback: () => void) => {
  directus
    .items("business")
    .createOne(
      {
        type: businessType,
        operator: [
          {
            directus_users_id: {
              id: props.operator,
            },
          },
        ],
      },
      {
        fields: ["id"],
      }
    )
    .then((newItem) => {
      if (!newItem || !newItem.id) {
        throw new Error(`Just make TypeScript happy`);
      }
      addCountModalRecordId.value = newItem.id;
      showAddCountModal.value = true;
      refreshCount();
    })
    .catch(() => {
      message.error("记录失败了，可以再点一下试试");
    })
    .finally(callback);
};

const updateRecordContent = () => {
  if (addCountModalTextValue.value.trim() === "") {
    resetModal();
    return;
  }

  addCountModalConfirmLoading.value = true;
  directus
    .items("business")
    .updateOne(addCountModalRecordId.value, {
      content: addCountModalTextValue.value,
    })
    .then(() => {
      message.info("备注成功了");
      resetModal();
    })
    .catch(() => {
      message.error("备注失败了，可以再点一下试试");
    })
    .finally(() => (addCountModalConfirmLoading.value = false));
};

const deleteRecord = () => {
  addCountModalDeleteLoading.value = true;
  directus
    .items("business")
    .deleteOne(addCountModalRecordId.value)
    .then(() => {
      refreshCount();
      resetModal();
      message.info("撤回成功了");
    })
    .catch(() => {
      message.error("撤回失败了，可以再点一下试试");
    })
    .finally(() => (addCountModalDeleteLoading.value = false));
};

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
  <div
    class="business-list"
    v-if="businessList"
    v-for="category in businessList"
  >
    <n-h2 class="business-category" align-text type="info">
      <n-text>{{ category.title }}</n-text>
      <n-blockquote v-if="category.description">{{
        category.description
      }}</n-blockquote>
    </n-h2>

    <div class="business-line-wrapper">
      <div class="business-line">
        <business-card
          v-for="item in category.children"
          :business-item="item"
          :count="businessCount[item.key]"
          :operator="operator"
          @refresh-count="refreshCount"
          @add-count="addRecord"
        />
      </div>
    </div>
  </div>
  <n-modal
    v-model:show="showAddCountModal"
    preset="card"
    class="add-count-modal"
  >
    <template #header>记录成功了</template>
    <n-input
      v-model:value="addCountModalTextValue"
      type="textarea"
      placeholder="有没有什么想补充的，不填也行"
    />
    <template #footer>
      <n-space>
        <n-button
          strong
          secondary
          type="primary"
          :loading="addCountModalConfirmLoading"
          @click="updateRecordContent"
          >确定</n-button
        >
        <n-button
          strong
          secondary
          type="error"
          :loading="addCountModalDeleteLoading"
          @click="deleteRecord"
          >手滑了，撤回这条记录</n-button
        >
      </n-space>
    </template>
  </n-modal>
</template>

<style>
.business-category {
  margin: 0 32px;
}

.business-line-wrapper {
  width: 100%;
  overflow-x: auto;
}

.business-line {
  display: flex;
  flex-wrap: wrap;
  padding-left: 32px;
}

@media (max-width: 575.98px) {
  .business-line {
    flex-wrap: nowrap;
    width: max-content;
  }
}

.add-count-modal {
  max-width: 384px;
}
</style>
