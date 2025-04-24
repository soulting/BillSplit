<script setup>
import { onMounted, ref } from "vue";
import supabase from "./utils/supabase.js";
import AuthUseer from "./components/AuthUseer.vue";
import checkIfLogedIn from "./utils/checkLoginStatus.js";
import Dashboard from "./components/Dashboard.vue";
import insertEvent from "./utils/insertEvent.js";
import EventActions from "./components/EventActions.vue";
import getEvent from "./utils/getEvent.js";
import EventDetails from "./components/EventDetails.vue";
import JoinEvent from "./components/JoinEvent.vue";
import insertUserEvent from "./utils/insertUserEvent.js";
import CreateEvent from "./components/CreateEvent.vue";
import getEvents from "./utils/getEvents.js";
import getInnerEventData from "./utils/getEventData.js";

const user = ref({
  userId: null,
  username: null,
  status: "waiting",
  events: [],
  curretEvent: null,
  currentPage: "yourEvents",
});

function subscribeToUserEvents() {
  const changes = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
      },
      (payload) => getEvents(user)
    )
    .subscribe();
}

function loadInnerEventData() {
  getInnerEventData(user.value.curretEvent.event_id);
}

const showEventActions = ref(false);
const showJoinEventContainer = ref(false);
const showCreateEventContainer = ref(false);

const myEvents = ref(null);

function joinEvent(event_name, event_password) {
  insertUserEvent(user, event_name, event_password);
  showEventActions.value = false;
  showJoinEventContainer.value = false;
}

function createEvent(event_name, event_password, even_icon) {
  insertEvent(user, event_name, event_password, even_icon);
  showEventActions.value = false;
  showCreateEventContainer.value = false;
}

function returnToDashboard() {
  user.value.currentPage = "yourEvents";
  user.value.curretEvent = null;
}

function joinEventAction() {
  showEventActions.value = !showEventActions.value;
  showJoinEventContainer.value = true;
}

function createEventAction() {
  showEventActions.value = !showEventActions.value;
  showCreateEventContainer.value = true;
}

async function getEventDetails(eventID) {
  getEvent(user, eventID);
}

async function signOut() {
  actOnEvents();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Błąd wylogowania:", error.message);
  } else {
    console.log("Wylogowano.");
  }
  checkIfLogedIn(user);
}

function actOnEvents() {
  showEventActions.value = !showEventActions.value;
  showJoinEventContainer.value = false;
  showCreateEventContainer.value = false;
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

  <div class="content-container" v-if="user.status === 'loggedIn'">
    <div class="upper-banner">
      <h2>Witaj {{ user.username }}</h2>
    </div>
    <Dashboard
      v-if="user.currentPage === 'yourEvents'"
      :events="user.events"
      :getEventDetails="getEventDetails"
      :subscribeToUserEvents="subscribeToUserEvents"
    />
    <EventDetails
      v-if="user.currentPage === 'eventDetails'"
      :returnToDashboard="returnToDashboard"
      :curretEvent="user.curretEvent"
      :loadInnerEventData="loadInnerEventData"
    />

    <EventActions
      v-if="showEventActions"
      class="event-actions"
      :joinEventAction="joinEventAction"
      :createEventAction="createEventAction"
    />
    <JoinEvent
      v-if="showJoinEventContainer"
      class="event-actions"
      :joinEvent="joinEvent"
    />
    <CreateEvent
      v-if="showCreateEventContainer"
      class="event-actions"
      :createEvent="createEvent"
    />

    <nav>
      <button @click="actOnEvents">
        <img src="./assets/event.png" alt="actions-button" />
      </button>
      <!-- <button @click="signOut"> -->
      <button @click="signOut">
        <img src="./assets/logout.png" alt="logout-button" />
      </button>
    </nav>
  </div>
</template>

<style>
#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(55, 55, 55);
}

.upper-banner {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  height: 80px;
  background-color: rgb(45, 45, 45);
  z-index: 1;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
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

.event-actions {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
}

.content-container {
  width: 80%;
  margin-top: 100px;
}
</style>
