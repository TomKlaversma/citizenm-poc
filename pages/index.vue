<template>
  <div class="container">
    <h1>{{ offersCount }} available hotels in Europe</h1>

    <div class="toolbar">Currency: <CurrencySelect /></div>

    <div class="hotel-cards">
      <HotelCard
        v-for="(hotel, index) in offers"
        :key="hotel.name"
        :hotel="hotel"
        :image="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: offers } = await useFetch("/api/offers");

const offersCount = computed(() => offers.value?.length);
</script>

<style scoped lang="scss">
.hotel-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}
</style>
