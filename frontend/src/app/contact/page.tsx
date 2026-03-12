'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MessageCircle, Twitter, Github, Linkedin, Send, MapPin, Clock, Phone, Building } from 'lucide-react'
import { useI18n } from '@/i18n'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const { locale } = useI18n()
  const isJa = locale === 'ja'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            {isJa ? 'お問い合わせ' : 'Contact'} <span className="text-gradient">{isJa ? '' : 'Us'}</span>
          </h1>
          <p className="text-xl text-text-secondary">
            {isJa ? 'GPU構成のご相談・お見積りは、お気軽にお問い合わせください。' : 'Feel free to contact us for GPU sizing, quotations and PoC environments.'}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">{isJa ? 'お問い合わせフォーム' : 'Send us a Message'}</h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{isJa ? '送信完了！' : 'Message Sent!'}</h3>
                  <p className="text-text-secondary">
                    {isJa ? '24時間以内にご返答いたします。' : 'We will get back to you within 24 hours.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{isJa ? 'お名前 *' : 'Name *'}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{isJa ? '会社名・組織名' : 'Company / Organization'}</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{isJa ? 'メールアドレス *' : 'Email *'}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{isJa ? 'ご相談内容 *' : 'Inquiry Details *'}</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input min-h-[150px]"
                      placeholder={isJa ? 'GPUモデル、台数、開始希望時期、工作内容などをお書き添えください。' : 'Please include: desired GPU models, number of nodes, target start date, and workloads.'}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn-glow w-full">
                    <Send className="w-4 h-4 mr-2" />
                    {isJa ? '送信' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">{isJa ? '会社情報' : 'Company Information'}</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      
                    </div>
                    <div>
                      <div className="font-medium">{isJa ? '株式会社電Cone' : 'Dencone, Inc.'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      
                    </div>
                    <div>
                      <div className="font-medium">{isJa ? '所在地' : 'Address'}</div>
                      <div className="text-text-secondary text-sm">
                        {isJa ? '東京都渋谷区神泉町10番15号' : '10-15 Shinsen-cho, Shibuya-ku, Tokyo, Japan'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      
                    </div>
                    <div>
                      <div className="font-medium">{isJa ? 'メール' : 'Email'}</div>
                      <a href="mailto:business@dencone.com" className="text-accent text-sm">
                        business@dencone.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  
                  {isJa ? '応答時間' : 'Response Times'}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{isJa ? '的一般お問い合わせ' : 'General Inquiries'}</span>
                    <span>{isJa ? '24時間以内' : 'Within 24 hours'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{isJa ? '技術サポート' : 'Technical Support'}</span>
                    <span>{isJa ? '4時間以内' : 'Within 4 hours'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{isJa ? 'エンタープライズ営業' : 'Enterprise Sales'}</span>
                    <span>{isJa ? '2時間以内' : 'Within 2 hours'}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card">
                <h3 className="font-semibold mb-4">{isJa ? 'フォローする' : 'Follow Us'}</h3>
                <div className="flex gap-4">
                  <a href="https://twitter.com/dencone" target="_blank" rel="noopener" className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center hover:bg-accent/10 transition-colors">
                    <Twitter className="w-5 h-5 text-text-secondary hover:text-accent" />
                  </a>
                  <a href="https://github.com/dencone" target="_blank" rel="noopener" className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center hover:bg-accent/10 transition-colors">
                    <Github className="w-5 h-5 text-text-secondary hover:text-accent" />
                  </a>
                  <a href="https://linkedin.com/company/dencone" target="_blank" rel="noopener" className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center hover:bg-accent/10 transition-colors">
                    <Linkedin className="w-5 h-5 text-text-secondary hover:text-accent" />
                  </a>
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                <p className="text-sm text-text-secondary">
                  <strong className="text-accent">{isJa ? 'ヒント:' : 'Tip:'}</strong> 
                  {isJa ? 'スムーズなお返事のために、GPUモデル、台数、開始希望時期、工作内容（学習・推論・HPCなど）をお書き添えください。' : ' For a smoother process, please include your desired GPU models, number of nodes, target start date and workloads.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
