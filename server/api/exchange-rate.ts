import data from "./data/exchange-rate.json";

export default defineEventHandler((event) => {
  return {
    success: true,
    data,
  };
});
