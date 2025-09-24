// Database operations for dadapay
// This file handles all database interactions replacing static data files

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string; // This maps to cover_url in database
  category: string; // This will be resolved from category_id
  readTime: number;
  author: string; // This will be resolved from author_id  
  publishedAt: string;
  status: 'draft' | 'review' | 'published' | 'archived';
}

export interface Profile {
  id: string;
  user_id: string;
  auth_user_id?: string;
  username: string;
  role: 'admin' | 'editor' | 'analyst' | 'user';
  avatar_url?: string;
  bio?: string;
  tokens: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Database connection utility - using direct PostgreSQL queries for now
// In a production app, you'd use Drizzle ORM or similar

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn('DATABASE_URL not found, using mock data');
}

// Mock data fallback for development
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Welcome to dadapay - Your Gateway to Earning While Reading',
    slug: 'welcome-to-dadapay',
    excerpt: 'Discover how dadapay revolutionizes news consumption by rewarding readers with tokens for engaging with quality journalism.',
    content: 'Welcome to dadapay, the revolutionary platform that transforms how you consume news and information...',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    category: 'Technology',
    readTime: 3,
    author: 'dadapay Team',
    publishedAt: 'Today',
    status: 'published'
  }
];

const mockCategories: Category[] = [
  { id: '1', name: 'Politics', description: 'Political news and analysis' },
  { id: '2', name: 'Technology', description: 'Tech news, startups, and innovation' },
  { id: '3', name: 'Sports', description: 'Sports news and updates' },
  { id: '4', name: 'Business', description: 'Business and economic news' },
  { id: '5', name: 'Entertainment', description: 'Entertainment and celebrity news' }
];

export class DatabaseService {
  // Article operations
  static async getArticles(): Promise<Article[]> {
    try {
      // For now, return mock data. In full implementation, this would query the database
      // const response = await fetch('/api/articles');
      // return await response.json();
      return mockArticles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return mockArticles;
    }
  }

  static async getArticle(slug: string): Promise<Article | null> {
    try {
      const articles = await this.getArticles();
      return articles.find(article => article.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }

  // Category operations
  static async getCategories(): Promise<Category[]> {
    try {
      return mockCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return mockCategories;
    }
  }

  // Profile operations  
  static async getProfile(userId: string): Promise<Profile | null> {
    try {
      // This would query the database for the user's profile
      // For now, return mock data
      return {
        id: '1',
        user_id: userId,
        username: 'demo_user',
        role: 'user',
        tokens: 1250,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  static async updateTokens(userId: string, tokens: number): Promise<boolean> {
    try {
      // This would update the user's token balance in the database
      console.log(`Updating tokens for user ${userId}: ${tokens}`);
      return true;
    } catch (error) {
      console.error('Error updating tokens:', error);
      return false;
    }
  }
}