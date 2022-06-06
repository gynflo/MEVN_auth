<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
function logout(){

}

</script>

<template>
  <div class="d-flex flex-column app-container">
    <TheHeader :is-loggedin="false" @logout="logout" />
    <router-view class="flex fill"></router-view>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/base.scss";

.app-container {
  min-height: 100vh;
}
</style>
