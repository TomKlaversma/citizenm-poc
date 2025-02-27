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
import useCurrency from "~/composables/useCurrency";

const { exchangeRates } = await useCurrency();
const { query } = useRoute();
const router = useRouter();

const currencyOptions = computed(() => {
  if (!exchangeRates.value) return [];
  const currencies = exchangeRates.value.map((item) => item.base);
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
