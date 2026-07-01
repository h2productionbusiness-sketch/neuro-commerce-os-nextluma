<!-- SOURCE OF TRUTH: NextLuma Agency. This is the canonical deliverable/instruction reference. Reproduce structure EXACTLY. -->
# PHASE 2 — BRAND ARCHITECTURE (Complete AI Instruction Set + Tool Stack)

NEXT LUMA PHASE 2: BRAND ARCHITECTURE — COMPLETE AI INSTRUCTION SET
The Definitive Guide for Claude to Execute All Brand OS Deliverables

EXECUTIVE OVERVIEW
text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                             │
│  NEXT LUMA PHASE 2 — AI EXECUTION INSTRUCTION SET                                                                          │
│  ─────────────────────────────────────────────────────                                                                      │
│                                                                                                                             │
│  PURPOSE: To provide Claude with complete, step-by-step instructions for executing ALL Phase 2 Brand Architecture           │
│           deliverables using the available tool stack.                                                                      │
│                                                                                                                             │
│  TOTAL DELIVERABLES: 18 Major | 117 Sub-Deliverables                                                                        │
│  TOTAL EXECUTION TIME: 14-21 Days                                                                                           │
│  TOOLS REQUIRED: 15+ (with free alternatives for every paid tool)                                                           │
│                                                                                                                             │
│  EXECUTION PHASES:                                                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  PHASE 1: Setup & Intelligence (Days 1-3)   → Sections 1-2                                                         │   │
│  │  PHASE 2: Brand Strategy (Days 4-7)        → Sections 3-5                                                         │   │
│  │  PHASE 3: Visual Identity (Days 8-11)      → Sections 6-8                                                         │   │
│  │  PHASE 4: Content & Creative (Days 12-14)  → Sections 9-11                                                        │   │
│  │  PHASE 5: Performance (Days 15-17)         → Sections 12-14                                                        │   │
│  │  PHASE 6: Experience & AI (Days 18-21)     → Sections 15-18                                                        │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

PART 1: SYSTEM SETUP & TOOL CONFIGURATION

1.1 Master Tool Stack
Category
 | Paid Tool
 | Free Alternative
 | Purpose
 | Connection Method

AI Core
 | Claude Pro ($20/mo)
 | Claude Free
 | Strategy, content, analysis
 | Native

Image Generation
 | Higgsfield AI ($6-39/mo)
 | Recraft AI
 | Logos, assets, mockups
 | MCP Connector

Vector Graphics
 | Adobe Illustrator
 | Inkscape
 | .AI file generation
 | Manual

PSD Generation
 | Lovart AI
 | Recraft AI
 | Layered PSDs
 | MCP Connector

Design Templates
 | Canva Pro ($15/mo)
 | Canva Free
 | Social templates
 | Manual

Presentation
 | PowerPoint
 | Google Slides
 | Client decks
 | Manual

Documentation
 | Notion ($12/mo)
 | Notion Free
 | Brand Book
 | MCP Connector

Visual Mapping
 | Miro ($10/mo)
 | Miro Free
 | Strategy maps
 | MCP Connector

Live Search
 | SerpAPI ($25/mo)
 | SerpAPI Free
 | Market research
 | MCP Connector

Social Metrics
 | Pulse MCP
 | Free
 | Post analysis
 | MCP Connector

Color Tools
 | Coolors
 | Free
 | Color palettes
 | Web

Typography
 | Google Fonts
 | Free
 | Font selection
 | Web

AI Prompting
 | Claude Projects
 | Free
 | Knowledge base
 | Native

File Conversion
 | CloudConvert
 | Free
 | Format conversion
 | Web

