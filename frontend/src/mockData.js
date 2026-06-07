// Centralized mock data for the Landing page
export const navLinks = ['Home', 'Explore', 'About', 'Contact']

export const hero = {
  title: 'Travel that touches',
  accent: ' the soul.',
  subtitle:
    "Step away from the tourist path and into the heart of local life. Hand-crafted journeys designed by those who call Nepal home.",
  badge: "★ NEPAL'S #1 LOCAL DISCOVERY PLATFORM",
  heroImage:
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c2e7c1f6b315b9b3e4f8d46d1d30f7b',
  tags: ['Food', 'Culture', 'Adventure', 'Nature', 'Workshops', 'Hidden Places'],
}

export const featuredExperiences = [
  {
    id: 'exp-1',
    title: 'Hidden Newari Street Food Tour',
    host: 'Raj K.',
    reviews: '48 reviews',
    rating: '5.0',
    price: 'NPR 2,500',
    image:
      'https://images.unsplash.com/photo-1543352634-8c8f3a2b4b55?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b0b5d7f4f3d9b6a1d6a8b3a6c9e7f2a',
  },
  {
    id: 'exp-2',
    title: 'Bhaktapur Pottery Workshop',
    host: 'Maya T.',
    reviews: '122 reviews',
    rating: '4.9',
    price: 'NPR 1,800',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b6c2d3d4f7b9e1a2b4c6d7e8f9a0b1c',
  },
  {
    id: 'exp-3',
    title: 'Secret Sunrise Hike',
    host: 'Suraj B.',
    reviews: '64 reviews',
    rating: '4.8',
    price: 'NPR 3,200',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c2e7c1f6b315b9b3e4f8d46d1d30f7b',
  },
]

export const intentCategories = [
  { label: 'Adventure', key: 'adventure' },
  { label: 'Cultural', key: 'cultural' },
  { label: 'Culinary', key: 'culinary' },
  { label: 'Artisan', key: 'artisan' },
  { label: 'Wellness', key: 'wellness' },
  { label: 'History', key: 'history' },
]

export const steps = [
  {
    title: 'Discover',
    description: 'Browse through handcrafted local experiences',
  },
  {
    title: 'Explore Details',
    description: 'Read stories, host profiles, and reviews',
  },
  {
    title: 'Book Instantly',
    description: 'Secure your spot with our simple booking system',
  },
  {
    title: 'Live the Moment',
    description: 'Create memories that last a lifetime',
  },
]

export const journalEntries = [
  {
    id: 'j-1',
    name: 'Elena R.',
    meta: 'Visited Upper Dolpa, Oct 2023',
    quote:
      "HiddenPaths didn't give me a tour; they gave me a home in the mountains. Waking up to the smell of fresh juniper and tea with my host family is a memory I'll carry forever.",
  },
  {
    id: 'j-2',
    name: 'Marcus Thorne',
    meta: 'Visited Tsum Valley, May 2024',
    quote:
      'The attention to detail is staggering. Every stop felt intentional, every conversation meaningful. This is how travel is meant to be experienced—slowly.',
  },
  {
    id: 'j-3',
    name: 'Sarah Jenkins',
    meta: 'Visited Gorkha Village, Dec 2023',
    quote:
      "I've never felt so connected to a place. The cultural immersion was raw, beautiful, and deeply moving. Highly recommended.",
  },
]

export const stats = [
  { value: '159', label: 'experiences' },
  { value: '84', label: 'hosts' },
  { value: '3.2k', label: 'travelers' },
  { value: '4.9', label: 'rating' },
]

export default {
  navLinks,
  hero,
  featuredExperiences,
  intentCategories,
  steps,
  journalEntries,
  stats,
}
