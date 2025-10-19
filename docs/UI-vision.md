# UI/UX Vision - Provider Agent Dashboard (Full Product)

**Project**: Virtuals Protocol Score-as-a-Service Provider
**Purpose**: Professional dashboard for reputation scoring service operators
**Target Users**: Service providers, DevOps teams, agent marketplace operators

---

## 🎨 Design Philosophy

**Core Principles**:
- **Trust & Transparency**: Show all scoring activity in real-time
- **Professional**: Enterprise-grade monitoring interface
- **Accessible**: Clear metrics for non-technical stakeholders
- **Responsive**: Works on desktop, tablet, mobile

**Visual Style**:
- Dark mode primary (matches Web3 ecosystem aesthetics)
- Purple/Blue accent colors (Virtuals Protocol branding)
- Clean typography (Inter/SF Pro for readability)
- Subtle glassmorphism effects
- Animated data visualizations

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Service Status 🟢 | Network Selector | Wallet       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  HERO SECTION: 3D Animated Background + Main Title                   │
│  "Provider Agent - ERC-8004 Score-as-a-Service"                      │
│                                                                       │
├───────────────────────┬───────────────────────┬─────────────────────┤
│   STATUS CARD         │   PERFORMANCE CARD    │   EARNINGS CARD     │
│   Network: Base       │   Jobs/Hour: 12.4     │   Total: 1,245 $XYZ │
│   Agent: Provider     │   Avg Time: 8.2s      │   This Week: +15%   │
│   Uptime: 99.8%       │   Success: 99.1%      │   Est. Monthly: ~5K │
├───────────────────────┴───────────────────────┴─────────────────────┤
│                                                                       │
│   JOB QUEUE (Real-time Table)                                        │
│   ┌──────┬──────────────────────┬─────────┬─────────┬──────────┐   │
│   │ ID   │ Agent Address        │ Status  │ Score   │ Action   │   │
│   ├──────┼──────────────────────┼─────────┼─────────┼──────────┤   │
│   │ #142 │ 0x289F...3cBB        │ ⏳ TEE  │ ---     │ [View]   │   │
│   │ #141 │ 0x7Ae4...82f1        │ ✅ Done │ 87/100  │ [Details]│   │
│   │ #140 │ 0x9Bc2...4a3d        │ ✅ Done │ 92/100  │ [Details]│   │
│   └──────┴──────────────────────┴─────────┴─────────┴──────────┘   │
│                                                                       │
├───────────────────────────────────────────────────────────────────┬─┤
│   ANALYTICS CHARTS (Left 2/3)                                     │R│
│   ┌─────────────────────────────────────────────────────────┐   │E│
│   │  Score Distribution (Last 100 Jobs)                     │   │C│
│   │  [Bar Chart: 0-20: 2, 21-40: 5, 41-60: 18, ...]        │   │E│
│   └─────────────────────────────────────────────────────────┘   │N│
│   ┌─────────────────────────────────────────────────────────┐   │T│
│   │  Jobs Over Time (7 Days)                                │   │ │
│   │  [Line Chart: Shows completed jobs per hour trend]     │   │A│
│   └─────────────────────────────────────────────────────────┘   │C│
├───────────────────────────────────────────────────────────────────┤T│
│   ACTIVITY LOG (Scrollable)                                       │I│
│   • 00:24:15 - ✅ Job #142 completed: Score 87/100               │V│
│   • 00:23:58 - 📋 Fetching iExec orders for Job #142             │I│
│   • 00:23:45 - 🔐 Protected data created for 0x289F...           │T│
│   • 00:23:30 - 🆕 New job #142 detected from 0xClient...         │Y│
│   • 00:22:10 - ✅ Job #141 published to ReputationRegistry      │ │
└───────────────────────────────────────────────────────────────────┴─┘
```

---

## 🧩 Component Specifications

### 1. Header Bar
**Location**: Top fixed navbar

**Elements**:
- **Logo** (Left): Virtuals Protocol icon + "Provider Agent"
- **Status Indicator** (Center-left):
  - 🟢 "Live" (green pulse animation)
  - 🟡 "Degraded" (yellow)
  - 🔴 "Offline" (red)
- **Network Badge** (Center): "Base Sepolia" with chain icon
- **Wallet Connect** (Right):
  - Connected: `0x4B82...Bda70de` with jazzicon
  - Disconnected: "Connect Wallet" button

**Interactions**:
- Click logo → Scroll to top
- Click wallet → Show account details modal
- Click network → Show chain info + links to explorers

---

### 2. Hero Section
**Location**: Top 40vh of page

**Visual**:
- 3D animated background (PixelBlast component - already built)
- Overlay gradient (black to transparent)
- Centered text:
  - H1: "Provider Agent" (72px, bold)
  - H2: "ERC-8004 Score-as-a-Service" (24px, light)
  - Tagline: "Decentralized Reputation Scoring via iExec TEE"

**Animation**:
- Text fades in on load
- Particles react to mouse movement
- Subtle parallax scroll effect

---

### 3. Metrics Dashboard (3-Card Layout)

#### Card 1: Status Overview
**Data Points**:
- Network: Base Sepolia (with icon)
- Agent Role: Provider
- Service: Giza Score
- Uptime: 99.8% (last 30 days)
- Contract: `0x9595...2FF` (click to copy)

**Visual**:
- Icon at top (shield with checkmark)
- Grid layout for key-value pairs
- Green/yellow/red status indicators

#### Card 2: Performance Metrics
**Data Points**:
- Jobs Completed: 1,245
- Active Jobs: 3
- Avg Processing Time: 8.2 seconds
- Success Rate: 99.1%
- Jobs/Hour: 12.4 (7-day average)

**Visual**:
- Speedometer gauge for success rate
- Small sparkline chart for jobs/hour trend
- Percentage change indicators (+12% vs last week)

#### Card 3: Earnings & Economics
**Data Points**:
- Total Earnings: 1,245 $XYZ tokens
- This Week: +187 $XYZ (+15%)
- Avg Job Reward: 1.0 $XYZ
- Est. Monthly: ~5,000 $XYZ
- Pending Payments: 12 $XYZ

**Visual**:
- Currency icon (token logo)
- Large number display for total
- Mini bar chart for weekly breakdown
- "Claim Rewards" button (if pending > 0)

---

### 4. Job Queue Table

**Columns**:
1. **Job ID**: `#142` (click to expand details)
2. **Agent Address**: `0x289F...3cBB` (truncated, hover shows full)
3. **Client**: `0x7Ae4...82f1` (who requested the score)
4. **Status**: Visual badge with icon
   - ⏳ "Waiting" (gray)
   - 🔐 "Creating Protected Data" (blue)
   - ⚙️ "Running in TEE" (purple)
   - 📤 "Publishing Score" (yellow)
   - ✅ "Completed" (green)
   - ❌ "Failed" (red)