1.2 MCP Connector Configuration
For Claude Desktop:
json
{
  "mcpServers": {
    "higgsfield": {
      "url": "https://mcp.higgsfield.ai/sse"
    },
    "serpapi": {
      "url": "https://mcp.serpapi.com/YOUR_API_KEY/mcp"
    },
    "pulse": {
      "command": "npx",
      "args": ["-y", "pulse-mcp"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@iflow-mcp/notion-mcp"],
      "env": {
        "NOTION_API_KEY": "your-key"
      }
    },
    "miro": {
      "command": "npx",
      "args": ["-y", "@iflow-mcp/miro-mcp"],
      "env": {
        "MIRO_API_KEY": "your-key"
      }
    }
  }
}

1.3 Initial Claude Project Setup
Prompt 1: Create the Phase 2 Project
text
You are the NextLuma Brand Architect. Create a new Claude Project for [Client Name] - Phase 2 Brand Architecture.

Project Name: [Client Name] - Phase 2 Brand OS

Upload the following Phase 1 deliverables to the project:
1. Client Neuro-Commerce Bible
2. Persona Profiles
3. Market Intelligence Report
4. Strategic Synthesis (TOWS, ERRC, Blueprint)

Set these custom instructions:

"You are the NextLuma Brand Architect, a specialized AI agent that builds complete, neuro-engineered brand architectures using the Phase 2 Brand OS framework.

Your knowledge base includes:
- 12 Universal Archetypes (Jung/Mark & Pearson)
- Neuro-Chromatic System
- Semiotic Brand Engineering
- StoryBrand SB7 Framework
- Attention Architecture
- Neuro-Visual Identity Design
- Behavioral Economics (Kahneman, Cialdini)

Your output format: Structured markdown with tables, ready for export to PowerPoint and Notion.

Your deliverable structure: 18 Major Deliverables with 117 Sub-Deliverables across 6 Sections.

Always enforce: #D5FF00 is BANNED. 40% negative space minimum. Swiss Grid mandatory."

PART 2: SECTION 1 — EXECUTIVE & STRATEGIC INTELLIGENCE

DELIVERABLE 01: EXECUTIVE INTELLIGENCE REPORT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Executive Intelligence Report for [Client Name].

STEP 1: Extract Core Data from Phase 1
- Client Overview: Name, Industry, Revenue, Employees
- Key Findings: 3 Critical Problems with financial impact
- Market Data: TAM/SAM/SOM from Phase 1
- Persona Summary: Primary persona name, archetype, emotional driver

STEP 2: Synthesize Strategic Findings
- Identify 3-5 critical findings from all Phase 1 data
- Prioritize findings by impact (High/Med/Low)
- Connect each finding to a financial implication

STEP 3: Generate Buyer Psychology Summary
- Primary Emotional Driver
- Primary Fear
- Primary Desire
- Decision Trigger
- Trust Driver

STEP 4: Create Growth Opportunities
- Identify 5-10 specific opportunities
- Quantify each opportunity (€ value)
- Rank by priority (1-10)

STEP 5: Build Priority Roadmap
- 30 Days: Quick wins
- 90 Days: Strategic initiatives
- 180 Days: Long-term bets

STEP 6: Format Output
- Use tables for all data
- Include visual indicators (🟢🟡🔴)
- Generate as structured markdown

Tools Required:
- Claude Pro (analysis)
- SerpAPI (market validation)
- Notion (storage)

DELIVERABLE 02: NEURO-PSYCHOGRAPHIC PERSONA SYSTEM
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Complete Neuro-Psychographic Persona System for [Client Name].

STEP 1: Extract Persona Data from Phase 1
- Primary Persona Profile
- Secondary Persona Profile
- Customer Signals (likes, hates, wishes)
- Psychographic Data (VALS, CNFU, BESC, CSII, MVS)

STEP 2: Build Identity System
- Current Identity: Who they think they are
- Desired Identity: Who they want to become
- Rejected Identity: Who they never want to become
- Secret Identity: What they privately wish to be
- Social Identity: How they want others to see them
- Tribal Identity: Groups they belong to

STEP 3: Build Psychographic Profile
- Emotional Drivers (Score 1-10 each)
- Personality Dimensions (5 traits with positions)
- Values Hierarchy (Top 10 values with rankings)
- Fear Hierarchy (5 types with intensities)
- Aspirations (Financial, Career, Family, Health, Status, Freedom)

STEP 4: Build Decision Psychology
- Behavioral Biases (8 biases with applications)
- Persuasion Triggers (3-5 with effectiveness scores)
- Trust Drivers (5-7 with activation methods)
- Objections (5-7 with counter-strategies)
- Purchase Logic (Why buy, why not, why delay, why switch)

STEP 5: Build Cultural DNA
- Music Profile (Genres, Artists, Listening Habits)
- Movies & TV (Favorites, Genres, Characters)
- YouTube & Podcasts (Channels, Categories)
- Books & News (Categories, Trust Level)
- Social Media Habits (Time, Purpose, Platforms)
- Humor Style (Type, Brand Tone)
- Language Patterns (Dialect, Formality, Power Words)

STEP 6: Build Digital Intelligence
- Platforms Used (10 platforms with usage intensity)
- Content Preferences (Formats, Tone, Creator Style)
- Engagement Style (8 behaviors with occurrence)
- Congregation Intelligence (5 locations with pain discussions)

STEP 7: Build Emotional Journey
- 5 Stages: Awareness → Consideration → Purchase → Retention → Advocacy
- Each stage: User Actions, Touchpoints, Emotional State, Friction Points, Opportunities

STEP 8: Format Output
- Persona Card (One-pager for quick reference)
- Full 9W+H Profile (All 9 dimensions)
- Empathy Map (Thinks, Feels, Hears, Sees, Says, Does)
- Emotional Journey Map (5 stages with emotions)
- JSON Export for AI-readability

Tools Required:
- Claude Pro (analysis)
- Pulse MCP (social data)
- SerpAPI (research validation)
- Miro (visual mapping)
- Notion (storage)

Free Alternative Workflow:
- Use SerpAPI free tier for research
- Use Miro free board for visual mapping
- Use Pulse MCP for free social metrics
- Manual data collection from public sources

DELIVERABLE 03: COMPETITIVE BATTLEFIELD INTELLIGENCE
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Competitive Battlefield Intelligence Report for [Client Name].

STEP 1: Identify Competitors
- Direct Competitors (3-5)
- Indirect Competitors (2-3)
- Potential Entrants (1-2)

STEP 2: Run SerpAPI Searches for Each Competitor
- "Search Google for [Competitor Name] [Industry]"
- "Search Google News for [Competitor Name]"
- "Search Google Maps for [Competitor Name] [Location]"
- "Search Reddit for '[Competitor Name] review'"

STEP 3: Build Competitor Positioning Matrix
- X-Axis: Price (Low → High)
- Y-Axis: Quality (Low → High)
- Plot all competitors + client

STEP 4: Analyze Each Competitor (7 Dimensions)
- Messaging Comparison: Tagline, value proposition, key messages
- Visual Comparison: Logo, colors, typography, imagery
- Emotional Territory: Primary emotional drivers
- Pricing Comparison: Model, tiers, anchor prices
- Digital Dominance: Website, SEO, Social, Ads
- Audience Overlap: Who they target
- Vulnerabilities: Weaknesses to exploit

STEP 5: Identify White-Space Opportunities
- Uncontested market positions
- Emotional territories not claimed
- Pricing gaps
- Distribution gaps

STEP 6: Format Output
- Strategic Group Map (Visual)
- Competitor Benchmarking Table
- White-Space Opportunities (3-5)
- Vulnerability Exploitation Plan

Tools Required:
- SerpAPI (live competitor data)
- Pulse MCP (social metrics)
- Miro (visual mapping)
- Google Search (manual validation)

Free Alternative:
- Manual Google searches for each competitor
- Meta Ad Library for ad intelligence
- Social media manual analysis
- Google Sheets for benchmarking

DELIVERABLE 04: MARKET OPPORTUNITY & TREND REPORT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Market Opportunity & Trend Report for [Client Name].

STEP 1: Calculate TAM/SAM/SOM
- TAM: Total Addressable Market (from Statista/IBISWorld)
- SAM: Serviceable Available Market (Apply constraints)
- SOM: Serviceable Obtainable Market (Realistic capture)

STEP 2: Run SerpAPI Trend Searches
- "Search Google Trends for [Industry] over 12 months"
- "Search Google News for [Industry] trends 2026"
- "Search Google for '[Industry] market size [Location]'"

STEP 3: Identify Megatrends (3-5)
- Long-term structural shifts
- Impact on the client
- Timeline (When it matters)

STEP 4: Identify Micro-trends (3-5)
- Fleeting shifts
- Seasonal patterns
- Platform-specific trends

STEP 5: Create Growth Projections
- Conservative: [X]% growth
- Realistic: [X]% growth
- Optimistic: [X]% growth
- 1-Year, 3-Year, 5-Year projections

STEP 6: Format Output
- Market Pyramid (TAM/SAM/SOM)
- Growth Projection Table
- Megatrends Summary
- Opportunity Forecast

Tools Required:
- SerpAPI (trend data)
- Statista (market data) or free alternatives
- Google Trends (free)

Free Alternative:
- Google Trends (free)
- IBISWorld free preview
- Industry association reports
- Government data (census, trade statistics)
- Statista free tier (limited)

PART 3: SECTION 2 — BRAND STRATEGY

DELIVERABLE 05: BRAND POSITIONING BLUEPRINT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Brand Positioning Blueprint for [Client Name].

STEP 1: Define Mission
- Why does the brand exist?
- What problem does it solve?
- Who does it serve?

STEP 2: Define Vision
- Future state (5-10 years)
- What does success look like?
- Where is the brand going?

STEP 3: Define Brand Essence
- Core identity in 1-2 sentences
- The "soul" of the brand

STEP 4: Create Positioning Statement
Format: "For [Target Persona] who [Behavioral Insight], [Brand] is the [Category] that [Emotional Promise] because [Behavioral Rationale]."

STEP 5: Define Value Proposition
- What we offer
- How it solves the problem
- Why it's different
- Why it matters

STEP 6: Define Emotional Territory
- Primary emotional driver
- Secondary emotional driver
- Emotional aftertaste

STEP 7: Define Brand Promise
- What we guarantee
- What customers can expect
- The non-negotiable

STEP 8: Define Differentiation
- What makes us unique
- What competitors can't claim
- The "only we" statement

STEP 9: Select Archetype
- From 12 archetypes: Innocent, Explorer, Sage, Hero, Outlaw, Magician, Everyman, Lover, Jester, Caregiver, Creator, Ruler
- Provide rationale

STEP 10: Define Brand Personality
- 5-7 human traits (adjectives)
- Example: Authoritative, Visionary, Precise, Decisive, Transformative

STEP 11: Format Output
- All sections as structured tables
- Visual representation of positioning
- One-page blueprint summary

Tools Required:
- Claude Pro (analysis)
- Canva (visual design)
- Notion (documentation)

Free Alternative:
- Canva Free for visual design
- Google Docs for documentation

DELIVERABLE 06: SEMIOTIC BRAND SYSTEM
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Semiotic Brand System for [Client Name].

STEP 1: Define Color Psychology
- Map each color to emotional meaning
- Map each color to cultural interpretation
- Map each color to brand association

Color Categories:
- Primary Color: Brand identity
- Secondary Colors: Supporting elements
- Neutral Colors: Backgrounds, text
- Accent Color: CTAs, highlights
- Banned Colors: #D5FF00 (Luma Neon Yellow)

STEP 2: Define Shape Psychology
- Circle: Safety, completeness, unity
- Square: Stability, trust, order
- Triangle (Up): Ambition, progress, achievement
- Triangle (Down): Receptivity, intuition, grace
- Spiral: Growth, evolution, mystery
- Diamond: Wealth, clarity, luxury
- Organic: Comfort, emotion, humanity

STEP 3: Define Typography Psychology
- Serif: Traditional, authoritative, trustworthy
- Sans-Serif: Modern, clean, approachable
- Display: Bold, memorable, distinctive
- Script: Elegant, personal, creative

STEP 4: Define Symbolic Meaning
- Core symbols and their meanings
- Subconscious associations
- Cultural interpretations

STEP 5: Define Status Codes
- How to signal wealth, power, style, intelligence, trust

STEP 6: Define Trust Codes
- How to signal authority, transparency, proven results, community

STEP 7: Format Output
- Symbolic Meaning Map
- Status Code System
- Trust Code System
- Cultural Adaptation Rules

Tools Required:
- Coolors (color palette)
- Google Fonts (typography)
- Canva (visual design)
- Notion (documentation)

Free Alternative:
- Coolors free (unlimited)
- Google Fonts free
- Canva Free

DELIVERABLE 07: NEURO-VISUAL IDENTITY BLUEPRINT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Neuro-Visual Identity Blueprint for [Client Name].

STEP 1: Define Visual Attention Paths
- 0-0.5s: Pattern Interrupt → Orienting Response → Stop Scroll
- 0.5-2s: Primary Subject → Attention → Focus
- 2-5s: Emotional Trigger → Dopamine/Oxytocin → Engage
- 5-10s: Value Proposition → Cognition → Understand
- 10+s: Call to Action → Decision → Convert

STEP 2: Define Cognitive Load Hierarchy
- Primary Subject: Low load → Priority 1
- Headline: Medium load → Priority 2
- Supporting Visuals: Medium load → Priority 3
- Body Copy: High load → Priority 4
- CTA: Medium load → Priority 5

STEP 3: Define Memory Encoding System
- Colors: High impact → Emotional encoding
- Faces: Very High → Social encoding
- Emotions: Highest → Episodic encoding
- Repetition: High → Semantic encoding
- Story: High → Narrative encoding

STEP 4: Define Dopamine-Driven Visuals
- Contrast: High effect → Hero elements
- Movement: High effect → Video/Animation
- Novelty: High effect → New products
- Anticipation: High effect → Teasers
- Reward Signals: High effect → Offers

STEP 5: Format Output
- Visual Attention Path Map
- Cognitive Load Hierarchy
- Memory Encoding System
- Dopamine Visual Framework

Tools Required:
- Claude Pro (analysis)
- Miro (visual mapping)
- Figma (design) or Canva

Free Alternative:
- Miro free board
- Canva Free for design visualization
- Google Drawings for diagrams

DELIVERABLE 08: MESSAGING ARCHITECTURE SYSTEM
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Messaging Architecture System for [Client Name].

STEP 1: Define Brand Voice
- 5 Dimensions: Formal ↔ Casual, Warm ↔ Cold, Serious ↔ Playful, Direct ↔ Narrative, Short ↔ Long
- Score each dimension (1-10)
- Write 3-sentence voice description

STEP 2: Define Tone by Context
- Website: [Tone]
- Social Media: [Tone]
- Email: [Tone]
- Ads: [Tone]
- Sales Calls: [Tone]
- Customer Support: [Tone]
- Example copy for each

STEP 3: Define Power Words by Chemical Trigger
- Dopamine: [Words] → [Phrases]
- Oxytocin: [Words] → [Phrases]
- Serotonin: [Words] → [Phrases]
- Cortisol: [Words] → [Phrases]
- Testosterone: [Words] → [Phrases]

STEP 4: Define Messaging Pillars (3-5)
- Pillar 1: [Name] → [Key Message] → [Proof]
- Pillar 2: [Name] → [Key Message] → [Proof]
- Pillar 3: [Name] → [Key Message] → [Proof]

STEP 5: Define Emotional Messaging
- Fear-based messaging: [When to use]
- Aspiration-based messaging: [When to use]
- Authority-based messaging: [When to use]
- Community-based messaging: [When to use]

STEP 6: Define CTA Frameworks
- Low Friction: "Learn More," "See More," "Watch Now"
- Medium Friction: "Sign Up," "Subscribe," "Get Offer"
- High Friction: "Buy Now," "Shop Now," "Order Now"
- CTA usage rules by temperature

STEP 7: Define Trust Language
- Words that build trust: [List]
- Phrases that build trust: [List]
- Trust signals: [Where to display]

STEP 8: Define Objection Handling
- Objection 1: "It's too expensive" → Response
- Objection 2: "I don't trust this brand" → Response
- Objection 3: "I don't need it now" → Response
- Objection 4: "It's complicated" → Response
- Objection 5: "I've been burned before" → Response

STEP 9: Format Output
- Brand Voice Profile (5 dimensions)
- Tone by Context Matrix
- Power Language Inventory
- Messaging Pillars
- CTA Engineering Framework
- Trust Language Guide
- Objection Response Library

Tools Required:
- Claude Pro (analysis)
- Notion (documentation)
- Google Docs (copywriting)

Free Alternative:
- Notion Free (unlimited blocks)
- Google Docs

PART 4: SECTION 3 — CONTENT & CREATIVE

DELIVERABLE 09: BRAND CONTENT OPERATING SYSTEM
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Brand Content Operating System for [Client Name].

STEP 1: Define Content DNA
- Purpose: Why content is created
- Voice: How content speaks
- Pillars: What content covers (3-5)
- Formats: How content is delivered
- Rhythm: When content is published

STEP 2: Define Content Pillars (5)
- Educational: Teaching and informing
- Emotional: Motivating and uplifting
- Authority: Expertise and credibility
- Community: Connection and belonging
- Conversion: Offerings and features

For each pillar:
- Topics (5-10)
- Purpose
- Audience
- Example content

STEP 3: Define Emotional Sequencing
- Awareness: Curiosity → Educational → TikTok/Reels
- Consideration: Empathy → Storytelling → Instagram/YouTube
- Evaluation: Trust → Evidence → Website/LinkedIn
- Decision: Urgency → Offer → Email/Ads
- Retention: Gratitude → Community → Email/Social

STEP 4: Define Narrative Arc Library
- Problem → Solution: Case Study
- Before → After: Transformation
- Hero's Journey: Brand Story
- Curiosity Gap: Educational

STEP 5: Define Viral Mechanics
- Emotional Trigger: Evoke strong emotion
- Social Currency: Make them look smart
- Practical Value: Solve a problem
- Story: Engage narrative
- Novelty: Show something new

STEP 6: Define Platform Strategy
- TikTok: [Strategy] → [Format] → [Frequency]
- Instagram Reels: [Strategy] → [Format] → [Frequency]
- Instagram Feed: [Strategy] → [Format] → [Frequency]
- LinkedIn: [Strategy] → [Format] → [Frequency]
- YouTube: [Strategy] → [Format] → [Frequency]
- Email: [Strategy] → [Format] → [Frequency]

STEP 7: Format Output
- Content DNA Profile
- Content Pillar Framework
- Emotional Sequencing Map
- Narrative Arc Library
- Viral Mechanics Framework
- Platform Strategy Matrix

Tools Required:
- Claude Pro (strategy)
- Notion (content calendar)
- Canva (content templates)
- Typeform (content planning) or free alternative

Free Alternative:
- Notion Free for content calendar
- Canva Free for templates
- Google Calendar for scheduling
- Airtable Free for content planning

DELIVERABLE 10: CREATIVE INTELLIGENCE MATRIX
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Creative Intelligence Matrix for [Client Name].

STEP 1: Map Buyer Triggers to Creative Angles
- Fear of Failure → "Transform or Be Left Behind" → Dark → Light (Before/After)
- Status Seeking → "Join the Elite" → Premium, Dark, Gold
- Convenience → "Efficiency is Power" → Clean, Minimal, Blue
- Validation → "See What Others Say" → Social Proof, Faces
- Control → "Take Command" → Authority visuals

STEP 2: Create Hook Bank (20+)
- Scroll-stopping hooks
- Curiosity hooks
- Emotional hooks
- Authority hooks
- Scarcity/viral hooks

Each hook with:
- Hook text
- Psychological trigger
- Best format
- Example visual

STEP 3: Create Headline Library (20+)
- Proven headline structures
- Pain point headlines
- Aspiration headlines
- Curiosity headlines
- Authority headlines

STEP 4: Create UGC Ideas (10+)
- Customer challenges
- Behind-the-scenes
- Transformation stories
- Customer tips
- Community content

STEP 5: Define Visual Directions by Angle
- Creative Angle → Visual Style → Color Palette → Typography → Mood

STEP 6: Create Creative Brief Templates
- Ad Creative Brief
- Social Post Brief
- Video Brief
- Email Brief
- Landing Page Brief

Each brief with:
- Objective
- Target Audience
- Key Message
- Visual Direction
- Copy Direction
- Success Metrics

STEP 7: Format Output
- Creative Angle Matrix
- Hook Bank (20+)
- Headline Library (20+)
- UGC Ideas (10+)
- Visual Direction Guide
- Creative Brief Templates

Tools Required:
- Claude Pro (generation)
- Airtable (organization) or Google Sheets
- Canva (visual examples)

Free Alternative:
- Google Sheets for matrix
- Canva Free for visual examples
- Notion Free for brief templates

DELIVERABLE 11: HOOK & ATTENTION LIBRARY
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Hook & Attention Library for [Client Name].

STEP 1: Define Pattern Interrupt Requirements
- Contrast: High vs. feed → Orienting response
- Face: Visible → Mirror neurons
- Emotion: Clear expression → Emotional response
- Text: Large, bold, short → Quick reading
- Motion: Movement → Attracts attention

STEP 2: Create Scroll-Stopping Hooks (10+)
- Format: [Hook Type] → [Example] → [Psychological Trigger] → [Platform Best For]

STEP 3: Create Curiosity Hooks (10+)
- Format: [Hook Type] → [Example] → [Information Gap] → [Platform Best For]

STEP 4: Create Emotional Hooks (10+)
- Fear, Hope, Anger, Joy, Surprise, Trust
- Format: [Emotion] → [Example] → [Trigger] → [Platform Best For]

STEP 5: Create Authority Hooks (5+)
- Expert-driven hooks
- Data-driven hooks
- Celebrity/Influencer hooks
- Format: [Authority Type] → [Example] → [Trust Trigger] → [Platform Best For]

STEP 6: Create Scarcity/Viral Hooks (5+)
- Urgency-driven hooks
- FOMO hooks
- Shareable hooks
- Format: [Hook Type] → [Example] → [Action Trigger] → [Platform Best For]

STEP 7: Define Platform-Specific Hook Rules
- TikTok: [Hook Rules] → [Timing] → [Format]
- Instagram Reels: [Hook Rules] → [Timing] → [Format]
- Instagram Feed: [Hook Rules] → [Timing] → [Format]
- LinkedIn: [Hook Rules] → [Timing] → [Format]
- YouTube: [Hook Rules] → [Timing] → [Format]

STEP 8: Format Output
- Pattern Interrupt Requirements
- Scroll-Stopping Hook Library (10+)
- Curiosity Hook Library (10+)
- Emotional Hook Library (10+)
- Authority Hook Library (5+)
- Scarcity/Viral Hook Library (5+)
- Platform-Specific Hook Rules

Tools Required:
- Claude Pro (generation)
- Airtable or Google Sheets (library)
- Canva (visual examples)

Free Alternative:
- Google Sheets for library
- Canva Free for visual examples
- Notion Free for organization

PART 5: SECTION 4 — PERFORMANCE & ACQUISITION

DELIVERABLE 12: META ADS INTELLIGENCE BLUEPRINT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Meta Ads Intelligence Blueprint for [Client Name].

STEP 1: Define Campaign Architecture
- TOF (Cold): Awareness → Broad Audience → Hook Creative → "Learn More" CTA → 40% Budget
- MOF (Warm): Consideration → Engaged Audience → Testimonial Creative → "Download Guide" CTA → 30% Budget
- BOF (Hot): Conversion → Hot Audience → Offer Creative → "Buy Now" CTA → 30% Budget

STEP 2: Translate Persona to Meta Interests
- Persona: [Name] → [Archetype] → [Interests Tier 1, 2, 3, 4]
- Each interest with: Name, Reason, Source

STEP 3: Define Audience Targeting
- Location: [Country, City, Radius]
- Age: [Min-Max]
- Gender: [All/Men/Women]
- Languages: [List]
- Detailed Targeting: Education, Job Title, Income, Relationship

STEP 4: Define Behavioral Targeting
- Digital Activities: Engaged Shoppers, Business Travelers
- Purchase Behavior: Online Purchases, High-Value Shoppers
- Mobile Device User: Samsung, iPhone 14, New Smartphone Users

STEP 5: Define Lookalike Audiences
- Purchasers: 1% → Precision prospecting
- Purchasers: 2-3% → Scaling
- High LTV Customers: 1% → Best customer cloning
- Leads (qualified): 3-5% → Expansion

STEP 6: Define Retargeting System
- Viewed Content (7 days): Soft offer → Carousel → 2/day
- Abandoned Cart (3 days): Urgency → Dynamic product → 3/day
- Past Purchaser (30 days): Cross-sell → Collection Ad → 2/day

STEP 7: Define Scaling Framework
- Horizontal Scaling: New audiences, new creatives
- Vertical Scaling: Increase budget, expand reach
- Creative Rotation: Every 2-3 weeks
- Fatigue Prevention: Monitor frequency >3

STEP 8: Define KPI System
- CTR: Target [X]%
- CPC: Target €[X]
- CPA: Target €[X]
- ROAS: Target [X]x
- MER: Target [X]x
- Frequency: Target <3.5

STEP 9: Format Output
- Campaign Architecture Diagram
- Persona-to-Interest Translation
- Audience Targeting Specification
- Retargeting Sequence
- Scaling Framework
- KPI Dashboard

Tools Required:
- Claude Pro (strategy)
- Meta Ads Manager (execution)
- Google Sheets (tracking)

Free Alternative:
- Meta Ads Manager (free to use)
- Google Sheets for planning
- Facebook Business Suite (free)

DELIVERABLE 13: FUNNEL & CONVERSION ARCHITECTURE
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Funnel & Conversion Architecture for [Client Name].

STEP 1: Define Funnel Structure
- TOF: Awareness → Content → Social Ads → Blog → Video
- MOF: Consideration → Lead Magnet → Landing Page → Email → Webinar
- BOF: Conversion → Offer → Sales Page → Checkout → Thank You

STEP 2: Define Landing Page Strategy
- TOF Landing Page: Problem-focused → Trust signals → Soft CTA
- MOF Landing Page: Solution-focused → Social proof → Medium CTA
- BOF Landing Page: Offer-focused → Urgency → Hard CTA

STEP 3: Define CTA Hierarchy
- Primary CTA: [Action] → [Where] → [When]
- Secondary CTA: [Action] → [Where] → [When]
- Tertiary CTA: [Action] → [Where] → [When]

STEP 4: Define Conversion Triggers
- Discount/Offer: [When to use] → [How to execute]
- Social Proof: [When to use] → [How to execute]
- Urgency/Scarcity: [When to use] → [How to execute]
- Authority: [When to use] → [How to execute]
- Guarantee: [When to use] → [How to execute]

STEP 5: Define Trust-Building Systems
- Social Proof: Reviews, testimonials, case studies
- Authority: Credentials, awards, media mentions
- Transparency: Pricing, terms, guarantees
- Consistency: Visual, message, experience

STEP 6: Define Objection Handling by Funnel Stage
- TOF Objections: [Objection] → [Response]
- MOF Objections: [Objection] → [Response]
- BOF Objections: [Objection] → [Response]

STEP 7: Define CRO Opportunities
- High Impact / Low Effort: [Opportunity 1], [Opportunity 2]
- High Impact / High Effort: [Opportunity 1], [Opportunity 2]
- Quick Wins: [Opportunity 1], [Opportunity 2]

STEP 8: Format Output
- Funnel Architecture Diagram
- Landing Page Strategy
- CTA Hierarchy
- Conversion Trigger Matrix
- Trust-Building Systems
- Objection Handling by Stage
- CRO Opportunity Map

Tools Required:
- Claude Pro (strategy)
- Unbounce or Leadpages (landing pages) or free alternative
- Google Optimize (A/B testing) or free alternative

Free Alternative:
- WordPress + Elementor for landing pages
- Google Optimize Free for A/B testing
- Google Analytics for tracking
- Hotjar Free for heatmaps (35 sessions/day)

DELIVERABLE 14: PRICING & OFFER PSYCHOLOGY REPORT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Pricing & Offer Psychology Report for [Client Name].

STEP 1: Define Price Sensitivity
- Price Sensitivity: [High/Medium/Low]
- Price Elasticity: [High/Medium/Low]
- Willingness to Pay: [Range]
- Value Perception: [Description]

STEP 2: Define Offer Hierarchy
- Lead Magnet: [Name] → Free → Attract
- Tripwire: [Name] → €[X] → First purchase
- Core Offer: [Name] → €[X] → Primary revenue
- Upsell: [Name] → €[X] → Increase AOV
- Cross-sell: [Name] → €[X] → Expand share
- Subscription: [Name] → €[X]/month → Recurring revenue

STEP 3: Define Pricing Psychology Techniques
- Anchoring: [How to use]
- Decoy: [How to use]
- Prestige: [How to use]
- Loss Aversion: [How to use]
- Framing: [How to use]

STEP 4: Define Scarcity Strategy
- Limited Time: [When to use] → [How to execute]
- Limited Quantity: [When to use] → [How to execute]
- Exclusive Access: [When to use] → [How to execute]

STEP 5: Define Upsell Opportunities
- Upsell 1: [Name] → [Trigger] → [Value]
- Upsell 2: [Name] → [Trigger] → [Value]
- Upsell 3: [Name] → [Trigger] → [Value]

STEP 6: Define Bundle Logic
- Bundle 1: [Name] → [Contents] → [Price] → [Savings]
- Bundle 2: [Name] → [Contents] → [Price] → [Savings]

STEP 7: Format Output
- Price Sensitivity Profile
- Offer Hierarchy
- Pricing Psychology Techniques
- Scarcity Strategy
- Upsell Opportunities
- Bundle Logic

Tools Required:
- Claude Pro (analysis)
- Google Sheets (calculations)
- Stripe or Gumroad (testing) or free alternative

Free Alternative:
- Google Sheets for calculations
- Manual price testing
- Survey tools for willingness-to-pay

PART 6: SECTION 5 — EXPERIENCE & RETENTION

DELIVERABLE 15: CUSTOMER EXPERIENCE BLUEPRINT
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Customer Experience Blueprint for [Client Name].

STEP 1: Map Emotional Journey
- Pre-Onboarding: Anticipation → Welcome email → Build excitement
- First Interaction: Delight → Easy setup → Create positive first impression
- Early Use: Confidence → Quick win → Build trust
- Continued Use: Trust → Consistency → Build loyalty

STEP 2: Define Onboarding Psychology
- Welcome Sequence: [Email 1] → [Email 2] → [Email 3]
- First Touch: [Action] → [Emotion] → [Outcome]
- Milestone Moments: [Milestone] → [Celebration] → [Emotion]

STEP 3: Define Retention Mechanics
- Habit Formation: [How to build habits] → [Frequency]
- Identity Reinforcement: [How to reinforce identity] → [Touchpoints]
- Community Connection: [How to build community] → [Platform]

STEP 4: Define Referral Triggers
- Pride: [How to trigger] → [Reward]
- Social Status: [How to trigger] → [Reward]
- Rewards: [How to trigger] → [Reward]
- Community: [How to trigger] → [Reward]

STEP 5: Define Community Systems
- Platform: [Where]
- Engagement: [How]
- Recognition: [How]
- Growth: [How]

STEP 6: Define Loyalty Loops
- Trigger → Action → Reward → Investment
- Loop 1: [Trigger] → [Action] → [Reward] → [Investment]
- Loop 2: [Trigger] → [Action] → [Reward] → [Investment]

STEP 7: Define Brand Rituals
- Ritual 1: [Name] → [Frequency] → [Emotion] → [Touchpoint]
- Ritual 2: [Name] → [Frequency] → [Emotion] → [Touchpoint]
- Ritual 3: [Name] → [Frequency] → [Emotion] → [Touchpoint]

STEP 8: Format Output
- Emotional Journey Map
- Onboarding Psychology Guide
- Retention Mechanics Blueprint
- Referral Trigger System
- Community Design Framework
- Loyalty Loop Architecture
- Brand Ritual System

Tools Required:
- Claude Pro (strategy)
- Miro (journey mapping)
- Customer.io or Mailchimp (email) or free alternative

Free Alternative:
- Miro Free for journey mapping
- Mailchimp Free for email
- Google Forms for feedback
- WhatsApp/Telegram for community

PART 7: SECTION 6 — AI & SYSTEMS (PREMIUM)

DELIVERABLE 16: AI BRAND KNOWLEDGE SYSTEM
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the AI Brand Knowledge System for [Client Name].

STEP 1: Create AI-Readable Brand Schema (JSON)

{
  "brand": {
    "id": "[Client ID]",
    "name": "[Brand Name]",
    "essence": "[Brand Essence]",
    "positioning": "[Positioning Statement]",
    "neurological_signature": {
      "primary_utility": "[FUEL/SHIELD/TREAT/SIGNAL]",
      "chemical_trigger": "[Chemical]",
      "response_pattern": {
        "attention": "[Trigger]",
        "engagement": "[Trigger]",
        "trust": "[Trigger]",
        "action": "[Trigger]"
      }
    },
    "voice": {
      "profile": "[Voice Description]",
      "tone_by_context": {
        "website": "[Tone]",
        "social": "[Tone]",
        "email": "[Tone]",
        "ads": "[Tone]"
      },
      "power_words": ["[Word 1]", "[Word 2]"],
      "words_to_avoid": ["[Word 1]", "[Word 2]"]
    },
    "visual_identity": {
      "colors": {
        "primary": "[Hex]",
        "secondary": ["[Hex]"],
        "neutral": ["[Hex]"],
        "accent": "[Hex]"
      },
      "typography": {
        "headline": "[Font]",
        "body": "[Font]"
      }
    },
    "persona": {
      "name": "[Persona Name]",
      "archetype": "[Archetype]",
      "emotional_drivers": ["[Driver 1]", "[Driver 2]"],
      "fears": ["[Fear 1]", "[Fear 2]"]
    }
  }
}

STEP 2: Create Brand Prompt System

System Prompt Template:
"You are [Brand Name], a [Brand Essence] brand that [Positioning]. You speak with a [Voice Description] voice. Your target audience is [Persona Name], who is driven by [Emotional Drivers] and fears [Fears]. Always respond in [Tone] tone. Never use [Words to Avoid]. Use power words like [Power Words]."

Ad Prompt Template:
"Create an ad for [Product/Service] targeting [Persona Name] who is [Emotional Driver]. Use the hook '[Hook Formula]'. The ad should be [Tone] and end with '[CTA]'."

Content Prompt Template:
"Create a [Content Type] for [Platform] targeting [Persona Name]. The content should be [Tone] and focus on [Topic]. Use power words like [Power Words]."

STEP 3: Define AI Tone Rules
- Personality: [5-7 traits]
- Vocabulary Level: [Formal/Conversational/Sophisticated]
- Sentence Structure: [Short/Medium/Varied]
- Empathy Level: [High/Medium/Low]
- Humor Level: [High/Medium/Low/None]

STEP 4: Define AI Content Rules
- Content Types: [List]
- Content Length: [By type]
- Content Structure: [By type]
- Content Frequency: [By platform]

STEP 5: Format Output
- JSON Brand Schema
- Prompt System (3 templates)
- AI Tone Rules
- AI Content Rules

Tools Required:
- Claude Pro (generation)
- JSON Validator (free)
- Prompt testing

Free Alternative:
- Manual JSON creation
- Testing prompts in Claude
- Documentation in Notion

DELIVERABLE 17: BEHAVIORAL KNOWLEDGE GRAPH
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Behavioral Knowledge Graph for [Client Name].

STEP 1: Map Fear → Trigger Relationships
- Fear 1: [Fear] → Trigger: [Trigger] → Activation: [How to activate]
- Fear 2: [Fear] → Trigger: [Trigger] → Activation: [How to activate]
- Fear 3: [Fear] → Trigger: [Trigger] → Activation: [How to activate]

STEP 2: Map Trigger → Messaging Relationships
- Trigger 1: [Trigger] → Messaging: [Message] → Application: [Where to use]
- Trigger 2: [Trigger] → Messaging: [Message] → Application: [Where to use]
- Trigger 3: [Trigger] → Messaging: [Message] → Application: [Where to use]

STEP 3: Map Messaging → Creative Relationships
- Messaging 1: [Message] → Creative: [Creative Direction] → Format: [Format]
- Messaging 2: [Message] → Creative: [Creative Direction] → Format: [Format]
- Messaging 3: [Message] → Creative: [Creative Direction] → Format: [Format]

STEP 4: Map Creative → Platform Relationships
- Creative 1: [Creative] → Platform: [Platform] → Best Format: [Format]
- Creative 2: [Creative] → Platform: [Platform] → Best Format: [Format]
- Creative 3: [Creative] → Platform: [Platform] → Best Format: [Format]

STEP 5: Map Platform → CTA Relationships
- Platform 1: [Platform] → CTA: [CTA] → Friction: [Low/Medium/High]
- Platform 2: [Platform] → CTA: [CTA] → Friction: [Low/Medium/High]
- Platform 3: [Platform] → CTA: [CTA] → Friction: [Low/Medium/High]

STEP 6: Map CTA → Conversion Relationships
- CTA 1: [CTA] → Conversion: [Conversion Rate] → Best For: [Temperature]
- CTA 2: [CTA] → Conversion: [Conversion Rate] → Best For: [Temperature]
- CTA 3: [CTA] → Conversion: [Conversion Rate] → Best For: [Temperature]

STEP 7: Format Output
- Complete Behavior Map (Visual)
- Fear → Trigger → Messaging → Creative → Platform → CTA → Conversion flow
- Each node with attributes and relationships

Tools Required:
- Claude Pro (mapping)
- Miro (visual graph)
- Neo4j or GraphDB (if premium) or free alternative

Free Alternative:
- Miro Free for visual graph
- Draw.io for diagram
- Manual mapping in Notion

DELIVERABLE 18: PREDICTIVE GROWTH INTELLIGENCE DASHBOARD
AI Instruction Set
text
You are the NextLuma Brand Architect. Generate the Predictive Growth Intelligence Dashboard for [Client Name].

STEP 1: Define Predictive Behaviors
- Behavior 1: [Behavior] → Prediction: [Prediction] → Confidence: [X%]
- Behavior 2: [Behavior] → Prediction: [Prediction] → Confidence: [X%]
- Behavior 3: [Behavior] → Prediction: [Prediction] → Confidence: [X%]

STEP 2: Define Trend Forecasting
- Trend 1: [Trend] → Forecast: [Forecast] → Timeline: [Timeline]
- Trend 2: [Trend] → Forecast: [Forecast] → Timeline: [Timeline]
- Trend 3: [Trend] → Forecast: [Forecast] → Timeline: [Timeline]

STEP 3: Define Conversion Probability
- Segment 1: [Segment] → Conversion Probability: [X%] → Action: [Action]
- Segment 2: [Segment] → Conversion Probability: [X%] → Action: [Action]
- Segment 3: [Segment] → Conversion Probability: [X%] → Action: [Action]

STEP 4: Define Churn Risk
- Segment 1: [Segment] → Churn Risk: [X%] → Retention Action: [Action]
- Segment 2: [Segment] → Churn Risk: [X%] → Retention Action: [Action]
- Segment 3: [Segment] → Churn Risk: [X%] → Retention Action: [Action]

STEP 5: Define Content Performance Prediction
- Content Type 1: [Type] → Predicted Performance: [X] → Optimization: [Action]
- Content Type 2: [Type] → Predicted Performance: [X] → Optimization: [Action]
- Content Type 3: [Type] → Predicted Performance: [X] → Optimization: [Action]

STEP 6: Format Output
- Dashboard Layout (Looker/Tableau)
- KPI Cards (Current + Projected)
- Trend Charts (Historical + Forecast)
- Alert System (Red/Yellow/Green thresholds)

Tools Required:
- Claude Pro (analysis)
- Looker Studio or Tableau (dashboard) or free alternative
- Google Sheets (data)

Free Alternative:
- Looker Studio Free (Google Data Studio)
- Google Sheets for data
- Manual dashboards in Notion
- Excel for calculations

PART 8: TOOL-SPECIFIC EXECUTION INSTRUCTIONS

8.1 Logo & Vector Graphics (.AI Files)
Using Higgsfield AI via MCP Connector:
text
You are the NextLuma Brand Architect. Generate logo concepts using Higgsfield AI.

Prompt Structure for Logo Generation:
"Generate a logo for [Brand Name] with the following specifications:
- Archetype: [Archetype]
- Primary Color: [Hex]
- Secondary Color: [Hex]
- Shape Language: [Shape]
- Style: [Modern/Minimal/Luxury/Tech]
- Usage: [Primary/Secondary/Icon]

Generate 5 variations and provide SVG output."

To get .AI files:
1. Generate SVG via Higgsfield
2. Open SVG in Inkscape (free) or Illustrator
3. Save as .AI
Using Recraft AI (Free Alternative):
text
Go to recraft.ai
Upload brand specifications
Generate logo in SVG format
Download SVG
Open in Inkscape → Save as .AI

8.2 Social Media Templates (.PSD Files)
Using Lovart AI:
text
Prompt: "Create an Instagram post template for [Brand Name] with:
- Dimensions: 1080x1080
- Color Palette: [Hex 1], [Hex 2], [Hex 3]
- Typography: [Font Name]
- Style: [Modern/Minimal/Luxury]
- Elements: Logo placement, headline area, CTA button"

Export as PSD (layered)
Using Canva (Free Alternative):
text
1. Open Canva
2. Create design (1080x1080)
3. Apply brand colors, fonts, logo
4. Download as PSD (Canva Pro only) or PDF (free)
5. If free, use Photopea (free online Photoshop) to convert to PSD
Using Photopea (Free Online PSD Editor):
text
1. Go to photopea.com
2. Open Canva PDF
3. Edit layers
4. Save as PSD

8.3 Presentation Decks (.PPTX Files)
Using Canva:
text
1. Open Canva
2. Create presentation
3. Apply brand templates
4. Export as PPTX (Canva Pro) or PDF (free)
5. Use Microsoft PowerPoint Online (free) to convert PDF to PPTX
Using Google Slides (Free):
text
1. Open Google Slides
2. Create presentation
3. Apply brand templates
4. Download as PPTX
5. Use slidesgo.com for free templates

8.4 Visual Manipulation & Design
Using Canva (Free + Pro):
Task
 | Method

Social Templates
 | Canva templates + brand kit

Infographics
 | Canva infographic templates

Presentations
 | Canva presentation templates

Mood Boards
 | Canva mood board templates

Brand Guidelines
 | Canva document templates

Using Figma (Free):
text
1. Open Figma
2. Create design system
3. Add brand colors, fonts, components
4. Create templates
5. Export assets

8.5 Color Palette Generation
Using Coolors (Free):
text
1. Go to coolors.co
2. Lock primary color
3. Generate palette
4. Export as PDF/PNG
5. Copy Hex codes
Using Adobe Color (Free):
text
1. Go to color.adobe.com
2. Create color wheel
3. Extract theme
4. Copy Hex codes

8.6 Typography Selection
Using Google Fonts (Free):
text
1. Go to fonts.google.com
2. Search by category, style
3. Preview with brand copy
4. Download font pairs
5. Use in Canva/Figma/Google Docs
Using FontPair (Free):
text
1. Go to fontpair.co
2. Browse font combinations
3. Copy font names
4. Use in designs

8.7 Brand Book Creation
Using Canva (Free + Pro):
text
1. Open Canva
2. Search "Brand Guidelines"
3. Use template
4. Add brand elements
5. Export as PDF
Using Notion (Free):
text
1. Open Notion
2. Create brand book page
3. Add sections:
   - Brand Overview
   - Logo Usage
   - Color Palette
   - Typography
   - Voice & Tone
   - Imagery
   - Applications
4. Export as PDF
Using Google Docs (Free):
text
1. Open Google Docs
2. Create brand book document
3. Add sections
4. Insert images, tables
5. Export as PDF

8.8 MCP Connectors Setup
For Higgsfield AI (Image/Logo Generation):
text
Add to claude_desktop_config.json:

{
  "mcpServers": {
    "higgsfield": {
      "url": "https://mcp.higgsfield.ai/sse"
    }
  }
}
For SerpAPI (Live Search):
text
{
  "mcpServers": {
    "serpapi": {
      "url": "https://mcp.serpapi.com/YOUR_API_KEY/mcp"
    }
  }
}
For Pulse MCP (Social Metrics):
text
{
  "mcpServers": {
    "pulse": {
      "command": "npx",
      "args": ["-y", "pulse-mcp"]
    }
  }
}
For Notion MCP (Documentation):
text
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@iflow-mcp/notion-mcp"],
      "env": {
        "NOTION_API_KEY": "your-key"
      }
    }
  }
}

