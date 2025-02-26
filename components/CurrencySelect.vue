<template>
  <div>
    <select v-if="currencyOptions" @change="updateCurrencyParam">
      <option
        v-for="currency in currencyOptions"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
const { query } = useRoute();
const router = useRouter();
const { data: exchangeRate } = await useFetch("/api/exchange-rate");

const currencyOptions = computed(() => {
  if (!exchangeRate.value) return [];
  const currencies = exchangeRate.value.map((item) => item.base);
  return ["Local", ...currencies];
});

const updateCurrencyParam = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) return;

  // Update the route
  router.replace({
    query: {
      ...query,
      currency: event.target.value,
    },
  });
};
</script>
