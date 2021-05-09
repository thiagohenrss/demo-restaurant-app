export interface Restaurant {
  id: string;
  name: string;
  image: string;
  logo: string;
  description: string;
  telephone: string;
  price_range: string;
  payment_methods: string;
  website: string;
  opening_hours: string;
  details: Detail;
}

export interface Detail {
  chat: string;
  call: string;
}