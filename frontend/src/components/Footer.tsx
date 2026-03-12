'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useI18n } from '@/i18n'

const footerLinks = {
  product: [
    { href: '/products' },
    { href: '/pricing' },
    { href: '/#features' },
    { href: '/docs' },
  ],
  company: [
    { href: '/about' },
    { href: '/blog' },
    { href: '/careers' },
    { href: '/contact' },
  ],
  legal: [
    { href: '/privacy' },
    { href: '/terms' },
    { href: '/aup' },
    { href: '/sla' },
  ],
}

export function Footer() {
  const { locale } = useI18n()
  const isJa = locale === 'ja'

  const labels = {
    product: {
      title: isJa ? '製品' : 'Product',
      items: isJa 
        ? ['GPUベアメタル', '料金', '特长', 'API']
        : ['GPU Servers', 'Pricing', 'Features', 'API']
    },
    company: {
      title: isJa ? '会社情報' : 'Company',
      items: isJa 
        ? ['会社情報', 'ブログ', '採用', 'お問い合わせ']
        : ['About', 'Blog', 'Careers', 'Contact']
    },
    legal: {
      title: isJa ? '法的情報' : 'Legal',
      items: isJa 
        ? ['プライバシーポリシー', '利用規約', '使用方法', 'SLA']
        : ['Privacy Policy', 'Terms of Service', 'Acceptable Use', 'SLA']
    }
  }

  return (
    <footer className="bg-surface-card border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-text-secondary mb-6 max-w-sm">
              {isJa 
                ? '株式会社電コネ：GPUコンピューティングソリューション'
                : 'Enterprise GPU cloud platform for AI developers.'
              }
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/dencone" target="_blank" rel="noopener" className="text-text-secondary hover:text-accent">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/dencone" target="_blank" rel="noopener" className="text-text-secondary hover:text-accent">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/dencone" target="_blank" rel="noopener" className="text-text-secondary hover:text-accent">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:business@dencone.com" className="text-text-secondary hover:text-accent">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{labels.product.title}</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, i) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-accent">
                    {labels.product.items[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{labels.company.title}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-accent">
                    {labels.company.items[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{labels.legal.title}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, i) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-secondary hover:text-accent">
                    {labels.legal.items[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-surface-border my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary text-sm">
          <p>© 2026 DENCONE. {isJa ? '全著作権所有。' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}
