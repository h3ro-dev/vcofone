# VCofOne Design System

A comprehensive design system for the VCofOne application, featuring a complete color palette, typography, spacing, shadows, and component tokens, all integrated with Tailwind CSS.

## 🎨 Color Palette

### Primary Colors - Utlyze Blue (#4169E1)
- **primary-50** to **primary-950**: Full range of blue shades
- Main brand color: `primary-500` (#4169E1)

### Accent Colors - Green (#00A878)
- **accent-50** to **accent-950**: Full range of green shades
- Main accent color: `accent-500` (#00A878)

### Semantic Colors
- **Success**: Green tones for positive feedback
- **Warning**: Amber/yellow tones for cautions
- **Error**: Red tones for errors
- **Info**: Blue tones for informational messages
- **Neutral**: Gray scale for UI elements

## 📐 Typography

### Font Families
- **Sans**: Inter (primary), with system fallbacks
- **Mono**: Fira Code for code blocks

### Font Sizes
From `xs` (12px) to `9xl` (128px) with optimized line heights:
```css
text-xs    /* 12px */
text-sm    /* 14px */
text-base  /* 16px */
text-lg    /* 18px */
text-xl    /* 20px */
text-2xl   /* 24px */
/* ... up to text-9xl */
```

## 🔧 Integration with Tailwind CSS

### 1. Setup

The design system is automatically integrated when you import it in your Tailwind config:

```typescript
// tailwind.config.ts
import { getTailwindExtension } from './src/styles/design-system';

const config = {
  theme: {
    extend: {
      ...getTailwindExtension(),
    },
  },
  // ... rest of config
};
```

### 2. Using Design Tokens

#### With Tailwind Classes
```jsx
// Colors
<div className="bg-primary-500 text-white">Utlyze Blue Background</div>
<div className="bg-accent-500 text-white">Accent Green Background</div>

// Shadows
<div className="shadow-elevation-2">Elevated Card</div>

// Spacing
<div className="p-6 mt-8">Consistent spacing</div>

// Typography
<h1 className="text-3xl font-semibold">Heading</h1>
```

#### Direct Import for Custom Styling
```typescript
import { colors, spacing, typography } from '@/styles/design-system';

const customStyles = {
  backgroundColor: colors.primary[500],
  padding: spacing[4],
  fontSize: typography.fontSize.lg[0],
};
```

## 🧩 Component Tokens

Pre-defined component configurations for consistency:

### Buttons
```typescript
components.button = {
  padding: { sm, md, lg },
  fontSize: { sm, md, lg },
  borderRadius: '6px',
  fontWeight: '500'
}
```

### Cards
```typescript
components.card = {
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: 'medium',
  background: 'neutral-50',
  border: '1px solid neutral-200'
}
```

### Inputs
```typescript
components.input = {
  padding: { sm, md, lg },
  borderRadius: '6px',
  borderColor: 'neutral-300',
  focusBorderColor: 'primary-500'
}
```

## 🎭 Animations

Built-in animations with Tailwind:
- `animate-fade-in` / `animate-fade-out`
- `animate-slide-in` / `animate-slide-out`
- `animate-scale-in` / `animate-scale-out`

## 📱 Responsive Design

Standard breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 💡 Usage Examples

### Basic Button
```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-md font-medium transition-colors">
  Get Started
</button>
```

### Card Component
```jsx
<div className="p-6 bg-white rounded-lg shadow-elevation-2 border border-neutral-200">
  <h2 className="text-xl font-semibold text-neutral-900">Card Title</h2>
  <p className="text-neutral-600 mt-2">Card content goes here.</p>
</div>
```

### Form Input
```jsx
<input
  type="email"
  className="w-full px-3.5 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
  placeholder="Enter your email"
/>
```

### Status Messages
```jsx
// Success
<div className="p-4 bg-success-50 border border-success-200 rounded-md">
  <p className="text-success-800">Operation successful!</p>
</div>

// Error
<div className="p-4 bg-error-50 border border-error-200 rounded-md">
  <p className="text-error-800">An error occurred.</p>
</div>
```

## 🚀 Best Practices

1. **Use semantic color names** - Use `primary`, `accent`, `success`, etc. instead of hardcoding colors
2. **Consistent spacing** - Use the spacing scale (4, 6, 8, etc.) for margins and padding
3. **Typography hierarchy** - Use the defined font sizes and weights for consistency
4. **Elevation levels** - Use `shadow-elevation-{1-5}` for consistent depth
5. **Responsive design** - Always consider mobile-first approach with Tailwind's responsive utilities

## 📦 TypeScript Support

The design system exports TypeScript types for all tokens:

```typescript
import type { Colors, Typography, Spacing } from '@/styles/design-system';
```

This ensures type safety when using the design tokens directly in your components.

## 🔗 Additional Resources

- See `design-system-usage-example.tsx` for comprehensive examples
- Check `design-system.ts` for all available tokens
- Review `tailwind.config.ts` for Tailwind integration details