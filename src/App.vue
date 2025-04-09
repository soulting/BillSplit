<script setup>
import { onMounted, ref } from "vue";
import supabase from "./utils/supabase.js";
import AuthUseer from "./components/AuthUseer.vue";
import checkIfLogedIn from "./utils/checkLoginStatus.js";
import Dashboard from "./components/Dashboard.vue";
import createGroup from "./utils/createGroup.js";
import GroupActions from "./components/GroupActions.vue";
import getGroup from "./utils/getGroup.js";
import GroupDetails from "./components/GroupDetails.vue";

const user = ref({
  status: "waiting",
  groups: [],
  curretGroup: null,
  currentPage: "yourGroups",
});

async function getGroupDetails(groupID) {
  getGroup(user, groupID);
}

const showGroupActions = ref(false);

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

function actOnGroups() {
  showGroupActions.value = !showGroupActions.value;
}

async function handleSuccessfullLogin() {
  checkIfLogedIn(user);
}

onMounted(async () => {
  checkIfLogedIn(user);
});
</script>

<template>
  <h1 v-if="user.status === 'loggedIn'" class="title-banner">
    {{ user.currentPage }}
  </h1>
  <div v-if="user.status === 'waiting'"></div>
  <AuthUseer
    v-if="user.status === 'loggedOut'"
    @loginSuccess="handleSuccessfullLogin"
  ></AuthUseer>

  <div v-if="user.status === 'loggedIn'">
    <Dashboard
      v-if="user.currentPage === 'yourGroups'"
      :groups="user.groups"
      :getGroupDetails="getGroupDetails"
    />
    <GroupDetails v-if="user.currentPage === 'groupDetails'" />

    <GroupActions class="group-actions" v-if="showGroupActions" />

    <nav>
      <button @click="actOnGroups">nowa grupa</button
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

.group-actions {
  position: fixed;
  bottom: 10%;
  left: 0;
  right: 0;
}
</style>
