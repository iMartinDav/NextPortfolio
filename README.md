<div align="center">

# 🚀 Next.js 15 Enterprise Portfolio Template

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0_RC-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/UI-shadcn%2Fui-black?style=for-the-badge)](https://ui.shadcn.com)

[![Maintainability](https://img.shields.io/codeclimate/maintainability/iMartinDav/NextPortfolio?style=for-the-badge&logo=code-climate)](https://codeclimate.com)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/iMartinDav/NextPortfolio/ci.yml?branch=main&style=for-the-badge&logo=github-actions)](https://github.com/iMartinDav/NextPortfolio/actions)
[![License](https://img.shields.io/github/license/iMartinDav/NextPortfolio?style=for-the-badge)](LICENSE)

[![Stars](https://img.shields.io/github/stars/iMartinDav/NextPortfolio?style=for-the-badge&logo=github&color=red)](https://github.com/iMartinDav/NextPortfolio/stargazers)
[![Forks](https://img.shields.io/github/forks/iMartinDav/NextPortfolio?style=for-the-badge&logo=github&color=red)](https://github.com/iMartinDav/NextPortfolio/network/members)
[![Canary](https://img.shields.io/badge/Canary%20Build-Enabled-yellow?style=for-the-badge)](https://nextjs.org/docs/deployment#custom-deployment)

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FiMartinDav%2FNextPortfolio)
[![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-1389FD?style=for-the-badge&logo=stackblitz)](https://stackblitz.com/github/iMartinDav/NextPortfolio)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)

[Live Demo](https://imartindav.me) • [Documentation](https://github.com/iMartinDav/NextPortfolio/wiki) • [Report Bug](https://github.com/iMartinDav/NextPortfolio/issues) • [Request Feature](https://github.com/iMartinDav/NextPortfolio/issues)

![Enterprise Architecture Preview](./Images/readme-img1.png)

</div>

## ✨ Features

- 🏃‍♂️ **[Next.js 15](https://nextjs.org/)** - Latest features including App Router and Server Components
- 🎨 **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible components
- 🎯 **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- 🎭 **[Framer Motion](https://www.framer.com/motion/)** - Powerful animations made easy
- 📊 **[Recharts](https://recharts.org/)** - Beautiful and responsive charts
- 🌍 **[React Globe.GL](https://github.com/vasturiano/react-globe.gl)** - 3D globe visualizations
- ✨ **[TSParticles](https://particles.js.org/)** - Stunning particle effects
- 🔍 **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code quality and formatting
- 🐶 **[Husky](https://typicode.github.io/husky/)** - Git hooks made easy
- 📱 **Responsive** - Mobile-first design principles
- 🌙 **Dark Mode** - Built-in dark mode support
- 🚀 **Performance** - Optimized for Core Web Vitals

## 📦 Tech Stack

```typescript
interface TechStack {
  framework: {
    name: string;
    version: string;
    features: string[];
  };
  ui: {
    components: string;
    styling: string;
    animations: string[];
  };
  state: string[];
  form: string[];
  visualization: string[];
  development: string[];
}

const stack: TechStack = {
  framework: {
    name: "Next.js",
    version: "15.0.1",
    features: ["App Router", "Server Components", "Turbopack"],
  },
  ui: {
    components: "shadcn/ui with Radix UI primitives",
    styling: "TailwindCSS 3.4.14",
    animations: ["Framer Motion", "Motion One", "React Spring"],
  },
  state: ["React Hook Form", "React Hookz"],
  form: ["Zod", "Hook Form Resolvers"],
  visualization: ["Recharts", "React Globe.GL", "TSParticles"],
  development: ["TypeScript 5.6.3", "ESLint 9", "Prettier 3"],
};
```

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/iMartinDav/NextPortfolio.git
cd NextPortfolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
pnpm dev
```

5. **Build for production**
```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx             # Root layout with shadcn/ui providers
│   └── page.tsx              # Home page
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── custom/              # Custom components
├── lib/
│   ├── utils.ts             # Utility functions
│   └── constants.ts         # Constants
├── styles/
│   └── globals.css          # Global styles + Tailwind
└── types/
    └── index.d.ts           # Type definitions
```

## ⚙️ Configuration

### Environment Variables
```env
# Required
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_UMAMI_ID=
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
import { Config } from 'tailwindcss'

export default {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
```

## 🧩 Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components. Here's an example:

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
          <DialogDescription>
            Comprehensive project information with shadcn/ui components.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

## 🔧 Development Workflow

### Code Quality

We use Husky to enforce code quality:

1. **Pre-commit hooks** check for:
   - Linting errors
   - Type checking
   - Formatting issues
   - Conventional commits

2. **Setup Husky**
```bash
pnpm prepare
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: bug fix
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add/update tests
chore: maintenance tasks
```

## 🚀 Deployment

### Vercel (Recommended)
1. Click the "Deploy with Vercel" button above
2. Follow the Vercel deployment steps
3. Configure your environment variables

### Manual Deployment
1. Build the project:
```bash
pnpm build
```
2. Start the production server:
```bash
pnpm start
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💝 Support

If this template helps your development workflow, consider:

- ⭐ Starring the repository
- 🔄 Forking it for your own projects
- 🎁 Supporting development:

<a href="https://www.buymeacoffee.com/iMartinDav" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" height="60" width="217">
</a>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [shadcn](https://ui.shadcn.com/)
- [Vercel](https://vercel.com)
- All our amazing contributors

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/iMartinDav">Martin DAVILA</a></sub>
</div>
