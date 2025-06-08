# Tailwind CSS v4 Migration Guide

## Overview
This guide documents the migration from Tailwind CSS v3 to v4 for the NextPortfolio project. The main change in v4 is that configuration moves from JavaScript/TypeScript files to CSS files.

## Files Created/Modified

### New Files:
1. **`app/animations.css`** - Contains all custom animations migrated from `tailwind.config.ts`
2. **`tailwind-v4.css`** - New v4 configuration file (will replace `tailwind.config.ts`)
3. **`MIGRATION_GUIDE.md`** - This file

### Modified Files:
1. **`app/globals.css`** - Added import for animations.css

## Migration Steps

### Step 1: Backup Current Configuration
The current `tailwind.config.ts` is preserved as-is for now.

### Step 2: Extract Animations
All keyframes and animations from `tailwind.config.ts` have been moved to `app/animations.css`:

- `accordion-down` / `accordion-up` - For collapsible components
- `spin-around` - Spinning animation with custom speed
- `slide` - Sliding animation for elements
- `marquee` / `marquee-vertical` - Scrolling text/content animations
- `meteor` - Meteorite-style animation effect
- `orbit` - Orbital motion animation
- `grid` - Grid-based animation
- `ripple` - Ripple effect animation
- `move` - Path-based movement animation
- `k` - Custom property-based animation for particles

### Step 3: Create v4 Configuration
The new `tailwind-v4.css` file contains:
- Color definitions using CSS custom properties
- Container configuration
- Breakpoint definitions
- Custom utilities

### Step 4: Performance Optimizations
Added performance optimizations to animations:
- `will-change` properties for GPU acceleration
- `transform-style: preserve-3d` for 3D transforms
- `backface-visibility: hidden` for smoother animations

## Breaking Changes Addressed

### 1. Configuration Format
- **v3**: JavaScript/TypeScript configuration object
- **v4**: CSS-based configuration using `@theme` directive

### 2. Animation Definitions
- **v3**: Defined in `theme.extend.keyframes` and `theme.extend.animation`
- **v4**: Defined directly in CSS files as `@keyframes` and utility classes

### 3. Custom Utilities
- **v3**: Added via plugins in configuration
- **v4**: Defined in `@layer utilities` in CSS

## Component Compatibility

All existing components should continue to work without changes:
- `components/magicui/marquee.tsx` - Uses `animate-marquee` and `animate-marquee-vertical`
- `components/magicui/orbiting-circles.tsx` - Uses `animate-orbit`
- `components/magicui/ripple.tsx` - Uses `animate-ripple`
- Other components using custom animations

## CSS Variables Maintained

All CSS custom properties are preserved:
- `--duration` - For animation timing
- `--gap` - For spacing in marquee animations
- `--radius` - For orbital animations
- `--speed` - For spin and slide animations

## Testing Checklist

After migration to v4:
- [ ] Marquee animations work correctly
- [ ] Orbit animations function properly
- [ ] Ripple effects display correctly
- [ ] All custom colors are applied
- [ ] Dark mode transitions work
- [ ] Responsive breakpoints function
- [ ] Performance is maintained or improved

## Rollback Plan

If issues arise during migration:
1. Revert `app/globals.css` to remove the animations import
2. Keep using the current `tailwind.config.ts`
3. Remove `app/animations.css` and `tailwind-v4.css`

## When to Complete Migration

Complete the migration when:
1. Tailwind CSS v4 is stable and released
2. All dependencies support v4
3. Testing confirms all animations work correctly
4. Team is ready for the new configuration format

## Additional Notes

- All animations include backwards compatibility
- Performance optimizations are included
- CSS custom properties make animations easily customizable
- The migration maintains all existing functionality
- Code is organized for easy maintenance

## Commands for Migration Day

When ready to migrate to v4:

```bash
# Install Tailwind CSS v4 (when available)
npm install tailwindcss@next

# Remove old config file
rm tailwind.config.ts

# Rename v4 config
mv tailwind-v4.css tailwind.css

# Update package.json build scripts if needed
```
