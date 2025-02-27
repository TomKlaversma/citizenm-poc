import { Currency } from "~/types/enums";

export default async () => {
  const route = useRoute();
  const { data: exchangeRates } = await useFetch("/api/exchange-rate");

  const createReactivePriceByQuery = (
    amount: number,
    baseCurrencyKey: Currency
  ) =>
    computed(() => {
      const queryValue = Array.isArray(route.query.currency)
        ? route.query.currency[0]
        : route.query.currency;

      const queryCurrencyKey: Currency =
        (queryValue as Currency) ?? Currency.Local;

      const info = exchangeRates.value?.find(
        ({ base }) => base === baseCurrencyKey
      );

      if (!info) return amount;

      const currencyKey: Currency =
        queryCurrencyKey === Currency.Local
          ? baseCurrencyKey
          : queryCurrencyKey;

      const newAmount =
        info.rates[currencyKey as keyof typeof info.rates] * amount;

      const formatted = newAmount.toLocaleString("en-US", {
        style: "currency",
        currency: currencyKey,
      });

      return formatted;
    });

  return {
    exchangeRates,
    createReactivePriceByQuery,
  };
};
