import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-ref.supabase.co' // This will be replaced by actual URL
const supabaseAnonKey = 'your-anon-key' // This will be replaced by actual key

// For development, we'll use the DATABASE_URL to extract connection details
// In production, these should be proper Supabase URL and anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'editor' | 'analyst' | 'user'
          username: string
          avatar_url?: string
          bio?: string
          tokens: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: 'admin' | 'editor' | 'analyst' | 'user'
          username: string
          avatar_url?: string
          bio?: string
          tokens?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'editor' | 'analyst' | 'user'
          username?: string
          avatar_url?: string
          bio?: string
          tokens?: number
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_url?: string
          category_id: string
          status: 'draft' | 'review' | 'published' | 'archived'
          author_id: string
          published_at?: string
          read_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_url?: string
          category_id: string
          status?: 'draft' | 'review' | 'published' | 'archived'
          author_id: string
          published_at?: string
          read_time: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_url?: string
          category_id?: string
          status?: 'draft' | 'review' | 'published' | 'archived'
          author_id?: string
          published_at?: string
          read_time?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          created_at?: string
        }
      }
      reads: {
        Row: {
          id: string
          user_id: string
          article_id: string
          started_at: string
          completed_at?: string
          duration_ms?: number
          progress_percent: number
          device_fingerprint?: string
        }
        Insert: {
          id?: string
          user_id: string
          article_id: string
          started_at?: string
          completed_at?: string
          duration_ms?: number
          progress_percent?: number
          device_fingerprint?: string
        }
        Update: {
          id?: string
          user_id?: string
          article_id?: string
          started_at?: string
          completed_at?: string
          duration_ms?: number
          progress_percent?: number
          device_fingerprint?: string
        }
      }
      reward_rules: {
        Row: {
          id: string
          rule_name: string
          amount: number
          condition_type: 'read_complete' | 'streak' | 'referral'
          daily_cap?: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          rule_name: string
          amount: number
          condition_type: 'read_complete' | 'streak' | 'referral'
          daily_cap?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          rule_name?: string
          amount?: number
          condition_type?: 'read_complete' | 'streak' | 'referral'
          daily_cap?: number
          is_active?: boolean
          created_at?: string
        }
      }
      reward_ledger: {
        Row: {
          id: string
          user_id: string
          source_type: string
          source_id: string
          amount: number
          metadata?: Record<string, any>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          source_type: string
          source_id: string
          amount: number
          metadata?: Record<string, any>
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          source_type?: string
          source_id?: string
          amount?: number
          metadata?: Record<string, any>
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          payload: Record<string, any>
          read_at?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          payload: Record<string, any>
          read_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          payload?: Record<string, any>
          read_at?: string
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          actor_id: string
          action: string
          entity_type: string
          entity_id: string
          diff?: Record<string, any>
          ip?: string
          created_at: string
        }
        Insert: {
          id?: string
          actor_id: string
          action: string
          entity_type: string
          entity_id: string
          diff?: Record<string, any>
          ip?: string
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          diff?: Record<string, any>
          ip?: string
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']