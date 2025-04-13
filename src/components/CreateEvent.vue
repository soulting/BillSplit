<script setup>
import { ref } from "vue";

const props = defineProps({
  createEvent: {
    type: Function,
  },
});

const eventName = ref(null);
const password = ref(null);
const repeatPassword = ref(null);
const even_icon = ref("src/assets/default.png");

function createEventHandler() {
  if (password.value === repeatPassword.value) {
    props.createEvent(eventName.value, password.value, even_icon.value);
  }
}
</script>

<template>
  <div class="join-event-container">
    <h3>Nazwa grupy</h3>
    <input type="text" v-model="eventName" />
    <h3>Hasło</h3>
    <input type="password" v-model="password" />
    <h3>Powtórz Hasło</h3>
    <input type="password" v-model="repeatPassword" />
    <button @click="createEventHandler">Stwórz</button>
  </div>
</template>

<style scoped>
.join-event-container {
  height: 400px;
  margin-left: 10px;
  margin-right: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: rgb(55, 55, 55);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
}

.join-event-container h3 {
  margin: 10px;
}

.join-event-container input {
  height: 50px;
  width: 20rem;
  background-color: transparent;
  font-size: 22px;
  color: rgb(255, 255, 255);
  border: none;
  border-bottom: 1px solid rgb(10, 10, 10);
  outline: none;
  box-sizing: border-box;
  margin-bottom: 15px;
  padding-left: 15px;
}

.join-event-container button {
  width: 15rem;
  height: 3rem;
}
</style>
