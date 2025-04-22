<script setup>
import { ref } from "vue";

// Przyjmujemy 2 propsy, jeden to ogólne informacje na temat btn, a drugi to funkcja, która ma być wykonana podczas wciśnięca btn
const props = defineProps({
  information: {
    type: Object,
    required: true,
  },
  buttonAction: {
    type: Function,
    required: false,
  },
});
</script>

<template>
  <div class="button-container">
    <img :src="information.event_icon" alt="event picture" />
    <div class="event-information">
      <h3>{{ information.event_name }}</h3>
    </div>
    <button class="btn-action" @click="() => buttonAction(information)">
      <img class="arrow-btn" src="../assets/right-arrow.png" alt="" />
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(45, 45, 45);
  border-radius: 10px;
  height: 75px;
  padding-left: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  user-select: none;
}

.event button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  height: 20px;
  margin: 0;
  padding: 0;
  margin-right: 15px;
}

.event button img {
  height: 100%;
  margin: 0;
  padding: 0;
}

img {
  height: 65px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}

.event-information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7px 15px;
  font-size: 16px;
}

h3 {
  margin: 0;
  color: white;
}

.btn-action {
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-action img {
  height: 40px;
}
</style>

<!-- img, tytuł, opis, funkcję -->
