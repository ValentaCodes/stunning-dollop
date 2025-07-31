'use client'
import { useAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Navigation from './Navigation'
import Link from 'next/link'
import { BookOpen, TrendingUp, Trophy, Target, Flame, DollarSign } from 'lucide-react'

export default function Dashboard() {
    const { profile } = useAuth()

    if (!profile) return null

    const progressToNextLevel = ((profile.total_xp % 1000) / 1000) * 100

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {profile.username || 'Trader'}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Ready to continue your trading education journey?
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{profile.level}</div>
                            <Progress value={progressToNextLevel} className="mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">
                                {profile.total_xp % 1000} / 1000 XP to next level
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{profile.total_xp.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                Experience points earned
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                            <Flame className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{profile.current_streak}</div>
                            <p className="text-xs text-muted-foreground">
                                Days in a row • Best: {profile.longest_streak}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Paper Trading P&L</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${profile.total_pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${profile.total_pnl.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {profile.total_trades} trades • {profile.profitable_trades} profitable
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BookOpen className="w-5 h-5" />
                                <span>Continue Learning</span>
                            </CardTitle>
                            <CardDescription>
                                Pick up where you left off in your trading education
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Hyperliquid Basics</p>
                                        <p className="text-sm text-gray-500">Lesson 3 of 8</p>
                                    </div>
                                    <Badge variant="secondary">In Progress</Badge>
                                </div>
                                <Link href="/courses">
                                    <Button className="w-full">Continue Course</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5" />
                                <span>Practice Trading</span>
                            </CardTitle>
                            <CardDescription>
                                Test your skills with $10,000 virtual portfolio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Portfolio Balance</p>
                                        <p className="text-sm text-gray-500">${profile.paper_trading_balance.toLocaleString()}</p>
                                    </div>
                                    <Badge variant="outline">Active</Badge>
                                </div>
                                <Link href="/trading">
                                    <Button className="w-full" variant="outline">Open Trading Sim</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Your latest learning progress and achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Trophy className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">First Trade Completed!</p>
                                    <p className="text-sm text-gray-500">You earned 50 XP • 2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Completed: Understanding Leverage</p>
                                    <p className="text-sm text-gray-500">You earned 100 XP • 1 day ago</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Target className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Level Up!</p>
                                    <p className="text-sm text-gray-500">Reached level {profile.level} • 2 days ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
