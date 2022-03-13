<script setup lang="ts">
import { onMounted, ref } from "vue";
import { directus } from "./libs/directus";
import AddBusiness from "./components/AddBusiness.vue";
import { NMessageProvider } from 'naive-ui'

const currentUser = ref("");

const redirectToLogin = () => {
  location.href = `https://helper.ecnc.link/auth/login/ecnc?redirect=${encodeURIComponent(
    location.href
  )}`;
};

onMounted(() => {
  directus.auth
    .refresh()
    .then(() => directus.users.me.read())
    .then((user) => {
      currentUser.value = user.id || "";
    })
    .catch(() => redirectToLogin());
});
</script>

<template>
  <span v-if="!currentUser">Loading...</span>
  <div v-else class="container">
    <n-message-provider>
      <add-business :operator="currentUser" />
    </n-message-provider>
  </div>
</template>

<style>
.container {
  padding: 32px;
}
</style>
