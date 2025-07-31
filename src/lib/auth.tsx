// lib/auth.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase, Profile } from './supabase'

interface AuthContextType {
    user: User | null
    profile: Profile | null
    session: Session | null
    loading: boolean
    signOut: () => Promise<void>
    updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    signOut: async () => {},
    updateProfile: async () => {}
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchProfile(session.user.id)
            }
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
            setSession(session)
            setUser(session?.user ?? null)

            if (session?.user) {
                await fetchProfile(session.user.id)
            } else {
                setProfile(null)
            }
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error && error.code === 'PGRST116') {
                // Profile doesn't exist, create one
                const newProfile = {
                    id: userId,
                    username: user?.email?.split('@')[0] || 'user',
                    full_name: user?.user_metadata?.full_name || '',
                    avatar_url: user?.user_metadata?.avatar_url || '',
                }

                const { data: createdProfile, error: createError } = await supabase
                    .from('profiles')
                    .insert([newProfile])
                    .select()
                    .single()

                if (!createError) {
                    setProfile(createdProfile)
                }
            } else if (data) {
                setProfile(data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error)
        }
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user || !profile) return

        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id)
                .select()
                .single()

            if (error) throw error
            setProfile(data)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            session,
            loading,
            signOut,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}