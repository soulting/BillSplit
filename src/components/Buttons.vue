<script setup>
import { ref } from "vue";
const prop = defineProps({
  image,
});
</script>

<template>
  <div class="button-container">
    <img src="" alt="button icon" />
    <div class="button-information">
      <h3>{{}}</h3>
    </div>
    <button>
      <img src="../assets/right-arrow.png" alt="" />
    </button>
  </div>
</template>

<style scoped></style>
