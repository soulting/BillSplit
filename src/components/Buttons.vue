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
    <img :src="information.group_icon" alt="group picture" />
    <div class="group-information">
      <h3>{{ information.group_name }}</h3>
    </div>
    <button class="btn-action" @click="() => buttonAction(information.id)">
      <img class="arrow-btn" src="../assets/right-arrow-black.png" alt="" />
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  border-radius: 10px;
  height: 75px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  border: rgba(0, 0, 0, 0.5) 0.1px solid;
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
}

.group button img {
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

.group-information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 7px 15px;
  font-size: 16px;
}

h3 {
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
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
  height: 35px;
}
</style>

<!-- img, tytuł, opis, funkcję -->
