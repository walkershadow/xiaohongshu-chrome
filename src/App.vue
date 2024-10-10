<script setup>
import { ref } from 'vue';
import SearchForm from './components/SearchForm.vue';
import ResultsList from './components/ResultsList.vue';

const searchResults = ref([]);
const isLoading = ref(false);

const handleSearch = async (query) => {
  isLoading.value = true;
  try {
    const response = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = response[0];
    const results = await chrome.tabs.sendMessage(tab.id, { action: 'search', query });
    searchResults.value = results;
  } catch (error) {
    console.error('Error searching:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h1>Xiaohongshu Search</h1>
    <SearchForm @search="handleSearch" />
    <ResultsList :results="searchResults" :loading="isLoading" />
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}
</style>