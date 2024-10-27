<div align="center">

# 🧬 Next.js 15 BioTech Portfolio Template

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-8B5CF6?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-4ADE80?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0_RC-4ADE80?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.14-8B5CF6?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-4ADE80?style=for-the-badge)](https://ui.shadcn.com)

[![Analytics](https://img.shields.io/badge/Analytics-Umami-8B5CF6?style=for-the-badge)](https://umami.is)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/iMartinDav/NextPortfolio/ci.yml?branch=main&style=for-the-badge&logo=github-actions)](https://github.com/iMartinDav/NextPortfolio/actions)
[![License](https://img.shields.io/github/license/iMartinDav/NextPortfolio?style=for-the-badge)](LICENSE)

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-4ADE80?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FiMartinDav%2FNextPortfolio)
[![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-8B5CF6?style=for-the-badge&logo=stackblitz)](https://stackblitz.com/github/iMartinDav/NextPortfolio)

[Portfolio Demo](https://imartindev.me) • [Projects Showcase](https://projects.imartin.dev) • [Documentation](https://github.com/iMartinDav/NextPortfolio/wiki) • [Report Bug](https://github.com/iMartinDav/NextPortfolio/issues)

![BioTech Portfolio Preview](./Images/readme-img1.png)

</div>

## 🧬 Architecture Overview

This portfolio is split into two main repositories:

1. **Main Portfolio ([imartin.dev](https://www.imartin.dev))**
   - Personal information
   - Blog posts
   - Contact information
   - Analytics dashboard

2. **Projects Showcase ([projects.imartin.dev](https://projects.imartin.dev))**
   - Detailed project case studies
   - Live demos
   - Technical documentation
   - Repository: [github.com/iMartinDav/projects.imartin.dev](https://github.com/iMartinDav/projects.imartin.dev)

## 📊 Analytics

This template integrates [Umami Analytics](https://umami.is/), a privacy-focused alternative to Google Analytics:

- GDPR Compliant
- No cookies required
- Lightweight (~1KB)
- Real-time data
- Custom events tracking

```env
# Umami Configuration
NEXT_PUBLIC_UMAMI_ID=your-umami-id
NEXT_PUBLIC_UMAMI_URL=your-umami-url
```

## ✨ Features

- 🧬 **BioTech-Inspired Design** - Green and purple color scheme with molecular animations
- 🏃‍♂️ **[Next.js 15](https://nextjs.org/)** - Latest features including App Router and Server Components
- 📝 **[MDX Blog](https://mdxjs.com/)** - Write blog posts with MDX
- 🎨 **[shadcn/ui](https://ui.shadcn.com/)** - Customized with biotech theme
- 📊 **[Umami Analytics](https://umami.is/)** - Privacy-focused analytics
- 🌙 **Dark Mode** - Biotech-themed dark mode
- 🚀 **Multi-Repo Architecture** - Separated concerns for better maintenance

## 🎨 Theme Configuration

```typescript
// tailwind.config.ts
const colors = {
  primary: {
    DEFAULT: "#4ADE80", // Bio green
    dark: "#22C55E",
  },
  secondary: {
    DEFAULT: "#8B5CF6", // Purple
    dark: "#7C3AED",
  },
  // ... other colors
};

export default {
  theme: {
    extend: {
      colors,
      animation: {
        "dna-spin": "dna-spin 20s linear infinite",
      },
      // ... other customizations
    },
  },
} satisfies Config;
```

## 🚀 Quick Start

1. **Clone both repositories**
```bash
git clone https://github.com/iMartinDav/NextPortfolio.git
git clone https://github.com/iMartinDav/projects.imartin.dev.git
```

2. **Install dependencies for both**
```bash
# Main portfolio
cd NextPortfolio
pnpm install

# Projects showcase
cd ../projects.imartin.dev
pnpm install
```

3. **Configure environment variables**
```bash
# For both repositories
cp .env.example .env.local
```

4. **Start development servers**
```bash
# Run both concurrently in different terminals
pnpm dev
```

## 📁 Project Structure

```
NextPortfolio/
├── app/
│   ├── blog/              # MDX blog posts
│   ├── analytics/         # Umami dashboard
│   └── page.tsx           # Home page
└── ...

projects.imartin.dev/
├── app/
│   ├── projects/         # Project showcases
│   ├── demos/           # Live project demos
│   └── page.tsx         # Projects home
└── ...
```

[Rest of the README content remains similar but with biotech theming...]

## 🤝 Contributing

Contributions are welcome to both repositories:
- [Main Portfolio](https://github.com/iMartinDav/NextPortfolio)
- [Projects Showcase](https://github.com/iMartinDav/projects.imartin.dev)

---

<div align="center">
  <sub>Built with 🧬 by <a href="https://github.com/iMartinDav">Martin DAVILA</a></sub>
</div>