5. **Score**: `87/100` (with color gradient based on value)
6. **Processing Time**: `8.2s`
7. **Timestamp**: `2h ago` (relative time)
8. **Actions**:
   - [View Details] → Opens modal with full job info
   - [IPFS Link] → Opens result file in new tab

**Features**:
- Real-time updates (new jobs appear at top with slide-in animation)
- Sortable columns
- Pagination (20 per page)
- Filter by status dropdown
- Search by agent address

**Row Details Modal**:
```
┌─────────────────────────────────────────────────────┐
│  Job #142 - Detailed View                     [X]  │
├─────────────────────────────────────────────────────┤
│  Agent: 0x289F54AE03D47eD449777D383cBB993b15C6B3e2 │
│  Client: 0x7Ae4f8D1c3bE5a2F8d7e3b9C1a4F2e8D82f1   │
│  Created: Oct 19, 2025 12:24:15 UTC               │
│  Completed: Oct 19, 2025 12:24:23 UTC (8.2s)      │
│                                                     │
│  Score Breakdown:                                   │
│  ├─ Performance:   92/100 (weight: 30%)            │
│  ├─ Risk:          85/100 (weight: 25%)            │
│  ├─ Stability:     88/100 (weight: 20%)            │
│  ├─ Tech Prov:     90/100 (weight: 15%)            │
│  └─ Sentiment:     82/100 (weight: 10%)            │
│                                                     │
│  Final Score: 87/100                                │
│                                                     │
│  IPFS Result: ipfs://QmXyz... [Copy] [View]        │
│  TX Hash: 0xabc... [Basescan ↗]                    │
│                                                     │
│  Timeline:                                          │
│  00:00 - Job created                                │
│  00:02 - Protected data created                     │
│  00:03 - iExec orders matched                       │
│  00:04 - TEE task started                           │
│  00:07 - Results downloaded                         │
│  00:08 - Score published on-chain                   │
│  00:08 - Deliverable memo submitted                 │
└─────────────────────────────────────────────────────┘
```

