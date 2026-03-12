'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, Filter, Cpu, Zap, ChevronRight, Server, 
  HardDrive, Network, Activity, CheckCircle, XCircle,
  ShoppingCart, CreditCard, Clock
} from 'lucide-react'
import api from '@/lib/api'
import { useI18n } from '@/i18n'

interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  specs: {
    gpu: string
    vram: string
    cpu: string
    ram: string
    storage: string
    network?: string
  }
  priceHourly: number
  priceMonthly: number
  stock: number
  featured: boolean
}

const categories = {
  ja: ['すべて', 'AIトレーニング', '推論', 'トレーニング', '可視化', 'プロフェッショナル Viz'],
  en: ['All', 'AI Training', 'Inference', 'Training', 'Visualization', 'Professional Viz']
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const { locale } = useI18n()
  const isJa = locale === 'ja'
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(isJa ? 'すべて' : 'All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('price-asc')

  const catList = isJa ? categories.ja : categories.en

  useEffect(() => {
    const gpuParam = searchParams.get('gpu')
    if (gpuParam) {
      setSearchQuery(gpuParam)
    }
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products')
      setProducts(data.products)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categoryMap: Record<string, string> = {
    'すべて': 'All',
    'AIトレーニング': 'AI Training',
    '推論': 'Inference',
    'トレーニング': 'Training',
    '可視化': 'Visualization',
    'プロフェッショナル Viz': 'Professional Viz'
  }

  const getCategoryEn = (cat: string) => {
    if (categoryMap[cat]) return categoryMap[cat]
    return cat
  }

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === (isJa ? 'すべて' : 'All') || p.category === getCategoryEn(selectedCategory)
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.priceHourly - b.priceHourly
        case 'price-desc': return b.priceHourly - a.priceHourly
        case 'name': return a.name.localeCompare(b.name)
        default: return 0
      }
    })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="py-16 bg-gradient-to-b from-surface-card via-primary to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {isJa ? 'GPUサーバー' : 'GPU Servers'}
                <span className="text-gradient ml-2">{isJa ? '高性能' : 'High Performance'}</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-xl">
                {isJa 
                  ? '数秒で強力なGPUインスタンスをデプロイ。RTX 4090からH100まで、AI、ML、レンダリングワークロードに必要なハードウェアを揃えています。'
                  : 'Deploy powerful GPU instances in seconds. From RTX 4090 to H100, we have the hardware you need for AI, ML, and rendering workloads.'
                }
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent font-mono">{products.length}</div>
                <div className="text-text-secondary text-sm">{isJa ? 'GPUモデル' : 'GPU Models'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent font-mono">
                  ${Math.min(...products.map(p => p.priceHourly)).toFixed(2)}
                </div>
                <div className="text-text-secondary text-sm">{isJa ? 'から' : 'Starting at'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-40 glass border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 max-w-full">
              {catList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-accent text-primary font-medium'
                      : 'bg-surface-card text-text-secondary hover:text-accent hover:bg-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder={isJa ? 'GPUを検索...' : 'Search GPUs...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-full lg:w-64"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
              >
                <option value="price-asc">{isJa ? '価格：安い順' : 'Price: Low to High'}</option>
                <option value="price-desc">{isJa ? '価格：高い順' : 'Price: High to Low'}</option>
                <option value="name">{isJa ? '名前順' : 'Name'}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-6 bg-surface-border rounded w-2/3 mb-4" />
                  <div className="h-4 bg-surface-border rounded w-full mb-2" />
                  <div className="h-4 bg-surface-border rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Server className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{isJa ? '製品が見つかりません' : 'No products found'}</h3>
              <p className="text-text-secondary">{isJa ? 'フィルターを調整してください' : 'Try adjusting your filters or search query'}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isJa={isJa} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product, isJa }: { product: Product; isJa: boolean }) {
  const inStock = product.stock > 0

  return (
    <div className="card group hover:border-accent/50 transition-all duration-300">
      {product.featured && (
        <div className="absolute -top-1 -right-3 badge badge-accent text-xs shadow-lg">
          <Zap className="w-3 h-3 mr-1" />
          {isJa ? '人気' : 'Popular'}
        </div>
      )}

      {/* GPU Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 mb-4 group-hover:from-accent/30 group-hover:to-purple/30 transition-all">
        <Cpu className="w-8 h-8 text-accent" />
      </div>

      <h3 className="text-xl font-bold font-mono mb-1">{product.name}</h3>
      <span className="badge bg-surface-border text-text-secondary text-xs mb-3">
        {product.category}
      </span>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {product.description}
      </p>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex items-center gap-2 text-text-secondary">
          <Activity className="w-3 h-3" />
          <span className="truncate">{product.specs?.vram}</span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <Server className="w-3 h-3" />
          <span className="truncate">{product.specs?.cpu}</span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <HardDrive className="w-3 h-3" />
          <span className="truncate">{product.specs?.storage}</span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <Network className="w-3 h-3" />
          <span className="truncate">{product.specs?.network || 'N/A'}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between mb-4 pt-4 border-t border-surface-border">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-accent">${product.priceHourly}</span>
            <span className="text-text-secondary text-sm">/hr</span>
          </div>
          <div className="text-text-muted text-sm">
            ${product.priceMonthly}/month
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs ${inStock ? 'text-success' : 'text-error'}`}>
          {inStock ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {inStock ? `${product.stock} ${isJa ? '台' : 'available'}` : (isJa ? '在庫切れ' : 'Out of stock')}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/products/${product.slug}`}
        className="btn-glow w-full justify-center flex items-center"
      >
        {isJa ? '詳細を見る' : 'View Details'}
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
