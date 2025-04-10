<script setup>
import { ref } from "vue";

const props = defineProps({
  returnToDashboard: {
    type: Function,
    reqired: true,
  },
  curretGroup: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="details-con">
    <button class="back-btn" @click="() => returnToDashboard()">
      <img src="../assets/left-arrow.png" alt="backwards button" />
    </button>
    <div class="header-container">
      <img :src="`${curretGroup.group_icon}`" alt="group icon" />
      <h2>{{ curretGroup.group_name }}</h2>
    </div>
    <div class="button-container">
      <button>Wydatki</button>
      <button>Salda</button>
      <button>Zdjęcia</button>
    </div>
  </div>
</template>

<style scoped>
.details-con {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 10%;
  padding-top: 50px;
}

.header-container img {
  height: 100px;
  width: 100px;
}

.back-btn {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  left: 0;
  top: 0;
  margin-top: 10px;
  margin-left: 5px;
  padding: 0;
  padding-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn img {
  height: 25px;
  width: 25px;
}

.button-container {
  border: solid white 1px;
  background-color: white;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.button-container button {
  width: 99px;
  border-radius: 0;
}

.button-container button:hover {
  background-color: white;
  color: black;
  border: none;
}
</style>