---

### 5. Analytics Section

#### Chart 1: Score Distribution Histogram
**Type**: Bar chart
**X-axis**: Score ranges (0-20, 21-40, 41-60, 61-80, 81-100)
**Y-axis**: Number of jobs
**Data**: Last 100 completed jobs
**Visual**: Color gradient bars (red → yellow → green)
**Interaction**: Click bar to filter job queue by score range

#### Chart 2: Jobs Over Time
**Type**: Line chart with area fill
**X-axis**: Time (7 days, hourly buckets)
**Y-axis**: Jobs completed
**Lines**:
- Blue: Total jobs
- Green: Successful jobs
- Red: Failed jobs (overlay)
**Interaction**: Hover shows exact count + timestamp

#### Chart 3: Processing Time Trends
**Type**: Scatter plot with trend line
**X-axis**: Time (7 days)
**Y-axis**: Processing time (seconds)
**Data**: Each job as a dot
**Visual**:
- Green dots: < 10s
- Yellow dots: 10-30s
- Red dots: > 30s
**Trend line**: Shows average improvement/degradation

#### Chart 4: Revenue Over Time
**Type**: Stacked area chart
**X-axis**: Time (30 days)
**Y-axis**: Earnings ($XYZ tokens)
**Areas**:
- Bottom (dark): Base rewards
- Top (light): Bonus payments
**Total line**: Cumulative earnings

---

### 6. Activity Log (Right Sidebar)

**Layout**:
- Fixed width (350px)
- Scrollable (max-height: 60vh)
- Auto-scroll to newest

**Entry Format**:
```
[HH:MM:SS] [ICON] Message
           ↓ Expanded details (click to toggle)
```

**Entry Types**:
- 🆕 New Job: "Job #142 detected from 0xClient..."
- 🔐 Data Protection: "Protected data created: 0xProtected..."
- 📋 Order Matching: "iExec orders matched, taskId: 0x..."
- ⚙️ TEE Execution: "Task running in enclave (estimated: 5s)"
- 📥 Results: "Results downloaded from IPFS"
- ✅ Success: "Score 87/100 published on-chain"
- 💰 Payment: "Reward claimed: 1.0 $XYZ"
- ❌ Error: "Job #143 failed: RPC timeout (retry in 30s)"

**Visual**:
- Color-coded by type
- Timestamp in gray
- Icon for quick scanning
- Expandable for full error stack traces
- Filter buttons at top (All | Success | Errors)

---

### 7. Settings Panel (Accessible via gear icon in header)

**Tabs**:

#### General Settings
- Service Name (editable)
- Agent Address (display only)
- Enable/Disable auto-processing
- Job acceptance criteria:
  - Minimum reward threshold
  - Maximum concurrent jobs
  - Blacklist client addresses

#### Network Configuration
- RPC Endpoints (Base Sepolia, Bellecour)
- Gas price limits
- Transaction timeout settings
- Retry attempts

#### iExec Configuration
- Whitelisted wallet address
- App address (display only)
- Max workerpool price
- Preferred workerpool (optional)

#### Notifications
- Email alerts on job completion
- Webhook URL for events
- Slack/Discord integration
- Error notification threshold

