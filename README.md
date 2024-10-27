<div align="center">

# 🧬 BioTech Portfolio Platform | Next.js 15 Enterprise Solution

> Modern, high-performance portfolio platform integrated with projects.imartin.dev for showcases and blog content

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-8B5CF6?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-4ADE80?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0_RC-4ADE80?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.14-8B5CF6?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy_Ready-4ADE80?style=for-the-badge&logo=vercel)](https://vercel.com)

[![Maintainability](https://img.shields.io/codeclimate/maintainability/iMartinDav/NextPortfolio?style=for-the-badge&logo=code-climate)](https://codeclimate.com)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/iMartinDav/NextPortfolio/ci.yml?branch=main&style=for-the-badge&logo=github-actions)](https://github.com/iMartinDav/NextPortfolio/actions)
[![License](https://img.shields.io/github/license/iMartinDav/NextPortfolio?style=for-the-badge)](LICENSE)

[🌐 Live Demo](https://imartin.dev) • [📚 Documentation](https://github.com/iMartinDav/NextPortfolio/wiki) • [🐛 Report Bug](https://github.com/iMartinDav/NextPortfolio/issues) • [✨ Request Feature](https://github.com/iMartinDav/NextPortfolio/issues)

![BioTech Portfolio Preview](./Images/readme-img1.png)

</div>

## 📋 Table of Contents
- [About](#about)
- [Repository Structure](#repository-structure)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Deploy](#quick-deploy)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Contributing](#contributing)
- [License](#license)

## 🔍 About

This Next.js 15 Enterprise Portfolio Platform is specifically designed for BioTech professionals and researchers. It provides a modern, high-performance solution for showcasing professional achievements, research papers, and scientific projects.

## 🏗️ Repository Structure

This portfolio is integrated with a dedicated projects and blog platform:

- **Main Portfolio**: Current repository - Core portfolio website
- **Projects & Blog Platform**: [`projects.imartin.dev`](https://github.com/iMartinDav/projects.imartin.dev)
  - Showcases detailed project presentations
  - Hosts the blog content
  - Seamlessly integrated with the main portfolio
  - Independently deployable and maintainable

The projects and blog sections in this portfolio link directly to [`projects.imartin.dev`](https://github.com/iMartinDav/projects.imartin.dev), providing a seamless user experience while maintaining separation of concerns.

## 🎯 Key Features

### 💻 Core Platform Features
- **Advanced UI Components**
  - Radix UI primitives for accessibility
  - Framer Motion animations
  - Interactive 3D Globe visualization
  - Particle effects system
  - PDF viewing capabilities
  - Parallax scrolling effects

### 🔗 Integration Features
- Seamless integration with projects.imartin.dev
- Dynamic project showcase loading
- Integrated blog feed
- Unified navigation experience
- Shared authentication system
- Cross-platform analytics

### ⚡ Performance Optimizations
- Next.js 15 App Router implementation
- Turbopack for lightning-fast builds
- React Server Components
- Optimized asset loading & caching
- Response time < 100ms

### 📊 Analytics & Monitoring
- Privacy-focused Umami Analytics
- Real-time dashboard
- Custom event tracking
- Performance metrics

## 🛠️ Tech Stack

```typescript
const techStack = {
  core: {
    framework: "Next.js 15.0.1 (with Turbopack)",
    runtime: "React 19.0.0 RC",
    language: "TypeScript 5.6.3",
    styling: "TailwindCSS 3.4.14",
  },
  features: {
    ui: [
      "Radix UI Primitives",
      "Framer Motion",
      "React Globe.GL",
      "TSParticles",
    ],
    forms: ["React Hook Form", "Zod Validation"],
    pdf: ["@react-pdf/renderer", "PSPDFKit"],
    visualization: ["Recharts", "React GitHub Calendar"],
    effects: [
      "React Parallax Tilt",
      "React Scroll Parallax",
      "Typewriter Effect",
    ],
  },
  analytics: "Umami",
  deployment: "Vercel",
  quality: {
    linting: "ESLint 9",
    formatting: "Prettier 3",
    commitChecks: "Husky + Commitlint",
  },
};
```

## ⚡ Quick Deploy

### One-Click Vercel Deployment

1. Click the deploy button below:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iMartinDav/NextPortfolio)

2. Configure environment variables:
   ```env
   NEXT_PUBLIC_UMAMI_ID=your-umami-id
   NEXT_PUBLIC_UMAMI_URL=your-umami-url
   ```

## 🚀 Local Development

```bash
# Clone repository
git clone https://github.com/iMartinDav/NextPortfolio.git
cd NextPortfolio

# Install dependencies
pnpm install

# Start development server (with Turbopack)
pnpm dev

# Production build
pnpm build
pnpm start
```

## 📁 Project Structure

```
.
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── [lang]/            # i18n support
├── components/
│   ├── ui/                # Radix UI components
│   ├── sections/          # Page sections
│   └── visualizations/    # Charts & globe
├── lib/
│   ├── analytics.ts       # Umami setup
│   └── utils/             # Helper functions
├── public/
│   └── assets/           # Static assets
└── styles/
    └── globals.css       # Global styles
```

## ⚙️ Environment Setup

```env
# Required
NEXT_PUBLIC_UMAMI_ID=
NEXT_PUBLIC_UMAMI_URL=

# Optional
NEXT_PUBLIC_GITHUB_TOKEN=
NEXT_PUBLIC_CONTACT_EMAIL=
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Built with 🧬 by <a href="https://github.com/iMartinDav">Martin DAVILA</a></sub>
</div>
