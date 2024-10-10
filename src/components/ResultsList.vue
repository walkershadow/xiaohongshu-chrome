<script setup>
import { defineProps } from 'vue';

defineProps({
  results: Array,
  loading: Boolean,
});
</script>

<template>
  <div class="results-list">
    <p v-if="loading">Loading...</p>
    <div v-else-if="results.length === 0">No results found.</div>
    <ul v-else>
      <li v-for="(result, index) in results" :key="index">
        <h3>{{ result.title }}</h3>
        <p>Comments:</p>
        <ul>
          <li v-for="(comment, commentIndex) in result.comments" :key="commentIndex">
            {{ comment }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.results-list {
  max-height: 400px;
  overflow-y: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

h3 {
  margin: 0 0 10px 0;
  color: #333;
}
</style>