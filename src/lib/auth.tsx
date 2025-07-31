// lib/auth.tsx
import { supabase } from './supabase';
import { Web3User } from '@/types/user';

export class Web3Auth {
    static async getOrCreateUser(walletAddress: string, ensName?: string): Promise<Web3User> {
        // Check if user exists
        const { data: existingUser, error } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', walletAddress.toLowerCase())
            .single();

        if (existingUser && !error) {
            // Update last login
            await supabase
                .from('users')
                .update({ last_login: new Date().toISOString() })
                .eq('wallet_address', walletAddress.toLowerCase());

            return existingUser;
        }

        // Create new user
        const newUser: Omit<Web3User, 'created_at'> = {
            wallet_address: walletAddress.toLowerCase(),
            ens_name: ensName,
            last_login: new Date().toISOString(),
            total_xp: 0,
            level: 1,
            current_streak: 0,
            achievements: [],
        };

        const { data: createdUser, error: createError } = await supabase
            .from('users')
            .insert(newUser)
            .select()
            .single();

        if (createError) {
            throw new Error(`Failed to create user: ${createError.message}`);
        }

        return createdUser;
    }

    static async updateUserProgress(walletAddress: string, xpGain: number) {
        const { data: user } = await supabase
            .from('users')
            .select('total_xp, level')
            .eq('wallet_address', walletAddress.toLowerCase())
            .single();

        if (user) {
            const newXp = user.total_xp + xpGain;
            const newLevel = Math.floor(newXp / 1000) + 1; // 1000 XP per level

            await supabase
                .from('users')
                .update({
                    total_xp: newXp,
                    level: newLevel,
                    last_login: new Date().toISOString()
                })
                .eq('wallet_address', walletAddress.toLowerCase());
        }
    }
}