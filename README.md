<div align="center">

# 🧬 Next.js 15 Enterprise BioTech Portfolio

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-0EA5E9?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-10B981?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React RC](https://img.shields.io/badge/React-19.0.0_RC-10B981?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.14-0EA5E9?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy_Ready-10B981?style=for-the-badge&logo=vercel)](https://vercel.com)

[![Umami Analytics](https://img.shields.io/badge/Analytics-Umami-0EA5E9?style=for-the-badge)](https://umami.is)
[![GitHub Workflow](https://img.shields.io/badge/CI/CD-GitHub_Actions-10B981?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)
[![ESLint](https://img.shields.io/badge/ESLint-9.13.0-0EA5E9?style=for-the-badge&logo=eslint)](https://eslint.org)

[Live Demo](https://imartindev.me) • [Projects Demo](https://projects.imartin.dev) • [One-Click Deploy](#-quick-deploy)

![BioTech Portfolio Preview](./Images/readme-img1.png)

</div>

## 🧬 Theme Configuration

```typescript
// tailwind.config.ts
const colors = {
  biotech: {
    // Professional biotech greens
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#10B981', // Main brand color
      500: '#059669',
      600: '#047857',
      700: '#065f46',
      800: '#064e3b',
      900: '#022c22',
    },
    // Secondary colors
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#0EA5E9', // Accent color
      500: '#0284c7',
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
    },
    // Accent colors for data visualization
    accent: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0EA5E9',
    }
  }
};

export default {
  theme: {
    extend: {
      colors,
      animation: {
        "dna-helix": "dna-helix 20s linear infinite",
        "molecule-float": "molecule-float 8s ease-in-out infinite",
      },
    },
  },
} satisfies Config;
```

[Previous content remains the same but with updated color references...]

## 🎨 Component Example

```tsx
import { Button } from "@/components/ui/button"

export function BioTechButton() {
  return (
    <Button 
      className="
        bg-biotech-primary-400 
        hover:bg-biotech-primary-500 
        text-white 
        transition-colors 
        duration-200
      "
    >
      Analyze Data
    </Button>
  );
}
```

## 🧪 Data Visualization Example

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function BioMetricsChart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="name" stroke="#10B981" />
      <YAxis stroke="#10B981" />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: '#f0fdf4',
          border: '1px solid #10B981' 
        }} 
      />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#10B981" 
        strokeWidth={2} 
      />
    </LineChart>
  );
}
```

[Rest of the content remains the same but with updated color values...]

---

<div align="center">
  <sub>Built with 🧬 by <a href="https://github.com/iMartinDav">Martin DAVILA</a></sub>
</div>
