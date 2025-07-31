// app/courses/page.tsx
'use client'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CoursesPage from '@/components/CoursesPage'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Courses() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/')
        }
    }, [user, loading, router])

    if (loading) {
        return <LoadingSpinner />
    }

    if (!user) {
        return <LoadingSpinner />
    }

    return <CoursesPage />
}