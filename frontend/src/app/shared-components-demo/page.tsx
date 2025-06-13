'use client';

import React from 'react';
import { HeroButton, HeroCard, HeroHeader, HeroAvatar, HeroStat } from '@h3ro-dev/ofone-ui';

export default function SharedComponentsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <HeroHeader 
          title="VC of One"
          subtitle="Shared Components Showcase"
          variant="center"
        />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <HeroButton variant="primary">Primary Action</HeroButton>
            <HeroButton variant="secondary">Secondary Action</HeroButton>
            <HeroButton variant="outline">Outline Style</HeroButton>
            <HeroButton variant="ghost">Ghost Button</HeroButton>
            <HeroButton variant="destructive">Destructive</HeroButton>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HeroCard 
              title="Deal Flow Management"
              description="Source, evaluate, and track investment opportunities with AI-powered insights"
              ctaText="Manage Deals"
            />
            <HeroCard 
              title="Portfolio Analytics"
              description="Monitor portfolio performance with real-time metrics and predictive analytics"
              ctaText="View Portfolio"
            />
            <HeroCard 
              title="LP Relations"
              description="Streamline investor relations with automated reporting and communication tools"
              ctaText="Connect LPs"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HeroStat 
              label="AUM"
              value="$125M"
              trend={{ value: 28, isPositive: true }}
            />
            <HeroStat 
              label="Portfolio IRR"
              value="32%"
              trend={{ value: 8.5, isPositive: true }}
            />
            <HeroStat 
              label="Active Deals"
              value="47"
              trend={{ value: 12, isPositive: true }}
            />
            <HeroStat 
              label="Exit Multiple"
              value="3.2x"
              trend={{ value: 0.5, isPositive: true }}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hero Avatars</h2>
          <div className="flex items-center gap-6">
            <HeroAvatar 
              name="VC Partner"
              imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VC"
              size="sm"
            />
            <HeroAvatar 
              name="VC Partner"
              imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VC"
              size="md"
            />
            <HeroAvatar 
              name="VC Partner"
              imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=VC"
              size="lg"
            />
            <HeroAvatar 
              name="VC"
              size="lg"
            />
          </div>
        </section>

        <section className="text-center py-12">
          <HeroHeader 
            title="Ready to Build Your Investment Empire?"
            subtitle="Leverage the power of unified components across your entire investment workflow"
            variant="center"
          />
          <div className="mt-8">
            <HeroButton variant="primary" size="lg">
              Start Your VC Journey
            </HeroButton>
          </div>
        </section>
      </div>
    </div>
  );
}