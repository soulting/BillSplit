<script setup>
import { onMounted, ref } from "vue";
import supabase from "./utils/supabase.js";
import AuthUseer from "./components/AuthUseer.vue";
import checkIfLogedIn from "./utils/checkLoginStatus.js";

const loggedIn = ref("waiting");

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Błąd wylogowania:", error.message);
  } else {
    console.log("Wylogowano.");
  }
  checkIfLogedIn(loggedIn);
}

function handleSuccessfullLogin() {
  loggedIn.value = true;
  checkIfLogedIn(loggedIn);
}

onMounted(async () => {
  checkIfLogedIn(loggedIn);
});
</script>

<template>
  <div v-if="loggedIn === 'waiting'"></div>
  <AuthUseer
    v-if="loggedIn === false"
    @loginSuccess="handleSuccessfullLogin"
  ></AuthUseer>

  <div v-else><button @click="signOut">wyloguj</button></div>
</template>

<style>
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #474ed7, #ce59f8);
}
</style>
