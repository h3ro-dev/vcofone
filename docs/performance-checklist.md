# vCFO Performance Checklist

## Pre-Development Checklist

- [ ] Review performance budget and constraints
- [ ] Identify critical user paths for optimization
- [ ] Set up performance monitoring tools
- [ ] Configure build optimization settings

## Component Development

### React Components
- [ ] Use `React.memo()` for pure components that re-render frequently
- [ ] Implement `useMemo()` for expensive calculations
- [ ] Use `useCallback()` for stable function references
- [ ] Avoid inline function definitions in render
- [ ] Implement proper key props for lists
- [ ] Use React.lazy() for code splitting large components

### State Management
- [ ] Minimize state updates that trigger re-renders
- [ ] Use local state when possible instead of global
- [ ] Implement proper state normalization
- [ ] Avoid deeply nested state objects
- [ ] Use state selectors to minimize re-renders

## Images & Media

- [ ] Use Next.js Image component for all images
- [ ] Specify width and height to prevent layout shift
- [ ] Implement lazy loading for below-fold images
- [ ] Use appropriate image formats (WebP/AVIF)
- [ ] Optimize image sizes before upload
- [ ] Implement responsive images with srcset
- [ ] Add blur placeholders for better perceived performance

## API & Data Fetching

- [ ] Implement request caching strategies
- [ ] Use pagination for large data sets
- [ ] Implement proper error boundaries
- [ ] Add loading states for all async operations
- [ ] Use optimistic updates where appropriate
- [ ] Implement request debouncing/throttling
- [ ] Cancel requests on component unmount

## CSS & Styling

- [ ] Use CSS-in-JS sparingly
- [ ] Implement critical CSS inlining
- [ ] Remove unused CSS
- [ ] Use CSS containment for complex layouts
- [ ] Avoid expensive CSS selectors
- [ ] Use transform/opacity for animations
- [ ] Implement proper CSS loading strategy

## JavaScript Bundle

- [ ] Enable tree shaking
- [ ] Implement code splitting by route
- [ ] Lazy load third-party libraries
- [ ] Remove console logs in production
- [ ] Minimize main thread work
- [ ] Use Web Workers for heavy computations
- [ ] Implement proper polyfill strategy

## Fonts

- [ ] Use font-display: swap
- [ ] Preload critical fonts
- [ ] Subset fonts to required characters
- [ ] Use variable fonts when possible
- [ ] Implement fallback fonts
- [ ] Host fonts locally when possible

## Third-Party Scripts

- [ ] Load scripts asynchronously
- [ ] Use defer/async attributes appropriately
- [ ] Implement facade pattern for heavy embeds
- [ ] Load scripts only when needed
- [ ] Monitor third-party script impact
- [ ] Use resource hints (dns-prefetch, preconnect)

## Caching

- [ ] Implement proper cache headers
- [ ] Use service worker for offline support
- [ ] Cache API responses appropriately
- [ ] Implement stale-while-revalidate pattern
- [ ] Use CDN for static assets
- [ ] Enable browser caching
- [ ] Implement cache invalidation strategy

## Performance Testing

- [ ] Run Lighthouse audits regularly
- [ ] Test on real devices
- [ ] Monitor Core Web Vitals
- [ ] Test with slow network conditions
- [ ] Profile JavaScript execution
- [ ] Monitor bundle size changes
- [ ] Set up performance budgets

## Production Deployment

- [ ] Enable production optimizations
- [ ] Configure CDN properly
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Implement proper compression (Brotli/Gzip)
- [ ] Configure proper security headers
- [ ] Set up monitoring and alerting
- [ ] Enable error tracking

## Monitoring & Maintenance

- [ ] Monitor real user metrics (RUM)
- [ ] Track performance regressions
- [ ] Review performance reports weekly
- [ ] Update dependencies regularly
- [ ] Audit third-party scripts quarterly
- [ ] Review and update caching strategies
- [ ] Keep documentation updated

## Quick Wins

1. **Enable Next.js Image Optimization**
   ```jsx
   import Image from 'next/image'
   <Image src="/hero.jpg" width={1200} height={600} priority />
   ```

2. **Implement Debouncing**
   ```typescript
   import { useDebounce } from '@/utils/performance'
   const debouncedSearch = useDebounce(handleSearch, 300)
   ```

3. **Add Loading States**
   ```jsx
   {loading ? <Skeleton /> : <Content />}
   ```

4. **Use Dynamic Imports**
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Spinner />,
   })
   ```

5. **Optimize Re-renders**
   ```jsx
   const MemoizedComponent = memo(Component, (prev, next) => {
     return prev.id === next.id
   })
   ```

## Red Flags to Avoid

- ❌ Importing entire libraries (`import * as _ from 'lodash'`)
- ❌ Large inline data in components
- ❌ Synchronous API calls blocking render
- ❌ Unoptimized images in critical path
- ❌ Multiple re-renders on mount
- ❌ Memory leaks from uncleaned effects
- ❌ Blocking scripts in document head
- ❌ CSS animations on expensive properties

## Tools & Resources

- **Chrome DevTools Performance Panel**
- **React Developer Tools Profiler**
- **Webpack Bundle Analyzer**
- **Lighthouse CI**
- **WebPageTest**
- **Core Web Vitals Chrome Extension**

Remember: Performance is not a one-time task but an ongoing process. Regular monitoring and optimization are key to maintaining a fast application.