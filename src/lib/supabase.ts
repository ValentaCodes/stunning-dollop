// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
    id: string
    username?: string
    full_name?: string
    avatar_url?: string
    total_xp: number
    level: number
    current_streak: number
    longest_streak: number
    paper_trading_balance: number
    total_trades: number
    profitable_trades: number
    total_pnl: number
    created_at: string
    updated_at: string
}

export interface Course {
    id: string
    title: string
    description?: string
    difficulty_level: 'beginner' | 'intermediate' | 'advanced'
    estimated_duration?: number
    xp_reward: number
    order_index?: number
    is_published: boolean
    created_at: string
    updated_at: string
}

export interface Lesson {
    id: string
    course_id: string
    title: string
    content?: any
    lesson_type: 'content' | 'quiz' | 'simulation' | 'challenge'
    order_index?: number
    xp_reward: number
    duration_minutes?: number
    created_at: string
    updated_at: string
}

export interface UserProgress {
    id: string
    user_id: string
    course_id: string
    lesson_id?: string
    status: 'not_started' | 'in_progress' | 'completed'
    progress_percentage: number
    completed_at?: string
    created_at: string
    updated_at: string
}

export interface Achievement {
    id: string
    name: string
    description?: string
    icon?: string
    category: string
    xp_reward: number
    badge_color: string
    unlock_criteria?: any
    is_active: boolean
    created_at: string
}

export interface PaperTrade {
    id: string
    user_id: string
    symbol: string
    side: 'long' | 'short'
    size: number
    entry_price: number
    exit_price?: number
    leverage: number
    margin_used: number
    pnl: number
    status: 'open' | 'closed' | 'liquidated'
    opened_at: string
    closed_at?: string
    notes?: string
}
