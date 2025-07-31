// app/trading/page.tsx
'use client'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import TradingSimulator from '@/components/TradingSimulator'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Trading() {
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

    return <TradingSimulator />
}