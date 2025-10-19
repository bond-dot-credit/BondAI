'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  jobStats?: {
    totalJobs: number;
    activeJobs: number;
    completedJobs: number;
    rejectedJobs: number;
  };
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

export interface BentoCardWithContentProps extends BentoCardProps {
  children?: React.ReactNode;
}

import JobQueueTable from './JobQueueTable';
import ActivityLog from './ActivityLog';
import ScoreDistributionChart from './ScoreDistributionChart';
import JobsOverTimeChart from './JobsOverTimeChart';
import ProcessingTimeChart from './ProcessingTimeChart';
import RevenueChart from './RevenueChart';

const createCardData = (jobStats: BentoProps['jobStats']): BentoCardWithContentProps[] => [
  {
    color: '#060010',
    title: 'System',
    description: 'Network: Base Sepolia\nAgent: Provider\nService: Giza Score',
    label: 'Status',
    textAutoHide: true
  },
  {
    color: '#060010',
    title: 'Metrics',
    description: `Total Jobs: ${jobStats?.totalJobs}\nActive Jobs: ${jobStats?.activeJobs}\nCompleted Jobs: ${jobStats?.completedJobs}`,
    label: 'Performance',
    textAutoHide: true,
  },
  {
    color: '#060010',
    title: 'Revenue',
    label: 'Earnings',
    textAutoHide: true,
    children: (
      <div className="h-[300px]">
        <RevenueChart />
      </div>
    )
  },
  {
    color: '#060010',
    title: 'Job Queue',
    label: 'Monitor',
    textAutoHide: false,
    children: (
      <div className="h-full">
        <JobQueueTable />
      </div>
    )
  },
  {
    color: '#060010',
    title: 'Analytics',
    label: 'Insights',
    textAutoHide: false,
    children: (
      <div className="flex flex-col gap-4 h-full">
        <ScoreDistributionChart />
        <JobsOverTimeChart />
      </div>
    )
  },
  {
    color: '#060010',
    title: 'Activity Log',
    label: 'Events',
    textAutoHide: false,
    children: (
      <div className="h-full">
        <ActivityLog />
      </div>
    )
  }
];

// ... (rest of the component)