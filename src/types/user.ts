export interface Web3User {
    wallet_address: string;
    ens_name?: string;
    avatar_url?: string;
    created_at: string;
    last_login: string;
    total_xp: number;
    level: number;
    current_streak: number;
    achievements: string[];
}