'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // If user is already logged in, redirect to account page
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/account')
      }
    }
    checkUser()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Get redirect URL from query param, default to /account
    const redirectTo = searchParams.get('redirectTo') || '/account'

    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        console.error('Login error:', error)
        setMessage({ type: 'error', text: error.message })
      } else {
        router.push(redirectTo)
        router.refresh()
      }
    } else {
      // Signup
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
        },
      })

      if (error) {
        console.error('Signup error:', error)
        setMessage({ type: 'error', text: error.message })
      } else {
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setMessage({ type: 'error', text: 'This email is already registered. Please sign in instead.' })
        } else {
          setMessage({
            type: 'success',
            text: 'Registration successful! Please check your email (including spam) to confirm your account.',
          })
          setPassword('')
          setTimeout(() => setIsLogin(true), 5000)
        }
      }
    }
    setLoading(false)
  }

  const handleMagicLink = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email' })
      return
    }
    setLoading(true)
    setMessage(null)
    const redirectTo = searchParams.get('redirectTo') || '/account'
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
      },
    })
    if (error) {
      console.error('Magic link error:', error)
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Magic link sent! Check your email (including spam).' })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {isLogin ? 'Sign in to Voltream' : 'Create a Voltream account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={isLogin ? "Password" : "Password (min. 6 characters)"}
              />
            </div>
          </div>

          {message && (
            <div
              className={`text-sm ${
                message.type === 'error'
                  ? 'text-red-600'
                  : message.type === 'success'
                  ? 'text-green-600'
                  : 'text-blue-600'
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
            </button>
          </div>
        </form>

        {isLogin && (
          <div className="text-center">
            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="text-sm text-orange-600 hover:text-orange-500"
            >
              Send magic link instead
            </button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage(null)
            }}
            className="text-sm text-orange-600 hover:text-orange-500"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {isLogin && (
          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-500">
              Forgot your password?
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}