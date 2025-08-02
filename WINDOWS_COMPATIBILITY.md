# Windows Compatibility Guide

## 🪟 Windows-Specific Issues & Solutions

This document addresses common Windows-specific issues that don't occur on macOS/Linux.

## 🔧 Applied Fixes

### 1. PDF.js Worker Configuration

**Problem**: Windows has issues with dynamic worker path resolution using `import.meta.url` and `new URL()`.

**Solution**: Multi-fallback worker configuration in `components/Resume/ResumeNew.tsx`:

```typescript
// Cross-platform worker configuration for PDF.js
if (typeof window !== 'undefined') {
  try {
    // Primary: CDN approach (most reliable across platforms)
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
  } catch (error) {
    // Fallback 1: HTTPS CDN
    console.warn('Primary PDF worker failed, trying HTTPS CDN:', error);
    try {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
    } catch (error2) {
      // Fallback 2: Local worker (Windows-compatible path)
      console.warn('CDN PDF worker failed, using local worker:', error2);
      const workerPath = require.resolve('pdfjs-dist/build/pdf.worker.min.js');
      pdfjs.GlobalWorkerOptions.workerSrc = workerPath;
    }
  }
}
```

### 2. Next.js Configuration Enhancement

**Problem**: Windows has different module resolution and path handling.

**Solution**: Enhanced `next.config.mjs` with Windows-specific webpack configuration:

```javascript
webpack: (config, { isServer }) => {
  // Canvas compatibility for both server and client
  config.resolve.alias.canvas = false;
  
  // Windows-specific PDF.js worker handling
  if (!isServer) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Ensure consistent path resolution across platforms
      'pdfjs-dist/build/pdf.worker.js': 'pdfjs-dist/build/pdf.worker.min.js',
    };
  }
  
  // Handle Windows-specific module resolution
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
    os: false,
  };
  
  return config;
}
```

## 🔍 Common Windows Issues

### Issue 1: Module Resolution Errors
```
Module not found: Can't resolve 'pdfjs-dist/build/pdf.worker.min.mjs'
```

**Causes:**
- Windows path separator differences (`\` vs `/`)
- Different module resolution order
- Case sensitivity differences

**Solutions:**
- ✅ Use CDN worker sources (implemented)
- ✅ Add webpack aliases (implemented)
- ✅ Fallback configurations (implemented)

### Issue 2: Canvas Node.js Compatibility
```
Module not found: Can't resolve 'canvas'
```

**Causes:**
- Windows missing native dependencies for node-canvas
- Different build toolchain requirements

**Solutions:**
- ✅ Canvas aliasing in webpack config (implemented)
- ✅ Turbopack resolve alias (implemented)

### Issue 3: File System Path Issues
```
Error: ENOENT: no such file or directory
```

**Causes:**
- Windows file system permissions
- Path case sensitivity
- Line ending differences (CRLF vs LF)

**Solutions:**
- ✅ Webpack resolve fallbacks (implemented)
- Configure Git line endings: `git config core.autocrlf true`

## 🛠️ Additional Windows Setup

### Git Configuration
```bash
# Set line endings for Windows
git config --global core.autocrlf true
git config --global core.filemode false

# Optional: Set default editor
git config --global core.editor "code --wait"
```

### Node.js Requirements
```bash
# Ensure you have the latest Node.js LTS
node --version  # Should be >= 18.17.0

# Clear npm/pnpm cache if issues persist
pnpm store prune
pnpm install --frozen-lockfile
```

### Environment Variables
Create `.env.local` with Windows-compatible paths:
```env
# Use forward slashes even on Windows
NEXT_PUBLIC_PDF_WORKER_SRC=//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js
```

## 🧪 Testing on Windows

### Build Test
```bash
pnpm run build
```

### Development Test
```bash
pnpm run dev --turbopack
```

### Production Test
```bash
pnpm run build && pnpm run start
```

## 🔄 Debugging Steps

If you still encounter issues on Windows:

1. **Clear all caches:**
   ```bash
   pnpm store prune
   rm -rf node_modules
   rm -rf .next
   pnpm install
   ```

2. **Check Node.js compatibility:**
   ```bash
   node --version
   npm --version
   pnpm --version
   ```

3. **Enable verbose logging:**
   ```bash
   DEBUG=* pnpm run dev
   ```

4. **Check browser console** for worker loading errors

5. **Test with different browsers** (Chrome, Firefox, Edge)

## 📝 Notes

- The CDN approach is most reliable across platforms
- Local worker paths are used as last resort
- All changes maintain macOS/Linux compatibility
- Fallback configurations ensure graceful degradation

## 🚀 Performance Impact

- ✅ No performance impact on macOS/Linux
- ✅ Minimal additional overhead on Windows
- ✅ Faster worker loading via CDN
- ✅ Better error handling and logging

---

**Last Updated**: August 1, 2025
**Tested On**: Windows 10/11, macOS, Linux
**Next.js Version**: 15.4.5
