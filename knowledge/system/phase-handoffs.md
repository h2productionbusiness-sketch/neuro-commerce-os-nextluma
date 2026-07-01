# Neuro-Commerce OS — Phase Handoff Map (continuity contract)

Each phase consumes the prior phase's outputs. Agents MUST read the upstream deliverables from
`clients/<slug>/phaseN/` (see `client-memory`) and map them per the tables below — this is what makes the
OS one continuous system rather than five disconnected tools.

## Phase 1 → Phase 2 (Diagnostic → Brand)
| Phase 1 output | Phase 2 uses it for |
|---|---|
| Persona Profiles | Archetype selection, Brand Positioning |
| Emotional Drivers | Chemical-Trigger Mapping, Neuro-Chromatic System |
| Market Intelligence | Competitive Positioning, Fellowship Position |
| Financial Data | Unit Economics (also feeds Phase 4) |
| Customer Signals | StoryBrand Narrative, Messaging Framework |
| Congregation Intelligence | Platform Strategy, Content OS |
| Strategic Recommendations | Core Strategy Statement, Brand Credentials |

## Phase 2 → Phase 3 (Brand → Content)
| Phase 2 output | Phase 3 uses it for |
|---|---|
| Brand Neurological Signature | Neuro-target (Dopamine/Oxytocin/…) |
| StoryBrand Narrative | Scriptwriting, Episode Architecture |
| Brand Voice & Tone | Voiceover Director, Scriptwriter |
| Visual Identity System | Scene Architecture, Composition, Lighting, Colour Grading |
| Hook Engineering | Pattern-Interrupt Engineer |
| CTA Engineering | Edit Strategist |
| Messaging Framework | Scriptwriter, Voiceover Director |
| Platform Strategy | Format & Platform Strategists |

## Phase 3 → Phase 4 (Content → Ads)
| Phase 3 output | Phase 4 uses it for |
|---|---|
| Hooks & Scripts | Creative Testing Matrix (T-META-04) |
| Visual Assets (image/video) | Ad Creatives |
| Voiceovers | Ad audio/video |
| Storyboards | Ad visual direction |
| Content Briefs | Campaign Strategy Brief (T-META-01) |
| Neuro-target Mapping | Audience targeting, hook selection |

## Phase 4 → Phase 5 (Ads → Growth)
| Phase 4 output | Phase 5 uses it for |
|---|---|
| Campaign Performance Data | Predictive Models, Trend Forecasting |
| Creative Performance Data | Learning Loop, Knowledge Graph |
| Audience Engagement Data | Persona Refinement, Churn-Risk Scoring |
| CPA/ROAS Data | Predictive Growth Intelligence |
| Winning Hooks/Angles | Knowledge Graph evolution |
| Unit Economics Validation | Predictive Dashboard |

## Phase 5 → Self-Improvement (feedback loop → back to Phase 1)
| Phase 5 output | Self-improvement uses it for |
|---|---|
| Knowledge Graph updates | Refined persona models |
| Predictive Models | Improved skill definitions |
| Trend Forecasts | Updated tool recommendations |
| Learning-Loop Insights | Optimized agent performance |
| Churn-Risk Scores | Refined customer experience |
| Conversion Probabilities | Improved audience targeting |

## Rule
At the start of any phase N≥2, the owning agent reads the upstream deliverables and states, in one line,
which upstream artifacts it is consuming — then proceeds. If an upstream artifact is missing, it flags the
gap and offers to run/backfill that phase first. Persist each phase's outputs to `clients/<slug>/phaseN/`.
