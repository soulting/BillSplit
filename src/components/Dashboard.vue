<script setup>
import { ref } from "vue";

const props = defineProps(["groups"]);
</script>

<template>
  <div class="groups">
    <div class="group" v-for="group in props.groups" :key="group.id" @click="">
      <img :src="group.group_icon" alt="group picture" />
      <div class="group-information">
        <h3>{{ group.group_name }}</h3>
      </div>
      <button>
        <img src="../assets/right-arrow.png" alt="" />
      </button>
    </div>
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
.group {
  display: flex;
  flex-direction: row;
  background: linear-gradient(45deg, #474ed7, #ce59f8);
  border-radius: 15px;
  height: 75px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: relative;
}

.group button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  height: 20px;
  margin: 0;
  padding: 0;
  margin-right: 15px;
  color: white;
}

.group button img {
  height: 100%;
  margin: 0;
  padding: 0;
}

img {
  height: 100%;
  /* background-color: white; */
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}

.group-information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7px 15px;
  font-size: 16px;
}

h3 {
  margin: 0;
}
</style>
