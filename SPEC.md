# DENCONE GPU Cloud - 项目规格说明书

## 1. 项目概述

**项目名称：** DENCONE GPU Cloud  
**域名：** www.dencone.com  
**项目类型：** GPU服务器租赁平台（类似RunPod/Vast.ai/Lambda Labs）  
**目标用户：** AI开发者、机器学习工程师、研究机构、初创公司  
**部署环境：** Ubuntu + 1Panel + Docker

---

## 2. UI/UX 设计规范

### 2.1 色彩方案

| 用途 | 颜色 | Hex |
|------|------|-----|
| 主色(Primary) | 深蓝黑 | #0A0E17 |
| 强调色(Accent) | 霓虹青 | #00F0FF |
| 次要强调 | 电光紫 | #8B5CF6 |
| 成功色 | 荧光绿 | #10B981 |
| 警告色 | 琥珀橙 | #F59E0B |
| 错误色 | 珊瑚红 | #EF4444 |
| 背景色 | 碳黑 | #0D1117 |
| 卡片背景 | 深灰 | #161B22 |
| 边框色 | 灰色 | #30363D |
| 文字主色 | 白色 | #F0F6FC |
| 文字次要 | 灰色 | #8B949E |

### 2.2 字体

- **标题:** JetBrains Mono (科技感)
- **正文:** Inter / Source Sans Pro
- **代码/价格:** Fira Code

### 2.3 布局

- 响应式断点: 640px / 768px / 1024px / 1280px
- 容器最大宽度: 1280px
- 导航栏: 固定顶部，毛玻璃效果

### 2.4 动画

- 按钮悬停: 发光效果 (box-shadow glow)
- 卡片: 微妙上浮 (translateY -4px)
- 页面切换: 淡入 (opacity 0→1, 300ms ease)
- 数字变化: 计数器动画

---

## 3. 页面结构

### 3.1 前台页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 英雄区、产品展示、优势、CTA |
| 产品页 | `/products` | GPU列表、筛选、规格 |
| 产品详情 | `/products/:id` | 单个GPU详情、配置选择 |
| 定价页 | `/pricing` | 套餐方案 |
| 关于页 | `/about` | 公司介绍 |
| 登录页 | `/login` | 邮箱登录/注册 |
| 注册页 | `/register` | 用户注册 |
| 会员中心 | `/dashboard` | 用户仪表盘 |
| 订单管理 | `/dashboard/orders` | 我的订单 |
| 实例管理 | `/dashboard/instances` | GPU实例 |
| 充值页 | `/dashboard/billing` | 账户充值 |
| 账单历史 | `/dashboard/invoices` | 发票记录 |

### 3.2 后台页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 管理员登录 | `/admin/login` | 后台登录 |
| 仪表盘 | `/admin` | 数据概览 |
| 会员管理 | `/admin/users` | 用户列表、详情 |
| 订单管理 | `/admin/orders` | 所有订单 |
| GPU管理 | `/admin/products` | 产品上下架 |
| 系统设置 | `/admin/settings` | 网站配置 |

---

## 4. 功能模块

### 4.1 会员系统

- [x] Email注册（验证码）
- [x] 登录/登出
- [x] 密码重置
- [x] 个人资料管理
- [x] 头像上传
- [x] 账户余额
- [x] 充值记录

### 4.2 产品系统

- [x] GPU产品展示
- [x] 产品分类筛选
- [x] 产品详情
- [x] 库存管理
- [x] 价格显示（小时/月）
- [x] 规格对比

### 4.3 订单系统

- [x] 加入购物车
- [x] 立即购买
- [x] 订单创建
- [x] 订单支付
- [x] 订单列表
- [x] 订单详情
- [x] 发票生成

### 4.4 实例管理（会员）

- [x] 实例列表
- [x] 实例启动/停止/重启
- [x] 实例监控
- [x] SSH密钥管理
- [x] 连接信息（IP、端口、密码）

### 4.5 后台管理

- [x] 管理员登录
- [x] 数据统计
- [x] 会员管理（CRUD）
- [x] 订单管理
- [x] 产品管理
- [x] 系统设置

---

## 5. 数据模型

### 5.1 用户 (User)

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "password": "hashed",
  "name": "User Name",
  "avatar": "url",
  "balance": 0.00,
  "role": "user|admin",
  "emailVerified": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 5.2 产品 (Product)

