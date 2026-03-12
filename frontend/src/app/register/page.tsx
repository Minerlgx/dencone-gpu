'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowRight, AlertCircle, Check } from 'lucide-react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n } from '@/i18n'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register } = useAuthStore()
  const { locale } = useI18n()
  const isJa = locale === 'ja'

  const passwordChecks = [
    { met: password.length >= 8, text: isJa ? '8文字以上' : 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: isJa ? '大文字1文字以上' : 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: isJa ? '小文字1文字以上' : 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: isJa ? '数字1文字以上' : 'One number' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError(isJa ? 'パスワードが一致しません' : 'Passwords do not match')
      return
    }

    if (!passwordChecks.every(c => c.met)) {
      setError(isJa ? 'パスワード要件を満たしてください' : 'Please meet all password requirements')
      return
    }

    setLoading(true)

    try {
      await register(email, password, name)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Registration error:', err)
      const errorMsg = err.response?.data?.error || err.message || (isJa ? '登録に失敗しました。' : 'Registration failed. Please try again.')
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{isJa ? '新規登録' : 'Create Account'}</h1>
          <p className="text-text-secondary">{isJa ? 'DENCONEに登録してGPUデプロイを開始' : 'Join DENCONE and start deploying GPUs'}</p>
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
              <label className="block text-sm font-medium mb-2">{isJa ? 'お名前' : 'Name'}</label>
              <div className="relative">
                
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isJa ? 'お名前' : 'Your name'}
                  className="input pl-24"
                  required
                />
              </div>
            </div>

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

            {/* Password Requirements */}
            <div className="space-y-1 text-sm">
              {passwordChecks.map((check, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 ${
                    check.met ? 'text-success' : 'text-text-muted'
                  }`}
                >
                  <Check className={`w-4 h-4 ${check.met ? 'opacity-100' : 'opacity-30'}`} />
                  {check.text}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{isJa ? 'パスワード（確認）' : 'Confirm Password'}</label>
              <div className="relative">
                
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? (isJa ? '登録中...' : 'Creating account...') : (isJa ? '登録する' : 'Create Account')}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-text-secondary">
            {isJa ? 'すでにアカウントをお持ちの方' : 'Already have an account?'}{' '}
            <Link href="/login" className="text-accent hover:underline">
              {isJa ? 'ログイン' : 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
