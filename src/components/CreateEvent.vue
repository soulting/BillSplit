<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  createEvent: {
    type: Function,
  },
});

const alert = {
  title: "Błąd",
  text: "Grupa o takiej nazwie już istnieje",
  icon: "error",
  confirmButtonText: "OK",
  background: "#373737",
  confirmButtonColor: "#2d2d2d",
  color: "#ffffff",
};

const eventName = ref("");
const password = ref("");
const repeatPassword = ref("");
const even_icon = ref("src/assets/default.png");

function createEventHandler() {
  if (password.value.length < 5) {
    Swal.fire({ ...alert, text: "Hasło jest za krótkie" });
    return;
  }
  if (password.value !== repeatPassword.value) {
    Swal.fire({ ...alert, text: "Hasła się różnią" });
    return;
  }
  props.createEvent(eventName.value, password.value, even_icon.value);
  eventName.value = "";
  password.value = "";
  repeatPassword.value = "";
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
