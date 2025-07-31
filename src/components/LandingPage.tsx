// components/LandingPage.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { BookOpen, TrendingUp, Trophy, Zap, Users, Target } from 'lucide-react'

export default function LandingPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/dashboard`,
                },
            })

            if (error) throw error
            setMessage('Check your email for the login link!')
        } catch (error: any) {
            setMessage('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const features = [
        {
            icon: BookOpen,
            title: 'Interactive Learning',
            description: 'Master Hyperliquid trading through hands-on lessons and real-world scenarios'
        },
        {
            icon: TrendingUp,
            title: 'Paper Trading',
            description: 'Practice with $10,000 virtual portfolio using real market data'
        },
        {
            icon: Trophy,
            title: 'Gamified Progress',
            description: 'Earn XP, unlock achievements, and climb the leaderboards'
        },
        {
            icon: Zap,
            title: 'Real-time Challenges',
            description: 'Compete in trading challenges and learn from the community'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Learn from expert traders and share your knowledge'
        },
        {
            icon: Target,
            title: 'Skill-based Path',
            description: 'Progress from beginner to advanced with personalized learning tracks'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hyperliquid</span> Trading
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Learn derivatives trading through gamified education, practice with paper trading,
                        and join a community of traders mastering the future of DeFi.
                    </p>


                    {/* Sign In Form */}
                    <Card className="max-w-md mx-auto mb-16">
                        <CardHeader>
                            <CardTitle>Start Learning Today</CardTitle>
                            <CardDescription>
                                Sign in with your email to begin your trading education journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Sending...' : 'Get Started Free'}
                                </Button>
                                {message && (
                                    <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                                        {message}
                                    </p>
                                )}
                            </form>
                        </CardContent>
                    </Card>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <Card key={index} className="text-left hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}