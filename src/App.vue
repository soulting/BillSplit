<script setup>
import { onMounted, ref } from "vue";
import supabase from "./utils/supabase.js";
import AuthUseer from "./components/AuthUseer.vue";
import checkIfLogedIn from "./utils/checkLoginStatus.js";
import Dashboard from "./components/Dashboard.vue";
import createGroup from "./utils/createGroup.js";

const user = ref({
  status: "waiting",
  groups: [],
  curret_group: null,
});

const myEvents = ref(null);

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Błąd wylogowania:", error.message);
  } else {
    console.log("Wylogowano.");
  }
  checkIfLogedIn(user);
}

async function handleSuccessfullLogin() {
  checkIfLogedIn(user);
}

onMounted(async () => {
  checkIfLogedIn(user);
});
</script>

<template>
  <!-- <p>{{ user }}</p> -->
  <h1 v-if="user.status === 'loggedIn'" class="title-banner">Twoje grupy</h1>
  <div v-if="user.status === 'waiting'"></div>
  <AuthUseer
    v-if="user.status === 'loggedOut'"
    @loginSuccess="handleSuccessfullLogin"
  ></AuthUseer>

  <div v-if="user.status === 'loggedIn'">
    <Dashboard :groups="user.groups" />

    <nav>
      <button @click="createGroup">nowa grupa</button
      ><button @click="signOut">wyloguj</button>
    </nav>
  </div>
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

.title-banner {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  height: 10%;
  background: linear-gradient(45deg, #474ed7, #ce59f8);
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10%;
  background: linear-gradient(45deg, #474ed7, #ce59f8);
}
</style>
