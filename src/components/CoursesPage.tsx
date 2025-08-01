'use client'
import { useState, useEffect } from 'react'
import { Web3Auth } from '@/lib/auth'
import {supabase, Database, setUserContext} from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Navigation from './Navigation'
import Link from 'next/link'
import { BookOpen, Clock, Trophy, Star } from 'lucide-react'

export default function CoursesPage() {
    // const {walletAddress } = Web3Auth();
    const [courses, setCourses] = useState<Database[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            // await setUserContext(walletAddress)
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('is_published', true)
                .order('order_index')

            if (error) throw error
            setCourses(data || [])
        } catch (error) {
            console.error('Error fetching courses:', error)
        } finally {
            setLoading(false)
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'bg-green-100 text-green-800'
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800'
            case 'advanced':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navigation />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Trading Courses</h1>
                    <p className="text-gray-600 mt-2">
                        Master Hyperliquid trading with our comprehensive course library
                    </p>
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge className={getDifficultyColor(course.difficulty_level)}>
                                        {course.difficulty_level}
                                    </Badge>
                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.estimated_duration || 60} min</span>
                                    </div>
                                </div>
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Progress</span>
                                        <span>0%</span>
                                    </div>
                                    <Progress value={0} />

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Trophy className="w-4 h-4" />
                                            <span>{course.xp_reward} XP</span>
                                        </div>
                                        <Link href={`/courses/${course.id}`}>
                                            <Button size="sm">Start Course</Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {courses.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available yet</h3>
                        <p className="text-gray-500">Check back soon for new trading courses!</p>
                    </div>
                )}
            </div>
        </div>
    )
}