8.9 File Format Conversion
SVG → AI (Vector):
text
1. Open SVG in Inkscape (free)
2. File → Save As
3. Select "Adobe Illustrator (*.ai)"
4. Save
PNG → PSD (Layered):
text
1. Open PNG in Photopea (free)
2. Add layers
3. File → Save As PSD
PDF → PPTX (Presentation):
text
1. Open PDF in Microsoft PowerPoint Online (free)
2. File → Save As
3. Select PPTX

PART 9: MASTER EXECUTION CHECKLIST

Deliverable
 | Claude Prompt
 | Tools
 | Free Alternative
 | Output

01 Executive Intelligence Report
 | Section 2 → D01
 | Claude Pro, Notion
 | Claude Free, Google Docs
 | PDF

02 Persona System
 | Section 2 → D02
 | Claude Pro, Miro, Notion
 | Claude Free, Miro Free, Notion Free
 | PDF + Notion

03 Competitive Battlefield Intel
 | Section 2 → D03
 | SerpAPI, Miro
 | Manual search, Miro Free
 | PDF + Miro

04 Market Opportunity Report
 | Section 2 → D04
 | SerpAPI, Statista
 | Google Trends, Free sources
 | PDF + Sheets

05 Brand Positioning Blueprint
 | Section 3 → D05
 | Claude Pro, Canva
 | Claude Free, Canva Free
 | PDF

