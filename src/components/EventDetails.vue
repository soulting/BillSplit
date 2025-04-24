<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  returnToDashboard: {
    type: Function,
    reqired: true,
  },
  curretEvent: {
    type: Object,
    required: true,
  },
  loadInnerEventData: {
    type: Function,
  },
});

onMounted(() => {
  props.loadInnerEventData();
});
</script>

<template>
  <div class="details-con">
    <button class="back-btn" @click="() => returnToDashboard()">
      <img src="../assets/left-arrow.png" alt="backwards button" />
    </button>
    <div class="header-container">
      <img :src="`${curretEvent.event_icon}`" alt="event icon" />
      <h2>{{ curretEvent.event_name }}</h2>
    </div>
    <div class="button-container">
      <button>Wydatki</button>
      <button>Salda</button>
      <button>Zdjęcia</button>
    </div>
    <button class="add-expense">Dodaj wydatek</button>
  </div>
</template>

<style scoped>
.details-con {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 80px;
  padding-top: 50px;
}

.header-container img {
  height: 100px;
  width: 100px;
}

.back-btn {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 46px;
  width: 46px;
  border-radius: 23px;
  left: 0;
  top: 5%;
  margin: 0;
  padding: 0;
  padding-right: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transform: translate(25%, -50%);
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
  justify-content: space-around;
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

.add-expense {
  position: absolute;
  bottom: 20px;
}
</style>
