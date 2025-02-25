import data from "./data/offers.json";

export default defineEventHandler((event) => {
  return {
    success: true,
    data,
  };
});
