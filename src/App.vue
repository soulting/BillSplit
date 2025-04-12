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
import JoinGroup from "./components/JoinGroup.vue";
import insertUserEvent from "./utils/insertUserEvent.js";

const user = ref({
  userId: null,
  status: "waiting",
  groups: [],
  curretGroup: null,
  currentPage: "yourGroups",
});

const showGroupActions = ref(false);
const showJoinGroupContainer = ref(false);

const myEvents = ref(null);

function joinGroup(group_name, group_password) {
  insertUserEvent(group_name);
}

function returnToDashboard() {
  user.value.currentPage = "yourGroups";
  user.value.curretGroup = null;
}

function joinGroupAction() {
  showGroupActions.value = !showGroupActions.value;
  showJoinGroupContainer.value = true;
}

async function getGroupDetails(groupID) {
  getGroup(user, groupID);
}

async function signOut() {
  actOnGroups();
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
  showJoinGroupContainer.value = false;
}

async function handleSuccessfullLogin() {
  checkIfLogedIn(user);
}

onMounted(async () => {
  checkIfLogedIn(user);
});
</script>

<template>
  <AuthUseer
    v-if="user.status === 'loggedOut'"
    @loginSuccess="handleSuccessfullLogin"
  />

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

    <GroupActions
      v-if="showGroupActions"
      class="group-actions"
      :joinGroupAction="joinGroupAction"
    />
    <JoinGroup
      v-if="showJoinGroupContainer"
      class="group-actions"
      :joinGroup="joinGroup"
    />

    <nav>
      <button @click="actOnGroups">
        <img src="./assets/group.png" alt="actions-button" /></button
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
