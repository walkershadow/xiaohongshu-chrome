<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const handleSubmit = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Enter search query"
      required
    />
    <button type="submit">Search</button>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex-grow: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #ff2442;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

button:hover {
  background-color: #e60026;
}
</style>