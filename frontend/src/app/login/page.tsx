'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n } from '@/i18n'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()
  const { locale } = useI18n()
  const isJa = locale === 'ja'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || (isJa ? 'ログインに失敗しました。' : 'Login failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{isJa ? 'ログイン' : 'Welcome Back'}</h1>
          <p className="text-text-secondary">{isJa ? 'DENCONEアカウントにログイン' : 'Sign in to your DENCONE account'}</p>
        </div>

        <div className="card">
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-error/10 border border-error/30 text-error">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{isJa ? 'メールアドレス' : 'Email'}</label>
              <div className="relative">
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-24"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{isJa ? 'パスワード' : 'Password'}</label>
              <div className="relative">
                
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-24"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2"
            >
              {loading ? (isJa ? 'ログイン中...' : 'Signing in...') : (isJa ? 'ログイン' : 'Sign In')}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-text-secondary">
            {isJa ? 'アカウントをお持ちでない方' : "Don't have an account?"}{' '}
            <Link href="/register" className="text-accent hover:underline">
              {isJa ? '新規登録' : 'Sign up'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
