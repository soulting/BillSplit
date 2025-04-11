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

const returnToDashboard = () => {
  console.log("asdfasdfa");
  user.value.currentPage = "yourGroups";
  user.value.curretGroup = null;
};

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
    <GroupDetails
      v-if="user.currentPage === 'groupDetails'"
      :returnToDashboard="returnToDashboard"
      :curretGroup="user.curretGroup"
    />

    <GroupActions class="group-actions" v-if="showGroupActions" />

    <nav>
      <button @click="actOnGroups">
        <img src="./assets/group.png" alt="logout-button" /></button
      ><button @click="signOut">
        <img src="./assets/logout.png" alt="logout-button" />
      </button>
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
  background-color: rgb(55, 55, 55);
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
  /* border-color: white; */
  /* border: solid 1px; */
  background-color: rgb(45, 45, 45);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

nav button {
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

button img {
  height: 100%;
  width: auto;
}

.group-actions {
  position: fixed;
  bottom: 10%;
  left: 0;
  right: 0;
}
</style>
