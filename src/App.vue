<script setup lang="ts">
import { onMounted, ref } from "vue";
import { directus } from "./libs/directus";
import AddBusiness from "./components/AddBusiness.vue";
import { NMessageProvider, NLoadingBarProvider } from 'naive-ui'

const currentUser = ref("");

const redirectToLogin = () => {
  location.href = `https://helper.ecnc.link/auth/login/ecnc?redirect=${encodeURIComponent(
    location.href
  )}`;
};

onMounted(() => {
  directus.auth
    .refresh()
    .then(() => directus.users.me.read({
      fields: ['id']
    }))
    .then((user) => {
      currentUser.value = user.id || "";
    })
    .catch(() => redirectToLogin());
});
</script>

<template>
  <span v-if="!currentUser">Loading...稍等一下下</span>
  <div v-else class="container">
    <n-message-provider>
      <n-loading-bar-provider>
      <add-business :operator="currentUser" />
      </n-loading-bar-provider>
    </n-message-provider>
  </div>
  <div class="footer">新手教程：点击上边的卡片就可以计数。没了。</div>
</template>

<style>
.container {
  padding: 32px 0 64px 0;
}

.footer {
  position: fixed;
  border-top: 1px solid #eee;
  background-color: rgba(0, 0, 0, 0.6);
  color: #f5f5f7;
  backdrop-filter: saturate(180%) blur(20px);
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 0;
  text-align: center;
}
</style>
