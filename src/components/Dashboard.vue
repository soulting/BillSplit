<script setup>
import { ref } from "vue";
import Buttons from "./Buttons.vue";

const props = defineProps({
  events: {
    type: Object,
    reqired: true,
  },
  getEventDetails: {
    type: Function,
  },
});
</script>

<template>
  <div class="events">
    <Buttons
      v-for="event in props.events"
      :key="event.id"
      :information="event"
      :buttonAction="getEventDetails"
    ></Buttons>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  background-color: rgb(55, 55, 55);
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 10%;
  padding: 30px;
  gap: 25px;
}
</style>
