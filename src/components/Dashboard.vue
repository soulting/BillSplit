<script setup>
import { onMounted, ref } from "vue";
import Buttons from "./Buttons.vue";

const props = defineProps({
  events: {
    type: Object,
    reqired: true,
  },
  getEventDetails: {
    type: Function,
  },
  subscribeToUserEvents: {
    type: Function,
  },
});

onMounted(() => {
  props.subscribeToUserEvents();
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
  width: 100%;
  gap: 25px;
}
</style>
