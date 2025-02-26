<template>
  <div>
    <select v-if="currencyOptions" @change="updateCurrencyParam">
      <option
        v-for="currency in currencyOptions"
        :key="currency"
        :value="currency"
        :selected="currency === selectedCurrency"
      >
        {{ currency }}
      </option>
    </select>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { Currency } from "~/types/enums.";

const { query } = useRoute();
const router = useRouter();
const { data: exchangeRate } = await useFetch("/api/exchange-rate");

const currencyOptions = computed(() => {
  if (!exchangeRate.value) return [];
  const currencies = exchangeRate.value.map((item) => item.base);
  return [Currency.Local, ...currencies];
});

const selectedCurrency = computed(() => {
  const value = query.currency as string;
  return value ? (value as Currency) : Currency.Local;
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
