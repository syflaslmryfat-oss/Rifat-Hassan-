
import { Post, Category } from './types';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', description: 'The latest in tech innovations.', image: 'https://picsum.photos/seed/tech/800/600' },
  { id: '2', name: 'Lifestyle', slug: 'lifestyle', description: 'Curating the modern experience.', image: 'https://picsum.photos/seed/life/800/600' },
  { id: '3', name: 'Design', slug: 'design', description: 'Aesthetics and creative systems.', image: 'https://picsum.photos/seed/design/800/600' },
  { id: '4', name: 'Business', slug: 'business', description: 'Strategies for global impact.', image: 'https://picsum.photos/seed/business/800/600' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of AI in Creative Industries',
    slug: 'future-of-ai-creative',
    excerpt: 'How generative models are redefining what it means to be a creator in the 21st century.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
    author: {
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
      bio: 'Design lead at Lumina, obsessed with minimalist architecture and AI systems.',
      role: 'Senior Editor'
    },
    category: 'Technology',
    tags: ['AI', 'Future', 'Tech'],
    featuredImage: 'https://picsum.photos/seed/ai-future/1200/800',
    publishedAt: '2024-05-15',
    isFeatured: true,
    views: 1240
  },
  {
    id: '2',
    title: 'Minimalism: More Than Just an Aesthetic',
    slug: 'minimalism-aesthetic',
    excerpt: 'Exploring the philosophy of less in an age of overwhelming digital noise.',
    content: 'The core of minimalism is not about owning nothing, but about making room for everything that matters...',
    author: {
      name: 'David Chen',
      avatar: 'https://picsum.photos/seed/david/100/100',
      bio: 'Lifestyle coach and minimalist enthusiast.',
      role: 'Contributor'
    },
    category: 'Lifestyle',
    tags: ['Minimalism', 'Philosophy'],
    featuredImage: 'https://picsum.photos/seed/min/800/600',
    publishedAt: '2024-05-12',
    isTrending: true,
    views: 890
  },
  {
    id: '3',
    title: 'The Evolution of Modern Typography',
    slug: 'evolution-typography',
    excerpt: 'Why fonts are the unsung heroes of digital communication and user experience.',
    content: 'From Gutenberg to Google Fonts, typography has undergone a radical transformation...',
    author: {
      name: 'Sarah Jenkins',
      avatar: 'https://picsum.photos/seed/sarah/100/100',
      bio: 'Design lead at Lumina, obsessed with minimalist architecture and AI systems.',
      role: 'Senior Editor'
    },
    category: 'Design',
    tags: ['Type', 'Fonts'],
    featuredImage: 'https://picsum.photos/seed/type/800/600',
    publishedAt: '2024-05-10',
    isTrending: true,
    views: 1540
  }
];
