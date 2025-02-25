import data from "./data/exchange-rate.json";

export default defineEventHandler(() => {
  return {
    success: true,
    data,
  };
});
