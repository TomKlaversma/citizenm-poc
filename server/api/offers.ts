import data from "./data/offers.json";

export default defineEventHandler(() => {
  return {
    success: true,
    data,
  };
});
