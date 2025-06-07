# Testimonials Components

A comprehensive set of testimonial components for the vCFO of One website, designed to showcase client success stories and build trust with potential customers.

## Components Overview

### 1. TestimonialCard
Individual testimonial card component with support for ratings, metrics, and featured variants.

**Props:**
- `testimonial`: Testimonial object containing all testimonial data
- `variant`: 'default' | 'featured' - Visual style variant

**Features:**
- 5-star rating display
- Client avatar with initials
- Results metrics display
- Featured badge for highlighted testimonials
- Responsive design

### 2. TestimonialsSection
Full-page testimonials section with grid layout and filtering capabilities.

**Props:**
- `showAll`: boolean - Whether to show all testimonials initially (default: false)
- `maxItems`: number - Maximum items to show before "Show More" (default: 6)

**Features:**
- Stats bar showing aggregate metrics
- Featured testimonials highlight
- Expandable grid with "Show More" functionality
- Built-in CTA section
- Responsive grid layout (1-3 columns)

### 3. TestimonialsCarousel
Carousel/slider version of testimonials with auto-play functionality.

**Props:**
- `autoPlay`: boolean - Enable auto-play (default: true)
- `autoPlayInterval`: number - Interval in milliseconds (default: 5000)

**Features:**
- Smooth slide transitions
- Navigation arrows
- Dot indicators
- Auto-play with pause on hover
- Trust indicators section
- Fully accessible with ARIA labels

### 4. TestimonialsWidget
Compact testimonial widget for sidebars or smaller sections.

**Props:**
- `maxItems`: number - Number of testimonials to show (default: 3)
- `title`: string - Widget title (default: "What Clients Say")

**Features:**
- Compact design
- Truncated testimonial content
- Quick stats display
- "View All" link

## Usage Examples

### Basic TestimonialsSection
```tsx
import { TestimonialsSection } from '@/components/testimonials';

export default function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <TestimonialsSection />
    </main>
  );
}
```

### Testimonials Carousel
```tsx
import { TestimonialsCarousel } from '@/components/testimonials';

export default function AboutPage() {
  return (
    <main>
      {/* Other sections */}
      <TestimonialsCarousel autoPlayInterval={7000} />
    </main>
  );
}
```

### Sidebar Widget
```tsx
import { TestimonialsWidget } from '@/components/testimonials';

export default function BlogSidebar() {
  return (
    <aside>
      {/* Other widgets */}
      <TestimonialsWidget maxItems={5} title="Success Stories" />
    </aside>
  );
}
```

### Custom Implementation with Individual Cards
```tsx
import { TestimonialCard } from '@/components/testimonials';
import { getFeaturedTestimonials } from '@/data/testimonials';

export default function CustomSection() {
  const featured = getFeaturedTestimonials();
  
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map(testimonial => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            variant="featured"
          />
        ))}
      </div>
    </section>
  );
}
```

## Data Structure

Testimonials follow this TypeScript interface:

```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  featured?: boolean;
  results?: {
    metric: string;
    value: string;
  }[];
}
```

## Styling

All components use:
- Tailwind CSS for styling
- Design system tokens from `@/styles/design-system`
- Primary color: Utlyze Blue (#4169E1)
- Accent color: Green (#00A878)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy
- Color contrast compliant

## Performance Considerations

- Lazy loading ready (images when added)
- Optimized re-renders with React hooks
- CSS transitions for smooth animations
- Minimal JavaScript for static sections

## Future Enhancements

1. **Image Support**: Add client photos when available
2. **Video Testimonials**: Embed video testimonials
3. **Industry Filtering**: Filter by business type/industry
4. **API Integration**: Load testimonials from backend
5. **Social Proof**: Integration with review platforms
6. **Analytics**: Track testimonial engagement