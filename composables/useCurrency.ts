export default async () => {
  const route = useRoute();
  const { data: exchangeRates } = await useFetch("/api/exchange-rate");

  const createReactivePriceByQuery = (
    amount: number,
    baseCurrencyKey: string
  ) =>
    computed(() => {
      const queryCurrencyKey = route.query.currency as string;

      const info = exchangeRates.value?.find(
        ({ base }) => base === baseCurrencyKey
      );

      if (!info) return amount;

      const currencyKey =
        queryCurrencyKey === "Local" ? baseCurrencyKey : queryCurrencyKey;

      const newAmount =
        info.rates[currencyKey as keyof typeof info.rates] * amount;

      const formatted = newAmount.toLocaleString("en-US", {
        style: "currency",
        currency: currencyKey,
      });

      return formatted;
    });

  return {
    createReactivePriceByQuery,
  };
};
