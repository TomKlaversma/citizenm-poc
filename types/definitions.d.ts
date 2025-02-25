interface Offer {
  name: string;
  description: string;
  price: number;
}

interface Hotel {
  name: string;
  description: string;
  image: string;
  locale: {
    currency: string;
    language: string;
  };
  offers: Offer[];
}