#### Appearance
- Theme toggle (Dark/Light)
- Accent color picker
- Animation preferences
- Compact/Comfortable view

---

## 🎭 Interactive Elements

### Loading States
- **Initial Load**: Skeleton screens for all cards
- **Job Processing**: Pulsing progress bar on job row
- **Chart Loading**: Shimmer effect on chart containers
- **Button Actions**: Spinner icon inside button on click

### Animations
- **New Job**: Slide in from top + glow effect
- **Score Reveal**: Number count-up animation
- **Status Changes**: Color transition (blue → green)
- **Chart Updates**: Smooth data point transitions
- **Activity Log**: Fade in new entries

### Tooltips
- Hover over metrics → Show calculation formula
- Hover over address → Show full address + copy button
- Hover over timestamp → Show absolute time
- Hover over status → Show next expected step

### Micro-interactions
- Buttons: Scale + shadow on hover
- Cards: Lift on hover (subtle transform)
- Links: Underline slide-in effect
- Icons: Rotate/bounce on click
- Tabs: Underline indicator slide

---

## 📱 Responsive Breakpoints

### Desktop (1920px+)
- 3-column layout for metric cards
- Full-width job table (12 columns)
- Side-by-side analytics + activity log
- Large hero section (500px height)

### Laptop (1366px - 1919px)
- 3-column layout (slightly narrower)
- Job table with horizontal scroll if needed
- Analytics 70%, Activity log 30%
- Medium hero (400px)

### Tablet (768px - 1365px)
- 2-column metric cards (3rd wraps below)
- Job table: Hide "Client" column
- Analytics full-width, Activity log below
- Small hero (300px)

### Mobile (< 768px)
- 1-column stacked layout
- Metric cards accordion (expand to see details)
- Job table: Card view instead of table
  ```
  ┌─────────────────────────┐
  │ Job #142                │
  │ Agent: 0x289F...3cBB    │
  │ Status: ✅ Completed    │
  │ Score: 87/100           │
  │ Time: 2h ago            │
  │ [View Details]          │
  └─────────────────────────┘
  ```
- Charts: Mobile-optimized (smaller margins)
- Activity log: Collapsed by default
- Minimal hero (200px, text smaller)

---

## 🎨 Color Palette

### Primary Colors
- **Background**: `#0a0a0f` (near black)
- **Surface**: `#1a1a24` (dark gray-purple)
- **Elevated**: `#2a2a38` (lighter surface)

### Accent Colors
- **Primary**: `#B19EEF` (soft purple - Virtuals brand)
- **Secondary**: `#64C7FF` (bright blue)
- **Success**: `#4ADE80` (green)
- **Warning**: `#FBBF24` (yellow)
- **Error**: `#F87171` (red)

### Text Colors
- **Primary**: `#FFFFFF` (white)
- **Secondary**: `#A8A8B8` (gray)
- **Tertiary**: `#6B6B7B` (darker gray)

### Gradients
- **Hero Overlay**: `linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.8) 100%)`
- **Card Shine**: `linear-gradient(135deg, rgba(177,158,239,0.1) 0%, rgba(100,199,255,0.1) 100%)`
- **Score Gradient**: `linear-gradient(90deg, #F87171 0%, #FBBF24 50%, #4ADE80 100%)`

---

## 🔤 Typography

### Font Families
- **Headings**: `"SF Pro Display", "Inter", -apple-system, sans-serif`
- **Body**: `"SF Pro Text", "Inter", -apple-system, sans-serif`
- **Monospace**: `"SF Mono", "Consolas", "Monaco", monospace`

### Font Sizes
- **H1** (Hero): 72px / 64px (mobile)
- **H2** (Section): 32px / 28px
- **H3** (Card Title): 20px / 18px
- **Body**: 16px / 14px
- **Small**: 14px / 12px
- **Tiny** (Timestamps): 12px / 11px

### Font Weights
- **Bold**: 700 (Headings, numbers)
- **Semibold**: 600 (Subheadings)
- **Medium**: 500 (Buttons, labels)
- **Regular**: 400 (Body text)
- **Light**: 300 (Secondary text)

