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

## License

[MIT License](LICENSE)

Copyright (c) 2024-2025 hanasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
