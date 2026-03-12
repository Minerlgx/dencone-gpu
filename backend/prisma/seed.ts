import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const products = [
  {
    name: 'NVIDIA H100 80GB',
    slug: 'nvidia-h100-80gb',
    category: 'AI Training',
    description: 'Industry-leading GPU for AI training and large language models. H100 delivers unprecedented performance with Transformer Engine and FP8 support.',
    specs: {
      gpu: 'NVIDIA H100',
      vram: '80GB HBM3',
      cpu: '128 cores ARM Neoverse',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '200Gbps InfiniBand',
    },
    pricing: { hourly: 2.50, monthly: 1500 },
    priceHourly: 2.50,
    priceMonthly: 1500,
    stock: 20,
    featured: true,
    images: ['/images/h100.jpg'],
  },
  {
    name: 'NVIDIA A100 80GB',
    slug: 'nvidia-a100-80gb',
    category: 'AI Training',
    description: 'Proven AI workhorse with Multi-Instance GPU (MIG) technology for optimal resource utilization.',
    specs: {
      gpu: 'NVIDIA A100',
      vram: '80GB HBM2e',
      cpu: '64 cores',
      ram: '256GB DDR4',
      storage: '1TB NVMe',
      network: '100Gbps',
    },
    pricing: { hourly: 2.00, monthly: 1200 },
    priceHourly: 2.00,
    priceMonthly: 1200,
    stock: 15,
    featured: true,
    images: ['/images/a100.jpg'],
  },
  {
    name: 'NVIDIA RTX 4090',
    slug: 'nvidia-rtx-4090',
    category: 'Inference',
    description: 'Best-in-class consumer GPU for AI inference and development. Perfect for prototyping and small-scale deployments.',
    specs: {
      gpu: 'NVIDIA RTX 4090',
      vram: '24GB GDDR6X',
      cpu: '32 cores',
      ram: '128GB DDR5',
      storage: '1TB NVMe',
      network: '25Gbps',
    },
    pricing: { hourly: 0.80, monthly: 480 },
    priceHourly: 0.80,
    priceMonthly: 480,
    stock: 50,
    featured: true,
    images: ['/images/4090.jpg'],
  },
  {
    name: 'NVIDIA RTX 5090',
    slug: 'nvidia-rtx-5090',
    category: 'Training',
    description: 'Next-gen GPU with Blackwell architecture. Exceptional performance for AI training and research.',
    specs: {
      gpu: 'NVIDIA RTX 5090',
      vram: '32GB GDDR7',
      cpu: '48 cores',
      ram: '192GB DDR5',
      storage: '2TB NVMe Gen5',
      network: '50Gbps',
    },
    pricing: { hourly: 1.20, monthly: 720 },
    priceHourly: 1.20,
    priceMonthly: 720,
    stock: 30,
    featured: false,
    images: ['/images/5090.jpg'],
  },
  {
    name: 'NVIDIA L40S',
    slug: 'nvidia-l40s',
    category: 'Visualization',
    description: 'Powerful GPU designed for visual computing, rendering, and AI inference workloads.',
    specs: {
      gpu: 'NVIDIA L40S',
      vram: '48GB GDDR6X',
      cpu: '64 cores',
      ram: '256GB DDR5',
      storage: '2TB NVMe',
      network: '100Gbps',
    },
    pricing: { hourly: 1.50, monthly: 900 },
    priceHourly: 1.50,
    priceMonthly: 900,
    stock: 25,
    featured: false,
    images: ['/images/l40s.jpg'],
  },
  {
    name: 'NVIDIA H200',
    slug: 'nvidia-h200',
    category: 'AI Training',
    description: 'Next-generation AI GPU with expanded memory for larger models and datasets.',
    specs: {
      gpu: 'NVIDIA H200',
      vram: '141GB HBM3e',
      cpu: '128 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen5',
      network: '200Gbps InfiniBand',
    },
    pricing: { hourly: 3.50, monthly: 2100 },
    priceHourly: 3.50,
    priceMonthly: 2100,
    stock: 10,
    featured: true,
    images: ['/images/h200.jpg'],
  },
  {
    name: 'AMD MI300X',
    slug: 'amd-mi300x',
    category: 'AI Training',
    description: 'AMD Instinct MI300X for massive AI workloads with industry-leading memory capacity.',
    specs: {
      gpu: 'AMD Instinct MI300X',
      vram: '192GB HBM3',
      cpu: '128 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '200Gbps',
    },
    pricing: { hourly: 3.00, monthly: 1800 },
    priceHourly: 3.00,
    priceMonthly: 1800,
    stock: 8,
    featured: false,
    images: ['/images/mi300x.jpg'],
  },
  {
    name: 'NVIDIA A6000',
    slug: 'nvidia-a6000',
    category: 'Professional Viz',
    description: 'Professional visualization GPU for design and rendering workloads.',
    specs: {
      gpu: 'NVIDIA RTX A6000',
      vram: '48GB GDDR6',
      cpu: '48 cores',
      ram: '192GB DDR4',
      storage: '1TB NVMe',
      network: '25Gbps',
    },
    pricing: { hourly: 1.00, monthly: 600 },
    priceHourly: 1.00,
    priceMonthly: 600,
    stock: 20,
    featured: false,
    images: ['/images/a6000.jpg'],
  },
]

async function main() {
  console.log('Seeding database...')

  // Create products
  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    })

    if (!existing) {
      await prisma.product.create({ data: product })
      console.log(`Created: ${product.name}`)
    } else {
      console.log(`Exists: ${product.name}`)
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

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
