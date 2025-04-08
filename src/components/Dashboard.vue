<script setup>
import { ref } from "vue";
import Buttons from "./Buttons.vue";

const props = defineProps({
  groups: {
    type: Object,
    reqired: true,
  },
  getGroupDetails: {
    type: Function,
  },
});
</script>

<template>
  <div class="groups">
    <Buttons
      v-for="group in props.groups"
      :key="group.id"
      :information="group"
      :buttonAction="getGroupDetails"
    ></Buttons>
  </div>
</template>

<style scoped>
.groups {
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 10%;
  padding: 30px;
  gap: 25px;
}
</style>
