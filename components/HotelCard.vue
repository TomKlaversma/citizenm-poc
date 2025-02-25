<template>
  <div class="hotel-card">
    <img class="hotel-card__image" :src="randomImage" />
    <div class="hotel-card__available-label">Available</div>
    <div class="hotel-card__content">
      <h2 class="hotel-card__name">{{ hotel.name }}</h2>
      <p class="hotel-card__description">{{ hotel.description }}</p>
      <p class="hotel-card__currency">{{ hotel.locale.currency }}</p>
      <p class="hotel-card__offers">{{ hotel.offers }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import image_1 from "~/assets/img/amsterdam.avif";
import image_2 from "~/assets/img/copenhagen.jpg";
import image_3 from "~/assets/img/glasgow.jpg";
import image_4 from "~/assets/img/london.jpg";
import image_5 from "~/assets/img/rome.webp";
import image_6 from "~/assets/img/rotterdam.jpg";
import image_7 from "~/assets/img/zurich.jpg";

defineProps<{
  hotel: Hotel;
}>();

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

  return images[Math.floor(Math.random() * images.length)];
});
</script>

<style scoped lang="scss">
.hotel-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid #ccc;

  &__available-label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: rgb(15, 192, 127);
    color: #fff;
    padding: 0.125rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
  }

  &__content {
    padding: 1rem;
  }
}
</style>
