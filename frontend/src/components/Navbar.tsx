'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Globe } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/hooks/useAuth'
import { useI18n, useLocale } from '@/i18n'

const navLinks = [
  { href: '/products', labelKey: 'nav.products' },
  { href: '/pricing', labelKey: 'nav.pricing' },
  { href: '/about', labelKey: 'nav.about' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { t } = useI18n()
  const { locale, setLocale } = useLocale()

  const changeLanguage = (lang: 'en' | 'ja') => {
    setLocale(lang)
    setLangMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image 
                src="/company-logo.png" 
                alt="DENCONE" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl font-mono">DENCONE</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-text-secondary hover:text-accent"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm uppercase">{locale}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-surface-card border border-surface-border rounded-lg shadow-lg py-1">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-surface-hover ${
                      locale === 'en' ? 'text-accent' : 'text-text-secondary'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('ja')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-surface-hover ${
                      locale === 'ja' ? 'text-accent' : 'text-text-secondary'
                    }`}
                  >
                    日本語
                  </button>
                </div>
              )}
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-text-secondary hover:text-accent"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-border flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{user?.name || user?.email?.split('@')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface-card border border-surface-border rounded-lg shadow-lg py-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-accent hover:bg-surface-hover"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-accent hover:bg-surface-hover"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <hr className="my-2 border-surface-border" />
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-text-secondary hover:text-accent">
                  {t('nav.login')}
                </Link>
                <Link href="/register" className="btn-glow py-2 px-4 text-sm">
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-card border-t border-surface-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-text-secondary hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded ${locale === 'en' ? 'bg-accent text-primary' : 'bg-surface'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('ja')}
                className={`px-3 py-1 rounded ${locale === 'ja' ? 'bg-accent text-primary' : 'bg-surface'}`}
              >
                日本語
              </button>
            </div>
            
            <hr className="border-surface-border" />
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-text-secondary hover:text-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="block py-2 text-error"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link href="/login" className="block btn-secondary text-center">
                  {t('nav.login')}
                </Link>
                <Link href="/register" className="block btn-glow text-center">
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