```json
{
  "id": "uuid",
  "name": "NVIDIA H100 80GB",
  "slug": "nvidia-h100-80gb",
  "category": "AI Training",
  "description": "...",
  "specs": {
    "gpu": "H100",
    "vram": "80GB HBM3",
    "cpu": "128 cores",
    "ram": "512GB DDR5",
    "storage": "1TB NVMe"
  },
  "pricing": {
    "hourly": 2.50,
    "monthly": 1500.00
  },
  "stock": 10,
  "status": "active|maintenance|offline",
  "featured": true,
  "images": ["url1", "url2"]
}
```

### 5.3 订单 (Order)

```json
{
  "id": "uuid",
  "userId": "uuid",
  "productId": "uuid",
  "type": "hourly|monthly",
  "amount": 1500.00,
  "status": "pending|paid|processing|active|completed|cancelled|refunded",
  "instanceId": "uuid|null",
  "metadata": {},
  "createdAt": "timestamp",
  "paidAt": "timestamp"
}
```

### 5.4 实例 (Instance)

```json
{
  "id": "uuid",
  "orderId": "uuid",
  "userId": "uuid",
  "productId": "uuid",
  "status": "pending|creating|running|stopped|terminated",
  "ip": "192.168.1.1",
  "port": 22,
  "credentials": {},
  "startedAt": "timestamp",
  "expiresAt": "timestamp",
  "createdAt": "timestamp"
}
```

---

## 6. 技术栈

### 前端

- **框架:** Next.js 14 (React)
- **样式:** Tailwind CSS + 自定义主题
- **状态:** Zustand
- **表单:** React Hook Form + Zod
- **HTTP:** Axios

### 后端

- **框架:** Express.js / Fastify
- **ORM:** Prisma
- **数据库:** PostgreSQL (1Panel PostgreSQL容器)
- **认证:** JWT + Refresh Token
- **邮件:** Nodemailer

### 部署

- **面板:** 1Panel
- **容器:** Docker + Docker Compose
- **Nginx:** 1Panel自带
- **SSL:** 1Panel Let's Encrypt

---

## 7. API 接口

### 认证

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/auth/register | 注册 |
| POST | /api/auth/login | 登录 |
| POST | /api/auth/logout | 登出 |
| POST | /api/auth/refresh | 刷新Token |
| POST | /api/auth/forgot-password | 忘记密码 |
| GET | /api/auth/me | 当前用户 |

### 产品

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/products | 产品列表 |
| GET | /api/products/:id | 产品详情 |
| GET | /api/products/categories | 分类列表 |

### 订单

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/orders | 创建订单 |
| GET | /api/orders | 订单列表 |
| GET | /api/orders/:id | 订单详情 |
| PATCH | /api/orders/:id/pay | 支付订单 |

### 实例

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/instances | 实例列表 |
| POST | /api/instances/:id/start | 启动实例 |
| POST | /api/instances/:id/stop | 停止实例 |
| DELETE | /api/instances/:id | 删除实例 |

### 管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /admin/users | 用户列表 |
| PATCH | /admin/users/:id | 修改用户 |
| GET | /admin/orders | 所有订单 |
| PATCH | /admin/products | 管理产品 |

---

## 8. 部署步骤

### 8.1 1Panel 安装

```bash
# 在Ubuntu服务器上安装1Panel
curl -sSL https://get.1panel.cn | bash
```

### 8.2 1Panel 配置

1. 登录1Panel管理界面
2. 安装应用:
   - PostgreSQL (数据库)
   - Nginx (Web服务器)
   - Docker (容器)
3. 创建网站: dencone.com
4. 配置SSL证书

### 8.3 部署应用

```bash
# 1. 克隆项目
git clone https://github.com/your-repo/dencone-gpu.git

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 配置数据库等

# 3. 启动Docker Compose
docker-compose up -d

# 4. 或使用PM2
pm2 start ecosystem.config.js
```

---

## 9. 验收标准

- [ ] 首页正常访问，响应式布局
- [ ] 用户可以注册、登录
- [ ] 产品列表页显示GPU产品
- [ ] 可以创建订单并支付
- [ ] 会员中心显示订单和实例
- [ ] 后台可以管理用户和订单
- [ ] 部署到1Panel后正常运行

---

## 10. 页面设计要点

### 首页英雄区
- 大标题: "Enterprise GPU Cloud at Your Fingertips"
- 副标题: "High-performance GPU instances starting at $0.50/hour"
- CTA按钮: "Get Started" (青色发光效果)
- 背景: 深色+网格线条+GPU图形动画

### 产品卡片
- GPU型号（大字）
- 核心规格（VRAM、CPU、RAM）
- 价格（每小时/每月）
- 库存状态标签
- "Deploy"按钮

### 会员中心
- 左侧导航栏
- 顶部余额显示
- 实例卡片（状态指示器：绿色running/灰色stopped）
- 快捷操作按钮
