<script setup lang="ts">
import { z } from "zod";
import { toFormValidator } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import type { UserForm } from "@/shared/interfaces";

import { createUser } from "@/services/user.service";

import { useRouter } from "vue-router";
const router = useRouter();

const validationSchema = toFormValidator(
  z.object({
    name: z.string({ required_error: "Champ requis" }).min(2, "Trop court"),
    email: z
      .string({ required_error: "Champ requis" })
      .email("L'email n'est aps valide "),
    password: z
      .string({ required_error: "Champ requis" })
      .min(5, "Le mot de passe est trop court"),
  })
);
const { handleSubmit, setErrors } = useForm({
  validationSchema,
});
const submit = handleSubmit(async (formValue: UserForm) => {
  try {
    await createUser(formValue);
    router.push("/connexion");
  } catch (error) {
    console.log(error);
  }
});

const { value: nameValue, errorMessage: nameError } = useField("name");
const { value: emailValue, errorMessage: emailError } = useField("email");
const { value: passwordValue, errorMessage: passwordError } =
  useField("password");
</script>

<template>
  <div class="container d-flex justify-content-center p-20 align-items-start">
    <form class="card" @submit="submit">
      <h2 class="mb-20">Inscription</h2>
      <div class="d-flex flex-column mb-10">
        <label for="name" class="mb-5">*Nom</label>
        <input type="text" id="name" v-model="nameValue" />
        <p class="form-error" v-if="nameError">{{ nameError }}</p>
      </div>
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
      <button class="btn btn-primary">Inscription</button>
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
