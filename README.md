# Boooks

一个专注于哈尔滨工程大学核专业的资源导航网站。

## 功能特性

- 📚 专业书籍资源导航
- 🔍 智能搜索和分类筛选
- 📱 响应式设计，支持移动端
- 🌓 深色模式支持
- 📥 在线预览和下载
- 📮 资源请求功能

## 技术栈

- Nuxt 3
- Vue 3
- TypeScript
- Tailwind CSS
- Shadcn Vue
- Tencent COS

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 环境变量

创建 `.env` 文件并配置以下环境变量：

```properties
# Tencent COS Config
COS_SECRET_ID=your_secret_id
COS_SECRET_KEY=your_secret_key
COS_REGION=your_region
COS_BUCKET=your_bucket

# SMTP Config
NUXT_NODEMAILER_AUTH_PASS=your_smtp_password
```

## 部署

```bash
# 构建
pnpm build

# 预览
pnpm preview
```
