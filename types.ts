
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  views: number;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export enum AppRoute {
  HOME = '/',
  POST = '/post/:slug',
  CATEGORY = '/category/:slug',
  ADMIN = '/admin',
  ADMIN_EDITOR = '/admin/editor'
}
