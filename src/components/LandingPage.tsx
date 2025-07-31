// components/LandingPage.tsx - Updated for Web3
'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    BookOpen,
    TrendingUp,
    Trophy,
    Users,
    Zap,
    Shield,
    Target,
    Gamepad2,
    Wallet
} from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Hyperliquid Academy</h1>
                        </div>
                        <ConnectButton />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
                        🚀 Web3 Learning Platform
                    </Badge>
                    <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                        Learn. Practice.
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Earn.
            </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Master derivatives trading on Hyperliquid through gamified lessons,
                        risk-free paper trading, and earn rewards for your progress.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <ConnectButton.Custom>
                            {({ account, chain, openConnectModal, mounted }) => {
                                return (
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                                        onClick={openConnectModal}
                                    >
                                        <Wallet className="mr-2 h-5 w-5" />
                                        Connect Wallet to Start
                                    </Button>
                                )
                            }}
                        </ConnectButton.Custom>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">10+</div>
                            <div className="text-gray-600">Interactive Lessons</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">$10K</div>
                            <div className="text-gray-600">Paper Trading Balance</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">7</div>
                            <div className="text-gray-600">Achievement Badges</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Why Choose Hyperliquid Academy?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        The first gamified Web3 trading education platform designed specifically for Hyperliquid
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature Cards */}
                    <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle>Interactive Learning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Learn Hyperliquid fundamentals through engaging, interactive lessons designed by trading experts.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <CardTitle>Paper Trading</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Practice with real market data using $10,000 in paper money. No risk, real learning.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <Gamepad2 className="h-6 w-6 text-purple-600" />
                            </div>
                            <CardTitle>Gamified Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Earn XP, unlock achievements, and climb leaderboards as you master trading skills.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <Trophy className="h-6 w-6 text-yellow-600" />
                            </div>
                            <CardTitle>Achievement System</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Unlock badges and rewards as you progress through your trading education journey.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-indigo-600" />
                            </div>
                            <CardTitle>Community Driven</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Join a community of learners, share strategies, and learn from experienced traders.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-red-600" />
                            </div>
                            <CardTitle>Risk-Free Learning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">
                                Master complex strategies without risking real capital in our advanced simulation environment.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Learning Path Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Your Learning Journey
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Structured learning paths that take you from beginner to advanced trader
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Beginner</h3>
                        <p className="text-gray-600 mb-4">Learn the basics of derivatives trading and Hyperliquid platform</p>
                        <Badge variant="secondary">4 Lessons • 2 Hours</Badge>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Intermediate</h3>
                        <p className="text-gray-600 mb-4">Advanced strategies, risk management, and market analysis</p>
                        <Badge variant="outline">6 Lessons • 4 Hours</Badge>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Expert</h3>
                        <p className="text-gray-600 mb-4">Market making, algorithmic trading, and advanced techniques</p>
                        <Badge variant="outline">8 Lessons • 6 Hours</Badge>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join the future of trading education. Connect your wallet and begin your journey.
                    </p>
                    <ConnectButton.Custom>
                        {({ account, chain, openConnectModal, mounted }) => {
                            return (
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
                                    onClick={openConnectModal}
                                >
                                    <Wallet className="mr-2 h-5 w-5" />
                                    Connect Wallet Now
                                </Button>
                            )
                        }}
                    </ConnectButton.Custom>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Hyperliquid Academy</h3>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Learn, Practice, Earn - The Web3 way to master derivatives trading
                        </p>
                        <p className="text-sm text-gray-500">
                            Built for the Hyperliquid Hackathon 2024
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}