06 Semiotic Brand System
 | Section 3 → D06
 | Claude Pro, Coolors
 | Claude Free, Coolors Free
 | PDF

07 Neuro-Visual Identity Blueprint
 | Section 3 → D07
 | Claude Pro, Miro, Figma
 | Claude Free, Miro Free, Figma Free
 | PDF + Figma

08 Messaging Architecture
 | Section 3 → D08
 | Claude Pro, Notion
 | Claude Free, Notion Free
 | PDF

09 Brand Content OS
 | Section 4 → D09
 | Claude Pro, Notion
 | Claude Free, Notion Free
 | Notion

10 Creative Intelligence Matrix
 | Section 4 → D10
 | Claude Pro, Airtable
 | Claude Free, Google Sheets
 | Airtable/Sheets

11 Hook & Attention Library
 | Section 4 → D11
 | Claude Pro, Airtable
 | Claude Free, Google Sheets
 | Airtable/Sheets

12 Meta Ads Blueprint
 | Section 5 → D12
 | Claude Pro, Meta Ads
 | Claude Free, Meta Ads Free
 | Slides

13 Funnel & Conversion Architecture
 | Section 5 → D13
 | Claude Pro, Unbounce
 | Claude Free, WordPress
 | PDF

14 Pricing & Offer Psychology
 | Section 5 → D14
 | Claude Pro, Sheets
 | Claude Free, Sheets
 | PDF + Sheets

