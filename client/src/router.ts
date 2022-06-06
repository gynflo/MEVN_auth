import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  //recommandation en lazy-loading => () => import()
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/connexion",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/inscription",
      component: () => import("@/views/Signin.vue"),
    },
    {
      path: "/profil",
      component: () => import("@/views/Profile.vue"),
    },

    {
      path: "/:notfound(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
