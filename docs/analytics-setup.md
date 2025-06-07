# Analytics Setup Guide

This guide explains how to set up and use analytics tracking in the vCFO of One landing page.

## Overview

The analytics system tracks user behavior to optimize conversion rates and understand user engagement. It includes:

- **Google Analytics 4** - General website analytics
- **Posthog** - Detailed product analytics and feature flags
- **Conversion Tracking** - Track leads and signups
- **Custom Event Tracking** - Track specific user interactions

## Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env.local` and add your analytics keys:

```bash
cp frontend/.env.example frontend/.env.local
```

Required keys:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID
- `NEXT_PUBLIC_POSTHOG_KEY` - Posthog project API key (optional but recommended)

### 2. Google Analytics Setup

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with `G-`)
3. Add it to `.env.local`

### 3. Posthog Setup

1. Sign up at [posthog.com](https://posthog.com)
2. Create a project
3. Get your project API key
4. Add it to `.env.local`

## Event Tracking

### Automatic Tracking

The following events are tracked automatically:

- **Page Views** - Every page navigation
- **Scroll Depth** - 25%, 50%, 75%, 100%
- **Element Visibility** - Pricing and testimonial sections

### Manual Event Tracking

Use the `useAnalytics` hook to track custom events:

```typescript
import { useAnalytics } from '@/lib/analytics';

function MyComponent() {
  const { track, trackCTAClick } = useAnalytics();

  // Track custom event
  track('feature_view', {
    feature: 'dashboard',
    plan: 'professional'
  });

  // Track CTA click
  trackCTAClick('Get Started', 'hero');
}
```

### Using Tracked Components

#### TrackedButton

Automatically tracks button clicks:

```tsx
import { TrackedButton } from '@/components/analytics/TrackedButton';

<TrackedButton
  ctaName="Get Free Session"
  location="hero"
  className="btn-primary"
>
  Get Your Free Financial Clarity Session
</TrackedButton>
```

#### TrackedForm

Automatically tracks form interactions:

```tsx
import { TrackedForm } from '@/components/analytics/TrackedForm';

<TrackedForm
  formName="lead-capture"
  onSubmit={handleSubmit}
  onSubmitSuccess={() => console.log('Success!')}
  onSubmitError={(error) => console.error(error)}
>
  <input type="email" name="email" required />
  <button type="submit">Submit</button>
</TrackedForm>
```

## Conversion Tracking

Track conversions for different actions:

```typescript
import { trackConversion } from '@/lib/analytics/tracking';

// Track lead conversion
trackConversion('lead', 100); // $100 value

// Track signup
trackConversion('signup');

// Track demo request
trackConversion('demo_request');
```

## Event Reference

### Standard Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `cta_click` | CTA button clicked | `cta_name`, `location`, `page` |
| `form_start` | User started filling form | `form_name`, `page` |
| `form_submit` | Form submitted successfully | `form_name`, `success`, `page` |
| `form_error` | Form submission failed | `form_name`, `error_message` |
| `signup_complete` | User completed signup | `method`, `page` |
| `scroll_depth` | User scrolled to depth | `depth_percentage`, `page` |
| `pricing_view` | Pricing section viewed | `section` |
| `testimonial_view` | Testimonials viewed | `section` |
| `feature_view` | Feature clicked/viewed | `feature` |

### Conversion Events

| Event Name | Description | Properties |
|------------|-------------|------------|
| `conversion_lead` | Lead captured | `conversion_type`, `value`, `currency` |
| `conversion_signup` | User signed up | `conversion_type`, `value`, `currency` |
| `conversion_demo_request` | Demo requested | `conversion_type`, `value`, `currency` |

## Best Practices

### 1. Consistent Naming

Use consistent event names and properties:
- Use snake_case for event names
- Be descriptive but concise
- Include context (page, location, etc.)

### 2. Track Key Interactions

Focus on tracking:
- CTA clicks
- Form interactions
- Key feature engagement
- Conversion events

### 3. Add Context

Always include relevant context:
```typescript
track('feature_view', {
  feature: 'cash-flow-forecast',
  page: window.location.pathname,
  user_type: 'trial',
  plan: 'starter'
});
```

### 4. Test Your Tracking

Use browser extensions to verify:
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
- [Posthog Toolbar](https://posthog.com/docs/toolbar)

## Viewing Analytics

### Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. View reports:
   - **Realtime** - Current users
   - **Engagement > Events** - All events
   - **Monetization > Conversions** - Conversion tracking

### Posthog

1. Log in to your Posthog dashboard
2. View:
   - **Events** - All tracked events
   - **Persons** - Individual user journeys
   - **Insights** - Create custom reports
   - **Funnels** - Conversion funnels

## Debugging

### Enable Debug Mode

Add to your `.env.local`:
```
NEXT_PUBLIC_APP_ENV=development
```

### Console Logging

Events are logged to console in development:
```typescript
if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  console.log('Analytics Event:', eventName, properties);
}
```

### Common Issues

1. **Events not appearing**: Check that analytics keys are set correctly
2. **Duplicate events**: Ensure components aren't re-rendering unnecessarily
3. **Missing properties**: Verify all required properties are passed

## A/B Testing

Use the `useABTest` hook for experiments:

```typescript
import { useABTest } from '@/lib/analytics/hooks';

function HeroSection() {
  const variant = useABTest('hero-cta-text', ['A', 'B']);

  return (
    <button>
      {variant === 'A' 
        ? 'Get Your Free Session'
        : 'Start Your Free Trial'}
    </button>
  );
}
```

## Privacy Compliance

Remember to:
1. Add a cookie consent banner
2. Include analytics in your privacy policy
3. Allow users to opt-out
4. Respect DNT (Do Not Track) headers

## Support

For analytics issues:
- Check the browser console for errors
- Verify environment variables are set
- Test in incognito mode to avoid extensions
- Contact the development team if issues persist