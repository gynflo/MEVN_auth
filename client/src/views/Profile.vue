<script setup lang="ts">
import { useUser } from "@/shared/stores";

const userStore = useUser();
</script>

<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="card">
      <pre>{{ userStore.currentUser }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
.card {
  width: 100%;
  max-width: 400px;
}
</style>
