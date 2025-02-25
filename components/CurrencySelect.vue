<template>
  <div>
    <select v-if="currencies">
      <option v-for="currency in currencies" :value="currency">
        {{ currency }}
      </option>
    </select>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
const { data: exchangeRate } = await useFetch("/api/exchange-rate");

const currencies = computed(() =>
  exchangeRate ? exchangeRate.value?.data.map((item) => item.base) : null
);
</script>
