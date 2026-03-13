import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Product data with Japanese and English descriptions
const products = [
  // H100 Series
  {
    name: 'H100 80GB SXM',
    slug: 'h100-80gb-sxm',
    category: 'AI Training',
    descriptionEn: 'Industry-leading AI training GPU with HBM3 memory. Optimized for large language models andTransformer workloads. Features FP8 support and Transformer Engine.',
    descriptionJa: 'HBM3メモリ搭載の業界トップAIトレーニングGPU。大規模言語モデルとTransformerワークロードに最適化。FP8サポートとTransformer Engine搭載。',
    specs: {
      gpu: 'NVIDIA H100 80GB SXM',
      vram: '80GB HBM3',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '200Gbps InfiniBand HDR',
    },
    priceHourly: 2.50,
    priceMonthly: 1500,
    stock: 20,
    featured: true,
  },
  {
    name: 'H100 80GB NVL',
    slug: 'h100-80gb-nvl',
    category: 'AI Training',
    descriptionEn: 'H100 with NVLink for multi-GPU training. Perfect for distributed training and large model inference.',
    descriptionJa: 'NVLink搭載のH100用于多GPUトレーニング。分散トレーニングと大規模モデル推論に最適。',
    specs: {
      gpu: 'NVIDIA H100 80GB NVL',
      vram: '80GB HBM3 (x2)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '1TB DDR5',
      storage: '4TB NVMe Gen4',
      network: '400Gbps NVLink',
    },
    priceHourly: 4.50,
    priceMonthly: 2700,
    stock: 10,
    featured: true,
  },
  // H200 Series
  {
    name: 'H200 141GB SXM',
    slug: 'h200-141gb-sxm',
    category: 'AI Training',
    descriptionEn: 'Next-generation AI GPU with 141GB HBM3e memory. Designed for the largest models and datasets with enhanced FP8 performance.',
    descriptionJa: '141GB HBM3eメモリ搭載の次世代AIGPU。最大規模のモデルとデータセット向けに設計され、FP8パフォーマンスが向上。',
    specs: {
      gpu: 'NVIDIA H200 141GB SXM',
      vram: '141GB HBM3e',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen5',
      network: '200Gbps InfiniBand HDR',
    },
    priceHourly: 3.50,
    priceMonthly: 2100,
    stock: 8,
    featured: true,
  },
  // B100 Series
  {
    name: 'B100 192GB',
    slug: 'b100-192gb',
    category: 'AI Training',
    descriptionEn: 'Blackwell architecture with massive 192GB memory. Industry-leading performance for inference and training.',
    descriptionJa: '192GBの大容量メモリを持つBlackwellアーキテクチャ。推論とトレーニングの両方で業界トップのパフォーマンス。',
    specs: {
      gpu: 'NVIDIA B100 192GB',
      vram: '192GB HBM3e',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen5',
      network: '200Gbps InfiniBand',
    },
    priceHourly: 4.00,
    priceMonthly: 2400,
    stock: 5,
    featured: true,
  },
  // A100 Series
  {
    name: 'A100 80GB SXM',
    slug: 'a100-80gb-sxm',
    category: 'AI Training',
    descriptionEn: 'Proven AI workhorse with Multi-Instance GPU (MIG) technology. Ideal for production AI workloads with proven reliability.',
    descriptionJa: 'マルチインスタンスGPU（MIG）技術搭載の実証済みAI主力GPU。信頼性の高い本番AIワークロードに最適。',
    specs: {
      gpu: 'NVIDIA A100 80GB SXM',
      vram: '80GB HBM2e',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '256GB DDR4',
      storage: '1TB NVMe Gen4',
      network: '100Gbps EDR InfiniBand',
    },
    priceHourly: 2.00,
    priceMonthly: 1200,
    stock: 15,
    featured: false,
  },
  {
    name: 'A100 40GB SXM',
    slug: 'a100-40gb-sxm',
    category: 'Inference',
    descriptionEn: 'Cost-effective A100 configuration for inference and smaller training workloads.',
    descriptionJa: '推論と较小规模なトレーニングワークロード向けのコスト効率的なA100構成。',
    specs: {
      gpu: 'NVIDIA A100 40GB SXM',
      vram: '40GB HBM2',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '256GB DDR4',
      storage: '1TB NVMe Gen4',
      network: '100Gbps EDR',
    },
    priceHourly: 1.20,
    priceMonthly: 720,
    stock: 20,
    featured: false,
  },
  // RTX 4090 Series
  {
    name: 'RTX 4090 x8',
    slug: 'rtx-4090-x8',
    category: 'AI Training',
    descriptionEn: '8x RTX 4090 cluster for deep learning training. High性价比 solution for research and development.',
    descriptionJa: '8x RTX 4090クラスター用于深層学習トレーニング。研究開発向けの高コストパフォーマンスソリューション。',
    specs: {
      gpu: 'NVIDIA RTX 4090 (x8)',
      vram: '24GB GDDR6X (x8)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '4TB NVMe Gen4',
      network: '100Gbps',
    },
    priceHourly: 5.00,
    priceMonthly: 3000,
    stock: 5,
    featured: true,
  },
  {
    name: 'RTX 4090 x4',
    slug: 'rtx-4090-x4',
    category: 'Training',
    descriptionEn: '4x RTX 4090 configuration for mid-scale training and inference. Perfect for prototyping.',
    descriptionJa: '4x RTX 4090構成用于中規模トレーニングと推論。プロトタイピングに最適。',
    specs: {
      gpu: 'NVIDIA RTX 4090 (x4)',
      vram: '24GB GDDR6X (x4)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '256GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '50Gbps',
    },
    priceHourly: 2.80,
    priceMonthly: 1680,
    stock: 10,
    featured: false,
  },
  {
    name: 'RTX 4090 Single',
    slug: 'rtx-4090-single',
    category: 'Inference',
    descriptionEn: 'Single RTX 4090 for development, testing, and small-scale inference workloads.',
    descriptionJa: '単一RTX 4090用于開発、テスト、小規模推論ワークロード。',
    specs: {
      gpu: 'NVIDIA RTX 4090',
      vram: '24GB GDDR6X',
      cpu: 'AMD EPYC 7763 32 cores',
      ram: '128GB DDR5',
      storage: '1TB NVMe Gen4',
      network: '25Gbps',
    },
    priceHourly: 0.80,
    priceMonthly: 480,
    stock: 50,
    featured: false,
  },
  // RTX 5090 Series
  {
    name: 'RTX 5090 x8',
    slug: 'rtx-5090-x8',
    category: 'AI Training',
    descriptionEn: '8x RTX 5090 cluster with Blackwell architecture. Maximum performance for cutting-edge AI research.',
    descriptionJa: 'Blackwellアーキテクチャ搭载の8x RTX 5090クラスター。最先端AI研究のための最大パフォーマンス。',
    specs: {
      gpu: 'NVIDIA RTX 5090 (x8)',
      vram: '32GB GDDR7 (x8)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '1TB DDR5',
      storage: '4TB NVMe Gen5',
      network: '200Gbps',
    },
    priceHourly: 8.00,
    priceMonthly: 4800,
    stock: 3,
    featured: true,
  },
  {
    name: 'RTX 5090 Single',
    slug: 'rtx-5090-single',
    category: 'Training',
    descriptionEn: 'Single RTX 5090 with next-gen Blackwell architecture. Exceptional performance for AI development.',
    descriptionJa: '次世代Blackwellアーキテクチャ搭载の単一RTX 5090。AI開発のための優れたパフォーマンス。',
    specs: {
      gpu: 'NVIDIA RTX 5090',
      vram: '32GB GDDR7',
      cpu: 'AMD EPYC 7763 32 cores',
      ram: '128GB DDR5',
      storage: '1TB NVMe Gen5',
      network: '50Gbps',
    },
    priceHourly: 1.20,
    priceMonthly: 720,
    stock: 30,
    featured: false,
  },
  // L40S Series
  {
    name: 'L40S x8',
    slug: 'l40s-x8',
    category: 'Visualization',
    descriptionEn: '8x L40S cluster for visual computing and rendering. Optimized for 3D rendering and AI inference at scale.',
    descriptionJa: '8x L40Sクラスター用于ビジュアルコンピューティングとレンダリング。3Dレンダリングと大規模AI推論に最適化。',
    specs: {
      gpu: 'NVIDIA L40S (x8)',
      vram: '48GB GDDR6X (x8)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '4TB NVMe Gen4',
      network: '100Gbps',
    },
    priceHourly: 6.00,
    priceMonthly: 3600,
    stock: 5,
    featured: false,
  },
  {
    name: 'L40S Single',
    slug: 'l40s-single',
    category: 'Visualization',
    descriptionEn: 'Single L40S for visualization, rendering, and inference workloads.',
    descriptionJa: '単一L40S用于ビジュアルコンピューティング、レンダリング、推論ワークロード。',
    specs: {
      gpu: 'NVIDIA L40S',
      vram: '48GB GDDR6X',
      cpu: 'AMD EPYC 7763 32 cores',
      ram: '128GB DDR5',
      storage: '1TB NVMe Gen4',
      network: '25Gbps',
    },
    priceHourly: 1.00,
    priceMonthly: 600,
    stock: 25,
    featured: false,
  },
  // A6000 Series
  {
    name: 'RTX A6000 x4',
    slug: 'rtx-a6000-x4',
    category: 'Professional Viz',
    descriptionEn: '4x RTX A6000 for professional visualization and CAD workloads.',
    descriptionJa: '4x RTX A6000用于プロフェッショナルビジュアルコンピューティングとCADワークロード。',
    specs: {
      gpu: 'NVIDIA RTX A6000 (x4)',
      vram: '48GB GDDR6 (x4)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '256GB DDR4',
      storage: '2TB NVMe Gen4',
      network: '50Gbps',
    },
    priceHourly: 3.50,
    priceMonthly: 2100,
    stock: 8,
    featured: false,
  },
  {
    name: 'RTX A6000 Single',
    slug: 'rtx-a6000-single',
    category: 'Professional Viz',
    descriptionEn: 'Single RTX A6000 for professional graphics, rendering, and AI inference.',
    descriptionJa: '単一RTX A6000用于プロフェッショナルグラフィックス、レンダリング、AI推論。',
    specs: {
      gpu: 'NVIDIA RTX A6000',
      vram: '48GB GDDR6',
      cpu: 'AMD EPYC 7763 32 cores',
      ram: '128GB DDR4',
      storage: '1TB NVMe Gen4',
      network: '25Gbps',
    },
    priceHourly: 0.90,
    priceMonthly: 540,
    stock: 20,
    featured: false,
  },
  // AMD MI300X
  {
    name: 'AMD MI300X',
    slug: 'amd-mi300x',
    category: 'AI Training',
    descriptionEn: 'AMD Instinct MI300X with 192GB HBM3 for massive AI workloads. Industry-leading memory capacity for large models.',
    descriptionJa: '192GB HBM3搭載のAMD Instinct MI300X用于大規模AIワークロード。大規模モデル向け業界トップのメモリ容量。',
    specs: {
      gpu: 'AMD Instinct MI300X',
      vram: '192GB HBM3',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '200Gbps Infinity Fabric',
    },
    priceHourly: 3.00,
    priceMonthly: 1800,
    stock: 8,
    featured: false,
  },
  // Inference Optimized
  {
    name: 'H100 Inference Opt',
    slug: 'h100-inference-opt',
    category: 'Inference',
    descriptionEn: 'H100 optimized specifically for inference workloads. Lower cost per token with optimized deployment.',
    descriptionJa: '推論ワークロード向けに最適化されたH100。最適化されたデプロイでトークンあたりのコストを削減。',
    specs: {
      gpu: 'NVIDIA H100 80GB',
      vram: '80GB HBM3',
      cpu: 'Intel Xeon 8478 48 cores',
      ram: '256GB DDR5',
      storage: '1TB NVMe Gen4',
      network: '100Gbps',
    },
    priceHourly: 1.80,
    priceMonthly: 1080,
    stock: 30,
    featured: false,
  },
  {
    name: 'T4 Inference',
    slug: 't4-inference',
    category: 'Inference',
    descriptionEn: 'Cost-effective inference GPU for production deployments. Low power, high efficiency.',
    descriptionJa: '本番デプロイ向けのコスト効率的な推論GPU。低消費電力、高効率。',
    specs: {
      gpu: 'NVIDIA T4',
      vram: '16GB GDDR6',
      cpu: 'Intel Xeon 6448 32 cores',
      ram: '128GB DDR4',
      storage: '512GB NVMe',
      network: '25Gbps',
    },
    priceHourly: 0.35,
    priceMonthly: 210,
    stock: 100,
    featured: false,
  },
  // Budget Options
  {
    name: 'RTX 4080 SUPER',
    slug: 'rtx-4080-super',
    category: 'Inference',
    descriptionEn: 'Budget-friendly option for development and testing. Great for prototyping before scaling up.',
    descriptionJa: '開発とテスト向けの予算友好オプション。スケールアップ前のプロトタイピングに最適。',
    specs: {
      gpu: 'NVIDIA RTX 4080 SUPER',
      vram: '16GB GDDR6X',
      cpu: 'AMD EPYC 7763 16 cores',
      ram: '64GB DDR5',
      storage: '512GB NVMe Gen4',
      network: '10Gbps',
    },
    priceHourly: 0.50,
    priceMonthly: 300,
    stock: 50,
    featured: false,
  },
  {
    name: 'RTX 3090',
    slug: 'rtx-3090',
    category: 'Inference',
    descriptionEn: 'Proven 3090 for cost-effective deep learning. Still powerful for many training tasks.',
    descriptionJa: 'コスト効率的な深層学習のための実証済み3090。多くのトレーニングタスクに対してまだ强大。',
    specs: {
      gpu: 'NVIDIA RTX 3090',
      vram: '24GB GDDR6X',
      cpu: 'AMD EPYC 7763 16 cores',
      ram: '64GB DDR4',
      storage: '512GB NVMe',
      network: '10Gbps',
    },
    priceHourly: 0.45,
    priceMonthly: 270,
    stock: 30,
    featured: false,
  },
]

async function main() {
  console.log('Seeding database...')

  // Delete all existing products first
  await prisma.product.deleteMany()
  console.log('Deleted all existing products')

  // Create products
  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    })

    const data = {
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.descriptionEn,
      descriptionJa: product.descriptionJa,
      specs: product.specs as any,
      priceHourly: product.priceHourly,
      priceMonthly: product.priceMonthly,
      stock: product.stock,
      featured: product.featured,
      status: 'ACTIVE' as const, // Type as enum
    }

    if (!existing) {
      await prisma.product.create({ data })
      console.log(`Created: ${product.name}`)
    } else {
      // Update existing
      await prisma.product.update({
        where: { slug: product.slug },
        data,
      })
      console.log(`Updated: ${product.name}`)
    }
  }

  // Create admin user
  const adminEmail = 'admin@dencone.com'
  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } })
  
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
        balance: 1000,
      },
    })
    console.log('Created admin account: admin@dencone.com / admin123')
  } else {
    console.log('Admin account already exists')
  }

  console.log(`\nSeeding complete! Created ${products.length} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