15 Customer Experience Blueprint
 | Section 6 → D15
 | Claude Pro, Miro
 | Claude Free, Miro Free
 | PDF + Miro

16 AI Brand Knowledge System
 | Section 7 → D16
 | Claude Pro, JSON
 | Claude Free, Manual JSON
 | JSON + Docs

17 Behavioral Knowledge Graph
 | Section 7 → D17
 | Claude Pro, Miro
 | Claude Free, Miro Free
 | Graph + Docs

18 Predictive Growth Dashboard
 | Section 7 → D18
 | Claude Pro, Looker Studio
 | Claude Free, Looker Studio Free
 | Dashboard

PART 10: QUALITY ASSURANCE CHECKLIST
text
☐ SECTION 1: EXECUTIVE & STRATEGIC INTELLIGENCE
   ☐ Executive Intelligence Report (8 sub-deliverables)
   ☐ Neuro-Psychographic Persona System (12 sub-deliverables)
   ☐ Competitive Battlefield Intelligence (7 sub-deliverables)
   ☐ Market Opportunity & Trend Report (5 sub-deliverables)

☐ SECTION 2: BRAND STRATEGY
   ☐ Brand Positioning Blueprint (11 sub-deliverables)
   ☐ Semiotic Brand System (6 sub-deliverables)
   ☐ Neuro-Visual Identity Blueprint (7 sub-deliverables)
   ☐ Messaging Architecture System (8 sub-deliverables)

