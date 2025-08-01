'use client'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LandingPage from '@/components/LandingPage'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  const { address, isConnected, isConnecting } = useAccount()
  const router = useRouter()

  useEffect(() => {
    // If wallet is connected, redirect to dashboard
    if (isConnected && address) {
      router.push('/dashboard')
    }
  }, [isConnected, address, router])

  // Show loading while checking wallet connection
  if (isConnecting) {
    return <LoadingSpinner />
  }

  // If connected, show loading while redirecting
  if (isConnected && address) {
    return <LoadingSpinner />
  }

  // Show landing page if not connected
  return <LandingPage />
}