<script setup lang="ts">
defineProps<{
  isLoggedin: boolean;
}>();

const emit = defineEmits<{
  (e: "logout"): void;
}>();
</script>

<template>
  <nav class="d-flex align-items-center px-20 header-container">
    <div class="flex-fill">
      <router-link to="/">
        <h1>Application</h1>
      </router-link>
    </div>

    <ul class="d-flex align-items-center">
      <template v-if="isLoggedin">
        <li class="mr-20">
          <router-link to="/">Mon profil</router-link>
        </li>
        <li @click="emit('logout')">Déconnexion</li>
      </template>
      <template v-else>
        <li class="mr-20">
          <router-link to="/connexion">Connexion</router-link>
        </li>
        <li>
          <router-link to="inscription">Inscription</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";

.header-container {
  background-color: var(--primary-1);
}
a,
li {
  color: white;
  cursor: pointer;
}
</style>
