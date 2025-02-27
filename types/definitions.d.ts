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
    currency: Currency;
    language: string;
  };
  offers: Offer[];
}

interface ExchangeRate {
  base: string;
  rates: {
    [key: string]: number;
  };
}
