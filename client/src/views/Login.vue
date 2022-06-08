<script setup lang="ts">
import { z } from "zod";
import { toFormValidator } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import type { LoginForm } from "@/shared/interfaces";

import { useRouter } from "vue-router";
import { useUser } from "@/shared/stores";

const router = useRouter();

const userStore = useUser();

const validationSchema = toFormValidator(
  z.object({
    email: z
      .string({ required_error: "Champ requis" })
      .email("L'email n'est aps valide "),
    password: z
      .string({ required_error: "Champ requis" })
      .min(5, "Le mot de passe est trop court"),
  })
);
const { handleSubmit, setErrors } = useForm<{
  email: string;
  password: string;
}>({
  validationSchema,
});
const submit = handleSubmit(async (formValue: LoginForm) => {
  try {
    await userStore.login(formValue);
    router.push("/profil");
  } catch (error) {
    setErrors({ password: error as string });
    console.log(error);
  }
});

const { value: emailValue, errorMessage: emailError } = useField("email");
const { value: passwordValue, errorMessage: passwordError } =
  useField("password");
</script>

<template>
  <div class="container d-flex justify-content-center p-20 align-items-start">
    <form class="card" @submit="submit">
      <h2 class="mb-20">Connexion</h2>
      <div class="d-flex flex-column mb-10">
        <label for="email" class="mb-5">*Email</label>
        <input type="text" id="email" v-model="emailValue" />
        <p class="form-error" v-if="emailError">{{ emailError }}</p>
      </div>
      <div class="d-flex flex-column mb-10">
        <label for="password" class="mb-5">*Mot de passe</label>
        <input type="password" id="password" v-model="passwordValue" />
        <p class="form-error" v-if="passwordError">{{ passwordError }}</p>
      </div>
      <button class="btn btn-primary">Connexion</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/base.scss";
.card {
  max-width: 100%;
  width: 500px;
  padding: 20px;
}
</style>
