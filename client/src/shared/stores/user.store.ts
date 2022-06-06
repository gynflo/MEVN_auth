import { defineStore } from "pinia";
import type { User } from "@/shared/interfaces";

interface UserState {
  currentUser: User | null;
}

export const useUser = defineStore("user", {
  state: (): UserState => ({
    currentUser: null,
  }),
});