---

## 🧪 Component Library

**Recommended Stack**:
- **Framework**: Next.js 15 + React 19 (already in use)
- **UI Components**: shadcn/ui (Radix UI primitives + Tailwind)
- **Charts**: Recharts or Chart.js
- **Animations**: Framer Motion
- **3D Background**: Three.js (PixelBlast component - already built)
- **Icons**: Lucide Icons
- **Tables**: TanStack Table (React Table v8)
- **Forms**: React Hook Form + Zod validation
- **Dates**: date-fns
- **Blockchain**: ethers.js v6 (already in use)

---

## 🚀 Advanced Features (Future Enhancements)

### 1. Multi-Provider Mode
- Dashboard shows aggregate stats across multiple provider instances
- Switch between provider wallets
- Compare performance metrics side-by-side

### 2. Scoring Model Configurator
- Adjust category weights (Performance, Risk, etc.)
- Preview score changes on historical data
- A/B test different scoring algorithms

### 3. Client Portal
- Public view for clients to check job status
- API key generation for programmatic access
- Webhook subscription management

### 4. Analytics Deep Dive
- Agent reputation trends over time
- Correlation between score and on-chain metrics
- Predictive analytics (which agents will score well)

### 5. Marketplace Integration
- List service on Virtuals marketplace
- Dynamic pricing based on demand
- Reputation staking for higher visibility

### 6. Alert System
- Browser notifications for new jobs
- Email/SMS alerts for failures
- Slack/Discord bot integration
- Custom alert rules (e.g., "Notify if job > 30s")

### 7. Historical Replay
- "Time machine" view to see dashboard state at any point
- Replay job processing step-by-step
- Debug failed jobs with full context

### 8. Multi-Language Support
- i18n for global providers
- Language switcher in header
- Localized number/date formats

---

## 📋 Component Checklist for Next Implementation

### Phase 1: Core Dashboard (MVP)
- [ ] Responsive header with wallet connect
- [ ] 3D hero section (already built - just style)
- [ ] 3-card metrics dashboard
- [ ] Real-time job queue table
- [ ] Activity log sidebar
- [ ] Basic settings panel

### Phase 2: Analytics & Visualizations
- [ ] Score distribution histogram
- [ ] Jobs over time line chart
- [ ] Processing time scatter plot
- [ ] Revenue area chart
- [ ] Interactive filters and date pickers

### Phase 3: Enhanced UX
- [ ] Job details modal with timeline
- [ ] Toast notifications for events
- [ ] Skeleton loading states
- [ ] Error boundary components
- [ ] Empty states (no jobs yet)

### Phase 4: Advanced Features
- [ ] API key management
- [ ] Webhook configuration
- [ ] Alert rules builder
- [ ] Export data (CSV/JSON)
- [ ] Dark/light theme toggle

### Phase 5: Performance & Polish
- [ ] Code splitting and lazy loading
- [ ] Image optimization
- [ ] Animation performance audit
- [ ] Accessibility audit (WCAG AA)
- [ ] SEO optimization

---

## 🎯 Success Metrics

**User Engagement**:
- Time spent on dashboard: > 5 min/session
- Page views per session: > 10
- Return visit rate: > 60%

**Performance**:
- Initial load time: < 3s
- Time to interactive: < 5s
- Lighthouse score: > 90

**Conversion**:
- % of visitors who connect wallet: > 40%
- % who complete first job: > 80%
- % who enable notifications: > 30%

---

**Design Reference**: Modern DeFi dashboards (Aave, Uniswap), monitoring tools (Grafana, Datadog), Web3 analytics (Dune, Nansen)

**Brand Inspiration**: Virtuals Protocol website, iExec design system, Ethereum Foundation branding

**Implementation Timeline**: 2-3 weeks for MVP, 6-8 weeks for full feature set

---

This document should serve as a comprehensive blueprint for the UI/UX team to build a production-ready provider dashboard. All components are designed to be modular, scalable, and aligned with Web3 design best practices.
