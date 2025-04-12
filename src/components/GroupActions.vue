<script setup>
import { ref } from "vue";
import Buttons from "./Buttons.vue";

const props = defineProps({
  joinGroupAction: {
    type: Function,
  },
});

const createGroup = {
  group_icon: "src/assets/add-group.png",
  group_name: "Stwórz grupę",
};

const joinGroup = {
  group_icon: "src/assets/join.png",
  group_name: "Dołącz do grupy",
};
</script>

<template>
  <div class="group-action-container">
    <Buttons :information="createGroup" />
    <Buttons :information="joinGroup" :buttonAction="joinGroupAction" />
  </div>
</template>

<style scoped>
.group-action-container {
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