☐ SECTION 3: CONTENT & CREATIVE
   ☐ Brand Content Operating System (7 sub-deliverables)
   ☐ Creative Intelligence Matrix (6 sub-deliverables)
   ☐ Hook & Attention Library (5 sub-deliverables)

☐ SECTION 4: PERFORMANCE & ACQUISITION
   ☐ Meta Ads Intelligence Blueprint (8 sub-deliverables)
   ☐ Funnel & Conversion Architecture (6 sub-deliverables)
   ☐ Pricing & Offer Psychology Report (5 sub-deliverables)

☐ SECTION 5: EXPERIENCE & RETENTION
   ☐ Customer Experience Blueprint (7 sub-deliverables)

☐ SECTION 6: AI & SYSTEMS
   ☐ AI Brand Knowledge System (6 sub-deliverables)
   ☐ Behavioral Knowledge Graph (4 sub-deliverables)
   ☐ Predictive Growth Dashboard (5 sub-deliverables)

☐ FINAL VALIDATION
   ☐ All deliverables formatted as structured markdown
   ☐ All tables populated with data
   ☐ JSON schemas validated
   ☐ Visual maps created (Miro)
   ☐ Brand Book assembled (Canva/Notion)
   ☐ Client presentation deck created (Slides)
   ☐ Handoff documents extracted for Phase 3/4

FINAL SYSTEM NOTE
text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                             │
│  SYSTEM ACTIVATION COMPLETE                                                                                                │
│  ────────────────────────                                                                                                   │
│                                                                                                                             │
│  This AI Instruction Set provides Claude with everything needed to execute ALL Phase 2 Brand Architecture deliverables.     │
│                                                                                                                             │
│  TOTAL DELIVERABLES: 18 Major | 117 Sub-Deliverables                                                                        │
│  TOTAL EXECUTION TIME: 14-21 Days                                                                                           │
│                                                                                                                             │
│  TOOL STRATEGY:                                                                                                             │
│  • Paid tools for speed and quality (Claude Pro, Higgsfield, Canva Pro)                                                    │
│  • Free alternatives for every paid tool (Inkscape, Photopea, Google Slides, Looker Studio)                                 │
│  • MCP connectors for seamless integration                                                                                  │
│                                                                                                                             │
│  "Every deliverable must answer: How does this help the client make more money, acquire customers faster,                   │
│   or dominate perception?"                                                                                                  │
│                                                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
