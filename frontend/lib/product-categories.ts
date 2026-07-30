export type ProductCategory = {
  title: string;
  description: string;
};

export const ProductCategories: ProductCategory[] = [
  {
    title: 'Smartphones',
    description:
      'Discover premium smartphones with smart pricing, quick add-to-cart controls, and a seamless shopping experience.',
  },
  {
    title: 'Laptops & Notebooks',
    description:
      'Explore powerful laptops and notebooks built for work, gaming, creativity, and everyday productivity.',
  },
  {
    title: 'Desktop & Computers',
    description:
      'Find high-performance desktops and computer systems designed for professionals, gamers, and home users.',
  },
  {
    title: 'Tablets',
    description:
      'Browse lightweight tablets that deliver the perfect balance of entertainment, learning, and productivity.',
  },
  {
    title: 'Televisions',
    description:
      'Upgrade your entertainment with stunning smart TVs featuring vibrant displays and immersive viewing experiences.',
  },
  {
    title: 'Microphones',
    description:
      'Choose professional microphones that capture crystal-clear audio for streaming, gaming, podcasts, and recording.',
  },
  {
    title: 'Fitness Trackers',
    description:
      'Monitor your health and fitness goals with advanced trackers offering accurate insights and all-day comfort.',
  },
  {
    title: 'Headphones & Earphones',
    description:
      'Experience rich sound and lasting comfort with premium headphones and earphones for every lifestyle.',
  },
  {
    title: 'Portable Bluetooth Speakers',
    description:
      'Take your music anywhere with powerful Bluetooth speakers delivering immersive sound and reliable wireless connectivity.',
  },
  {
    title: 'Wi-Fi Routers & Modems',
    description:
      'Stay connected with high-speed Wi-Fi routers and modems built for stable coverage, faster streaming, and seamless browsing.',
  },
];

export const createCategorySlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
