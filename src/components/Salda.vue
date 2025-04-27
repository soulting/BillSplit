<script setup>
import { ref } from "vue";

const props = defineProps({
  users: Object,
});
</script>

<template>
  <div>{{ users }}</div>
</template>

<style scoped></style>
