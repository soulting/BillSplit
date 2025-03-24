<script setup>
import { ref } from "vue";
import checkIfLogedIn from "../utils/checkLoginStatus";
import supabase from "../utils/supabase";

const props = defineProps(["loggedIn"]);
const emit = defineEmits(["loginSuccess"]);

const create = ref(false);
const username = ref(null);
const password = ref(null);
const password2 = ref(null);

const primaryButton = ref("zaloguj się");
const secondaryButton = ref("stwórz konto");

function toggleToCreate() {
  username.value = null;
  password.value = null;
  password2.value = null;
  create.value = !create.value;

  [primaryButton.value, secondaryButton.value] = [
    secondaryButton.value,
    primaryButton.value,
  ];
}

async function createUser(username, password1, password2) {
  if (password1 !== password2) {
    alert("hasła się od siebie różnią ");
    return;
  }

  const authEmail = username.concat("@split.pl");

  const { data, error } = await supabase.auth.signUp({
    email: authEmail,
    password: password1,
  });
  if (error) {
    console.error("Błąd tworzenia:", error.message);
  } else {
    console.log("Stworzono:", data);
    logIn(username, password1);
  }
}

async function logIn(username, password) {
  const authEmail = username.concat("@split.pl");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authEmail,
    password: password,
  });

  if (error) {
    console.error("Błąd logowania:", error.message);
  } else {
    console.log("Zalogowano:", data);
    emit("loginSuccess");
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <h2>Zaloguj się lub stwórz konto</h2>
    <input v-model="username" type="text" placeholder="nazwa" />
    <input v-model="password" type="password" placeholder="hasło" />
    <input
      v-if="create"
      v-model="password2"
      type="password"
      placeholder=" powtórz hasło"
    />
    <button
      class="login-button"
      @click="
        create.value
          ? logIn(username, password)
          : createUser(username, password, password2)
      "
    >
      {{ primaryButton }}
    </button>
    <button class="create-user-button" @click="toggleToCreate">
      {{ secondaryButton }}
    </button>
  </form>
</template>

<style scoped>
.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: 85%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  gap: 30px;
}

h2 {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);

  width: 85%;
  background: linear-gradient(45deg, #474ed7, #ce59f8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-form input {
  height: 50px;
  width: 85%;
  background-color: transparent;
  font-size: 22px;
  color: rgb(50, 50, 50);
  border: none;
  padding-left: 15px;
  border-bottom: 1px solid rebeccapurple;
  outline: none;
  box-sizing: border-box;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 85%;
  font-size: 20px;
  color: white;
  margin: 0;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, #474ed7, #ce59f8);
  transition: all 0.3s ease;
}

.create-user-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 85%;
  font-size: 16spx;
  color: #474ed7;
  margin: 0;
  border: none;
  background-color: transparent;
  margin: -20px;
}
</style>
