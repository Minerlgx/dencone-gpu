'use client'

import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Shield, Globe, Users, BarChart3 } from 'lucide-react'
import { useI18n } from '@/i18n'

export default function Home() {
  const { t, locale } = useI18n()

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fadeIn">
            <span className="badge badge-accent mb-6">
              <Zap className="w-3 h-3 mr-1" />
              {locale === 'ja' ? 'H100・RTX 5090対応' : 'Now Available: NVIDIA H100 & RTX 5090'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {locale === 'ja' ? (
              <>GPUベアメタルで<br /><span className="text-gradient">生成AIを，解き放て。</span></>
            ) : (
              <>Enterprise GPU Cloud at{' '}<span className="text-gradient">Your Fingertips</span></>
            )}
          </h1>
          
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            {locale === 'ja' ? (
              <>B200・H200・H100からRTX 5090まで。日本ロケーションのベアメタルサーバーで、仮想化オーバーヘッドのない最高性能を提供します。</>
            ) : (
              <>High-performance GPU instances starting at <span className="text-accent font-mono font-bold">$0.50/hour</span>. 
              Deploy in seconds. Scale instantly. Pay only for what you use.</>
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-glow text-lg px-8 py-4 inline-flex items-center justify-center">
              {locale === 'ja' ? '見積もりを依頼' : 'Get Started Free'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/products" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
              {locale === 'ja' ? '料金を見る' : 'View GPU Options'}
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: locale === 'ja' ? '最大演算性能' : 'GPU Instances', value: '10,000+' },
              { label: locale === 'ja' ? '導入GPU数' : 'Active Users', value: '5,000+' },
              { label: locale === 'ja' ? '可用性' : 'Uptime SLA', value: '99.9%' },
              { label: locale === 'ja' ? '対応国' : 'Countries', value: '50+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-accent font-mono">{stat.value}</div>
                <div className="text-text-secondary text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {locale === 'ja' ? 'サービスの特长' : 'Why Choose DENCONE?'}
            </h2>
            <p className="text-text-secondary text-lg">
              {locale === 'ja' ? 'GPU專用のベアメタルサーバーを，日本品質でご提供します。' : 'Built for AI developers, by AI developers'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: locale === 'ja' ? 'ベアメタル專有リソース' : 'Dedicated Baremetal',
                desc: locale === 'ja' ? '仮想化レイヤーを排除し、GPU・CPU・メモリをフルに占有。' : 'No virtualization overhead. You fully own GPU, CPU and memory.',
              },
              {
                icon: Shield,
                title: locale === 'ja' ? '最新GPUラインアップ' : 'Latest GPU Lineup',
                desc: locale === 'ja' ? 'B200・H200・H100・A100からRTX 4090まで豊富にラインアップ。' : 'From B200, H200, H100, A100 to RTX 4090 and more.',
              },
              {
                icon: Globe,
                title: locale === 'ja' ? 'ドメイン・VMまで一括' : 'Domain & VM Included',
                desc: locale === 'ja' ? 'アプリケーション公開のためのドメイン取得や仮想マシンも提供。' : 'Beyond training, we also provide domains and VMs.',
              },
              {
                icon: Cpu,
                title: locale === 'ja' ? 'エンタープライズ品質' : 'Enterprise-Grade',
                desc: locale === 'ja' ? '日本のエンタープライズ品質基準でサービスを提供。' : 'Japanese quality standards with 99.9% uptime SLA.',
              },
              {
                icon: Users,
                title: locale === 'ja' ? '専門家によるサポート' : 'Expert Support',
                desc: locale === 'ja' ? 'GPUインフラの専門知識を持つチームがサポート。' : '24/7 support from GPU infrastructure specialists.',
              },
              {
                icon: BarChart3,
                title: locale === 'ja' ? 'リアルタイム監視' : 'Real-time Monitoring',
                desc: locale === 'ja' ? 'GPU使用量やコストをリアルタイムで追跡。' : 'Track GPU usage and costs in real-time.',
              },
            ].map((feature, i) => (
              <div key={i} className="card group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-purple/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'ja' ? '今すぐ始める' : 'Ready to Start?'}
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            {locale === 'ja' ? 'GPU構成のご相談・お見積りは、お気軽にお問い合わせください。' : 'Join thousands of AI developers already using DENCONE.'}
          </p>
          <Link href="/contact" className="btn-glow text-lg px-10 py-4 inline-flex items-center">
            {locale === 'ja' ? 'お問い合わせ' : 'Contact Us'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
