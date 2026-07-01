---
name: nextluma-color-system
description: NextLuma Agency's official color design system — "Cold Architecture × Living Intelligence". Use this skill whenever designing, building, or styling ANYTHING for NextLuma, LumaZest, or ERPLuma: websites, landing pages, decks, UI mockups, brand boards, social graphics, dashboards, or any visual asset. Provides the exact core brand colors (Architect Navy, System Blue, Charcoal Core, Pure White), the Signature Intelligence Gradient (Quantum Violet → Neon Magenta → Cyber Cyan → Electric Blue + Plasma Pink accent), UI neutrals, metallic accents, the color-logic mapping, and the non-negotiable design rules (gradients only blended, never flat neon, no warm tones, premium technical feeling only). Trigger on "NextLuma colors", "brand palette", "apply the brand", "design system", "make it on-brand", "intelligence gradient", or any NextLuma visual work.
---

# NextLuma Agency — Color System

**Tagline:** *Cold Architecture × Living Intelligence*

The system has two halves that must always coexist:
1. **Cold Architecture** — deep navies, charcoal, white. Conveys authority, structure, engineering precision. This is the *foundation* and should dominate surface area.
2. **Living Intelligence** — the blended violet→cyan→blue gradient. Conveys AI, motion, premium energy. This is the *accent* and should be used sparingly and always blended.

When in doubt: **architecture is the canvas, intelligence is the signal.**

---

## 1. Core Brand Colors

Use these for structure, backgrounds, authority, and typography. They carry the most surface area.

| Name | HEX | Role | Use for |
|------|-----|------|---------|
| Architect Navy | `#0B1E3C` | Authority | Headlines, logo, dark sections, primary dark background |
| System Blue | `#123A6F` | Architecture | Secondary surfaces, structural blocks, depth layering |
| Charcoal Core | `#1C1C1E` | Engineering | Technical UI, code surfaces, near-black panels |
| Pure White | `#FFFFFF` | Canvas | Primary light background, clarity, breathing room |

---

## 2. Signature Intelligence Gradient

The single most important brand asset. Used ONLY for AI visuals, abstract "brain"/neural imagery, motion graphics, premium marketing accents, and CTAs that need energy. **Never** as flat fills on large surfaces.

Left-to-right stops:

| Name | HEX | Position |
|------|-----|----------|
| Quantum Violet | `#7B4DFF` | 0% |
| Neon Magenta | `#E056FD` | 33% |
| Cyber Cyan | `#4CD7FF` | 66% |
| Electric Blue | `#2F80ED` | 100% |

Floating accent (orbs, highlights, particle pops):

| Name | HEX |
|------|-----|
| Plasma Pink | `#FF4D8D` |

Canonical CSS:
```css
background: linear-gradient(90deg, #7B4DFF 0%, #E056FD 33%, #4CD7FF 66%, #2F80ED 100%);
```

---

## 3. UI Neutrals

For interface chrome, borders, secondary text, and panels on light backgrounds.

| Name | HEX | Use for |
|------|-----|---------|
| Light Panel Gray | `#F3F4F6` | Card backgrounds, light panels |
| Soft Border Gray | `#E5E7EB` | Dividers, borders, input outlines |
| Text Gray | `#6B7280` | Body text on light, secondary labels |

---

## 4. Metallic Accents

**Restricted use:** only inside 3D futuristic renders (chrome spheres, brushed-metal objects, hardware mockups). Never as UI fills or text colors.

| Name | HEX |
|------|-----|
| Chrome Light | `#DADADA` |
| Steel Shadow | `#8A8A8A` |

---

## 5. Color Logic (meaning map)

Every color choice should reinforce one of these associations:

| Color family | Communicates |
|--------------|--------------|
| Navy / System Blue | Architecture, structure |
| Intelligence Gradient | Intelligence, AI, motion |
| White | Clarity |
| Charcoal | Engineering |

---

## 6. Design Rules (NON-NEGOTIABLE)

1. **Gradients only blended** — the intelligence gradient must always have smooth transitions and soft blur. Never hard color stops or banding.
2. **Never flat neon** — do not place raw `#E056FD` or `#7B4DFF` as a solid flat fill across a large area. Neon lives inside the blended gradient, glows, or small accents only.
3. **No warm tones** — no oranges, warm yellows, warm reds, or warm browns. The system is cold. Plasma Pink is the only "pink" and it reads cool/magenta, not warm.
4. **Premium technical feeling only** — every composition should feel engineered, spacious, and high-end. Avoid clutter, playful/casual styling, and decorative noise.

---

## 7. Application Guidance

- **Dominant surface:** Pure White (light mode) or Architect Navy / Charcoal Core (dark mode).
- **Accent budget:** keep the intelligence gradient to roughly 10–20% of any composition — hero element, key CTA, a single feature graphic. More than that breaks the "cold architecture" foundation.
- **Text:** Architect Navy or Charcoal Core on light; Pure White on dark. Use Text Gray `#6B7280` for secondary copy only.
- **Glows:** when emphasis is needed, use a large soft blur (60–150px) of a gradient color behind an element rather than a flat highlight.
- **Depth:** stack Pure White → Light Panel Gray panels → System Blue / Navy blocks to build the layered "spatial" feel shown in the brand board.

When the user asks for tokens or code, pull the exact values from `references/tokens.css` (CSS custom properties) or `references/tokens.json`. For the full visual reference that mirrors the official brand board, open `references/showcase.html`.
