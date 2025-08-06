// app/courses/page.tsx
'use client'
import { Web3Auth } from '@/app/api/auth/auth'
import { useAccount} from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CoursesPage from '@/components/CoursesPage'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Courses() {
    const { user, loading } = Web3Auth.getOrCreateUser()
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