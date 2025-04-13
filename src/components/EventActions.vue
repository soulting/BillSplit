<script setup>
import { ref } from "vue";
import Buttons from "./Buttons.vue";

const props = defineProps({
  joinEventAction: {
    type: Function,
  },
  createEventAction: {
    type: Function,
  },
});

const createEvent = {
  event_icon: "src/assets/add-event.png",
  event_name: "Stwórz grupę",
};

const joinEvent = {
  event_icon: "src/assets/join.png",
  event_name: "Dołącz do grupy",
};
</script>

<template>
  <div class="event-action-container">
    <Buttons :information="createEvent" :buttonAction="createEventAction" />
    <Buttons :information="joinEvent" :buttonAction="joinEventAction" />
  </div>
</template>

<style scoped>
.event-action-container {
  height: 200px;
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
  gap: 20px;
  padding: 10px;
}
</style>
