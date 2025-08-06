'use client';

import { useAccount, useEnsName, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { Web3Auth } from '@/app/api/auth/auth';
import { Web3User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, TrendingUp, BookOpen } from 'lucide-react';
import {setUserContext} from "@/app/api/auth/supabase";

export function Web3Dashboard() {
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { disconnect } = useDisconnect();
    const [user, setUser] = useState<Web3User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadUser() {
            if (address && isConnected) {
                setLoading(true);
                try {
                    const userData = await Web3Auth.getOrCreateUser(address, ensName || undefined);
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to load user:', error);
                } finally {
                    setLoading(false);
                }
            }
        }

        loadUser();
    }, [address, isConnected, ensName]);

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const getXpProgress = () => {
        if (!user) return 0;
        const currentLevelXp = (user.level - 1) * 1000;
        const nextLevelXp = user.level * 1000;
        const progress = ((user.total_xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
        return Math.min(Math.max(progress, 0), 100);
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Card className="w-full max-w-md p-8 text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Welcome to Hyperliquid Academy
                        </CardTitle>
                        <p className="text-gray-600 mt-2">
                            Connect your wallet to start your derivatives trading journey
                        </p>
                    </CardHeader>
                    <CardContent>
                        <ConnectButton />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hyperliquid Academy</h1>
                        <p className="text-gray-600">Learn. Practice. Earn.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ConnectButton />
                    </div>
                </div>

                {/* User Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Level</CardTitle>
                            <Trophy className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user?.level}</div>
                            <Progress value={getXpProgress()} className="mt-2" />
                            <p className="text-xs text-gray-600 mt-1">
                                {user?.total_xp} / {user?.level ? user.level * 1000 : 1000} XP
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                            <Star className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user?.total_xp.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user?.current_streak}</div>
                            <p className="text-xs text-gray-600">days</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                            <BookOpen className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{user?.achievements.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Learning Modules - Preview */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Learning Paths
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h3 className="font-semibold">Hyperliquid Basics</h3>
                                <p className="text-sm text-gray-600 mt-1">Learn the fundamentals</p>
                                <Badge variant="secondary" className="mt-2">Beginner</Badge>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h3 className="font-semibold">Advanced Trading</h3>
                                <p className="text-sm text-gray-600 mt-1">Master complex strategies</p>
                                <Badge variant="outline" className="mt-2">Intermediate</Badge>
                            </div>
                            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <h3 className="font-semibold">Risk Management</h3>
                                <p className="text-sm text-gray-600 mt-1">Protect your capital</p>
                                <Badge variant="outline" className="mt-2">Essential</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {ensName ? ensName[0].toUpperCase() : formatAddress(address!)[0]}
                            </div>
                            <div>
                                <p className="font-semibold">
                                    {ensName || formatAddress(address!)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Member since {new Date(user?.created_at || '').toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}