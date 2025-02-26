<template>
  <div class="hotel-card">
    <img class="hotel-card__image" :src="randomImage" />
    <div class="hotel-card__available-label">Available</div>
    <div class="hotel-card__content">
      <h2 class="hotel-card__title">{{ hotel.name }}</h2>
      <p>{{ hotel.description }}</p>
      <div class="hotel-card__lowest-offer">
        <span>rooms available<br />from</span>
        <span class="hotel-card__lowest-offer-price">
          {{ lowestOfferPrice }}
        </span>
      </div>
      <a href="#" class="hotel-card__cta">view rates</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCurrency from "~/composables/useCurrency";

// Assets
import image_1 from "~/assets/img/amsterdam.avif";
import image_2 from "~/assets/img/copenhagen.jpg";
import image_3 from "~/assets/img/glasgow.jpg";
import image_4 from "~/assets/img/london.jpg";
import image_5 from "~/assets/img/rome.webp";
import image_6 from "~/assets/img/rotterdam.jpg";
import image_7 from "~/assets/img/zurich.jpg";

const { createReactivePriceByQuery } = await useCurrency();

const props = defineProps<{
  hotel: Hotel;
  image: number;
}>();

// Grab a random image from the images array
const randomImage = computed(() => {
  const images = [
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    image_7,
  ];

  return images[props.image % images.length];
});

// Grab the lowest offer price from the hotel offers array
const lowestOffer = computed(() =>
  props.hotel.offers.reduce(
    (lowest: number, offer: Offer) => Math.min(lowest, offer.price),
    props.hotel.offers[0].price
  )
);

// Create a reactive price that is linked to the currency in the query
const lowestOfferPrice = createReactivePriceByQuery(
  lowestOffer.value,
  props.hotel.locale.currency
);
</script>

<style scoped lang="scss">
.hotel-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 0.25rem;

  &__image {
    width: 100%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 16 / 9;
  }

  &__available-label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: var(--secondary-green);
    color: var(--primary-white);
    padding: 0.125rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  }

  &__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
  }

  &__title {
    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  &__description {
    margin-bottom: 1rem;
  }

  &__lowest-offer {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 400;
    justify-content: space-between;
    font-size: 0.875rem;
    background: var(--light-gray-surface);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    margin-top: auto;
  }

  &__lowest-offer-price {
    font-size: 1.5rem;
  }

  &__cta {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem 1rem;
    background-color: var(--primary-red);
    color: var(--primary-white);
    border-radius: 0.25rem;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.25rem;
  }
}
</style>
