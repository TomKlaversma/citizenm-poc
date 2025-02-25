<template>
  <div class="container">
    <h1>{{ offersCount }} available hotels in Europe</h1>
    <CurrencySelect />

    <div class="hotel-cards">
      <HotelCard
        v-for="hotel in offers?.data"
        :key="hotel.name"
        :hotel="hotel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: offers } = await useFetch("/api/offers");

const offersCount = computed(() => offers.value?.data.length);
</script>

<style scoped lang="scss">
.hotel-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
