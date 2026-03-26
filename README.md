# 拼豆图纸生成器

一个在线拼豆图纸生成工具，可以将图片转换为拼豆图纸。

## 功能特点

- 🎨 上传图片自动生成拼豆图纸
- 📐 支持自定义画布尺寸（10-100像素）
- 🎯 智能颜色匹配算法
- 📊 颜色统计和导出
- 💾 支持下载图纸（PNG格式）
- 📱 移动端友好设计

## 在线使用

访问：[你的Vercel部署链接]

## 本地开发

直接打开 `index.html` 文件即可在浏览器中使用。

## 部署到 Vercel

### 方法一：通过 GitHub（推荐）

1. **创建 GitHub 仓库**
   ```bash
   # 在项目目录下执行
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/拼豆图纸生成器.git
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录
   - 点击 "Add New Project"
   - 选择你的仓库
   - 点击 "Deploy"
   - 完成！

### 方法二：通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```
   按照提示操作即可。

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Canvas API

## 许可证

MIT
