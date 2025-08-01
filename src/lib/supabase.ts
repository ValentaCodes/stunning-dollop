// lib/supabase.ts - Updated for Web3 auth
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to set the current user context for RLS
export const setUserContext = async (walletAddress: string) => {
    await supabase.rpc('set_config', {
        config_name: 'app.current_user_wallet',
        config_value: walletAddress
    });
};

// Database types for better TypeScript support
export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    wallet_address: string;
                    ens_name: string | null;
                    avatar_url: string | null;
                    created_at: string;
                    last_login: string;
                    total_xp: number;
                    level: number;
                    current_streak: number;
                    max_streak: number;
                    achievements: string[];
                    preferences: any;
                    updated_at: string;
                };
                Insert: {
                    wallet_address: string;
                    ens_name?: string | null;
                    avatar_url?: string | null;
                    total_xp?: number;
                    level?: number;
                    current_streak?: number;
                    max_streak?: number;
                    achievements?: string[];
                    preferences?: any;
                };
                Update: {
                    ens_name?: string | null;
                    avatar_url?: string | null;
                    last_login?: string;
                    total_xp?: number;
                    level?: number;
                    current_streak?: number;
                    max_streak?: number;
                    achievements?: string[];
                    preferences?: any;
                };
            };
            courses: {
                Row: {
                    id: string;
                    title: string;
                    description: string | null;
                    difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
                    estimated_duration: number | null;
                    xp_reward: number;
                    prerequisites: string[];
                    tags: string[];
                    is_published: boolean;
                    created_at: string;
                    updated_at: string;
                };
            };
            lessons: {
                Row: {
                    id: string;
                    course_id: string;
                    title: string;
                    content: any;
                    lesson_order: number;
                    lesson_type: 'reading' | 'video' | 'interactive' | 'quiz' | 'simulation';
                    xp_reward: number;
                    estimated_duration: number | null;
                    is_published: boolean;
                    created_at: string;
                    updated_at: string;
                };
            };
            user_progress: {
                Row: {
                    id: string;
                    wallet_address: string;
                    course_id: string;
                    lesson_id: string;
                    status: 'not_started' | 'in_progress' | 'completed';
                    score: number | null;
                    time_spent: number;
                    completed_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
            };
            paper_portfolios: {
                Row: {
                    id: string;
                    wallet_address: string;
                    name: string;
                    initial_balance: number;
                    current_balance: number;
                    total_pnl: number;
                    created_at: string;
                    updated_at: string;
                };
            };
            paper_trades: {
                Row: {
                    id: string;
                    portfolio_id: string;
                    wallet_address: string;
                    symbol: string;
                    side: 'long' | 'short';
                    entry_price: number;
                    exit_price: number | null;
                    quantity: number;
                    leverage: number;
                    status: 'open' | 'closed';
                    pnl: number;
                    opened_at: string;
                    closed_at: string | null;
                    notes: string | null;
                };
            };
        };
    };
}
