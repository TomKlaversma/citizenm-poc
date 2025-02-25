<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <CurrencySelect />

    <div class="">Grid here</div>
  </div>
</template>

<script setup lang="ts">
const { data: offers } = await useFetch("/api/offers");
</script>
