'use client'

import Link from 'next/link'
import { Cpu, Zap, Shield, Globe, Users, BarChart3, ArrowRight, CheckCircle, Server, Database, Network } from 'lucide-react'
import { useI18n } from '@/i18n'

export default function AboutPage() {
  const { locale } = useI18n()
  const isJa = locale === 'ja'

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            {isJa ? ' DENCONE' : 'About'} <span className="text-gradient">{isJa ? 'について' : ''}</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            {isJa ? 'エンタープライズ品質でGPUコンピューティング革命をリード' : 'Leading the GPU Computing Revolution with Enterprise-Grade Quality'}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">{isJa ? '会社概要' : 'Who We Are'}</h2>
              <p className="text-text-secondary text-lg mb-6">
                {isJa 
                  ? 'DENCONEは、最先端技術と日本品質でGPUコンピューティング革命をリードしています。AI、科学技術計算、デジタルイノベーションの疆界を押し広げるために、高性能GPUコンピューティングへのアクセスを民主化することが私たちの使命です。'
                  : 'DENCONE leads the GPU computing revolution with cutting-edge technology, deep expertise and an uncompromising commitment to performance and reliability. Our mission is to democratize access to high-performance GPU computing so that researchers, developers and enterprises can push the boundaries of AI, scientific computing and digital innovation.'
                }
              </p>
              <p className="text-text-secondary mb-6">
                {isJa
                  ? '私たちはハードウェアの提供にとどまらず、最先端技術、専門知識、比他店のないサポートを組み合わせた完全なソリューションを提供します。私たちが構築するすべてのサーバーは、パフォーマンス、信頼、顧客の成功への献身を表しています。'
                  : 'We go far beyond hardware, combining state-of-the-art technology, expert knowledge and unmatched support into complete solutions. Every server we build embodies our dedication to performance, reliability and our customers\' success.'
                }
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-surface-card rounded-lg">
                  <div className="text-3xl font-bold text-accent">100+</div>
                  <div className="text-text-secondary text-sm">{isJa ? 'サーバー導入' : 'Servers Deployed'}</div>
                </div>
                <div className="text-center p-4 bg-surface-card rounded-lg">
                  <div className="text-3xl font-bold text-accent">1,000+</div>
                  <div className="text-text-secondary text-sm">{isJa ? 'GPU導入' : 'GPUs Deployed'}</div>
                </div>
                <div className="text-center p-4 bg-surface-card rounded-lg">
                  <div className="text-3xl font-bold text-accent">50+</div>
                  <div className="text-text-secondary text-sm">{isJa ? '顧客数' : 'Satisfied Clients'}</div>
                </div>
                <div className="text-center p-4 bg-surface-card rounded-lg">
                  <div className="text-3xl font-bold text-accent">10+</div>
                  <div className="text-text-secondary text-sm">{isJa ? '経験年数' : 'Years Experience'}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">{isJa ? 'DENCONEが選ばれる理由' : 'Why Choose DENCONE'}</h3>
              
              {[
                {
                  icon: Zap,
                  title: isJa ? 'パフォーマンス重視の設計' : 'Performance-First Design',
                  desc: isJa ? 'すべてのサーバーが最大GPUパフォーマンス用に最適化。仮想化オーバーヘッド一切なし。' : 'Every server is optimized for maximum GPU performance with no virtualization overhead.'
                },
                {
                  icon: Shield,
                  title: isJa ? 'エンタープライズ品質' : 'Enterprise-Grade Reliability',
                  desc: isJa ? '日本品質基準で99.9%アップタイムSLAと専用インフラを提供。' : 'Japanese quality standards with 99.9% uptime SLA and dedicated infrastructure.'
                },
                {
                  icon: Users,
                  title: isJa ? '専門家によるサポート' : 'Expert Technical Support',
                  desc: isJa ? 'GPUインフラの専門知識を持つチームが24時間365日サポート。' : '24/7 support from GPU infrastructure specialists.'
                },
                {
                  icon: Cpu,
                  title: isJa ? '最新GPUラインアップ' : 'Latest GPU Lineup',
                  desc: isJa ? 'B200、H200、H100、A100からRTX 4090、RTX 5090まで豊富に揃い。' : 'From B200, H200, H100, A100 to RTX 4090, RTX 5090 and more.'
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 bg-surface-card rounded-lg">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-text-secondary text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-surface-card/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{isJa ? 'サービス' : 'Our Services'}</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: isJa ? 'GPUベアメタル' : 'GPU Baremetal',
                desc: isJa ? '仮想化オーバーヘッドのない専用GPUサーバー。GPU、CPU、メモリへのフルアクセス。' : 'Dedicated GPU servers with no virtualization overhead. Full access to GPU, CPU, and memory.',
                items: isJa 
                  ? ['H100 / A100 / RTX 4090', '専用ベアメタル', 'カスタム構成']
                  : ['H100 / A100 / RTX 4090', 'Dedicated baremetal', 'Custom configurations']
              },
              {
                icon: Database,
                title: isJa ? 'ドメイン・VM' : 'Domain & VM',
                desc: isJa ? 'ドメイン登録や仮想マシンも含めたインフラを完全提供。' : 'Complete infrastructure including domain registration and virtual machines.',
                items: isJa 
                  ? ['ドメイン登録', 'SSL証明書', 'DNSホスティング']
                  : ['Domain registration', 'SSL certificates', 'DNS hosting']
              },
              {
                icon: Network,
                title: isJa ? 'ネットワークソリューション' : 'Network Solutions',
                desc: isJa ? '要求の厳しいワークロード向け的高速ネットワーク、最大100Gbps。' : 'High-speed networking up to 100Gbps for demanding workloads.',
                items: isJa 
                  ? ['最大100Gbps带宽', '東京データセンター', '低レイテンシ']
                  : ['Up to 100Gbps bandwidth', 'Tokyo datacenter', 'Low latency']
              },
            ].map((service, i) => (
              <div key={i} className="card">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-purple/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">{isJa ? 'カウンセディング' : 'Ready to Get Started?'}</h2>
          <p className="text-text-secondary text-lg mb-8">
            {isJa ? 'GPU構成のご相談やお見積りは、お気軽にお問い合わせください。' : 'Contact us for GPU sizing, quotations and PoC environments.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="btn-glow text-lg px-8 py-4">
              {isJa ? 'お問い合わせ' : 'Contact Us'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/products" className="btn-secondary text-lg px-8 py-4">
              {isJa ? 'GPUを見る' : 'View GPUs'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
