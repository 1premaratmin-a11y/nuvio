---
version: alpha
name: Nuvio
description: Modern web studio — dark theme with purple/blue gradient accents. Technical, premium, fast.
colors:
  primary: "#7c3aed"
  bg-primary: "#0a0a0f"
  bg-secondary: "#12121a"
  bg-tertiary: "#1a1a2e"
  bg-card: "rgba(255, 255, 255, 0.03)"
  bg-card-hover: "rgba(255, 255, 255, 0.06)"
  border: "rgba(255, 255, 255, 0.08)"
  border-hover: "rgba(255, 255, 255, 0.15)"
  text-primary: "#f0f0f5"
  text-secondary: "#a0a0b8"
  text-muted: "#6b6b80"
  accent-1: "#7c3aed"
  accent-2: "#3b82f6"
  accent-light: "#a78bfa"
  success: "#10b981"
  danger: "#ef4444"
  gold: "#fbbf24"
typography:
  h1:
    fontFamily: "Source Sans 3"
    fontSize: "4.5rem"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-1.4px"
    fontFeature: '"ss01"'
  h2:
    fontFamily: "Source Sans 3"
    fontSize: "3rem"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-1px"
    fontFeature: '"ss01"'
  h3:
    fontFamily: "Source Sans 3"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: '"ss01"'
  body-lg:
    fontFamily: "Source Sans 3"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Source Sans 3"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Source Sans 3"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Source Sans 3"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.0
    fontFeature: '"ss01"'
  label:
    fontFamily: "Source Sans 3"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: "0.05em"
    fontFeature: '"ss01"'
  mono:
    fontFamily: "Source Code Pro"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  2xl: 64px
  3xl: 80px
  4xl: 120px
shadows:
  card: "rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px"
  soft: "rgba(23,23,23,0.08) 0px 15px 35px 0px"
  glow: "0 4px 20px rgba(124, 58, 237, 0.3)"
  glow-strong: "0 6px 30px rgba(124, 58, 237, 0.5)"
components:
  btn-primary:
    backgroundColor: "{colors.accent-1}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    typography: "{typography.button}"
  btn-primary-hover:
    backgroundColor: "{colors.accent-2}"
    rounded: "{rounded.sm}"
  btn-secondary:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
    typography: "{typography.button}"
  btn-secondary-hover:
    backgroundColor: "{colors.bg-card-hover}"
    borderColor: "{colors.border-hover}"
  card:
    backgroundColor: "{colors.bg-card}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-hover:
    backgroundColor: "{colors.bg-card-hover}"
    borderColor: "{colors.border-hover}"
  input:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  input-focus:
    borderColor: "{colors.accent-1}"
  nav-link:
    typography: "{typography.label}"
    textColor: "{colors.text-secondary}"
  nav-link-hover:
    textColor: "{colors.text-primary}"
  section-label:
    typography: "{typography.label}"
    textColor: "{colors.accent-1}"
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  pricing-card-featured:
    backgroundColor: "linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%)"
    borderColor: "{colors.accent-1}"
---

## Overview

Nuvio is a modern web studio brand built on a dark, technical, premium aesthetic.
The visual language draws from Vercel, Linear, and Stripe — dark backgrounds with
purple/blue gradient accents, weight-300 display typography, and blue-tinted shadows
that add atmospheric depth.

## Colors

- **bg-primary (#0a0a0f)**: Near-black canvas with subtle warmth. Never use pure black.
- **accent-1 (#7c3aed)**: Nuvio purple — the primary brand color for CTAs, links, and highlights.
- **accent-2 (#3b82f6)**: Electric blue — the secondary accent, paired with purple in gradients.
- **accent-light (#a78bfa)**: Light lavender for gradient text and soft accents.
- **text-primary (#f0f0f5)**: Off-white for headings and primary text. Never pure white.
- **text-secondary (#a0a0b8)**: Muted lavender-gray for body text and descriptions.
- **text-muted (#6b6b80)**: Dimmed text for labels, metadata, and fine print.
- **success (#10b981)**: Green for status indicators and form success states.
- **gold (#fbbf24)**: Amber for star ratings and premium accents.

## Typography

Source Sans 3 is the primary font, used at weight 300 for display sizes (h1, h2) to
create the Stripe-style "whispered authority" — confident lightness rather than
shouting boldness. Weight 600 is used for buttons and labels only.

- All display text uses `font-feature-settings: "ss01"` for geometric alternate glyphs
- Progressive letter-spacing: -1.4px at 72px, -1px at 48px, -0.5px at 24px, 0 below 16px
- Source Code Pro for code blocks at 0.9rem with 1.8 line-height for readability
- Labels are uppercase with 0.05em tracking — the "section label" pattern

## Layout & Spacing

8px base unit. Sections use 120px vertical padding (80px on mobile). Max content
width is 1200px (the `--max-width` container). Cards have 32px internal padding.
The spacing scale is dense at the small end (8px, 16px, 24px, 32px) and generous
at the section level (64px, 80px, 120px).

## Elevation & Depth

Multi-layer shadows with blue-tinted primary color (rgba(50,50,93,...)) — never
neutral gray shadows. This creates brand-colored atmospheric depth. The glow
shadow uses the accent purple at low opacity for interactive element halos.

- **card**: Blue-tinted multi-layer (far + near) for elevated cards
- **soft**: Single ambient layer for subtle lift
- **glow**: Purple glow for primary CTA buttons
- **glow-strong**: Intensified glow for hover states

## Shapes

Conservative border-radius scale: 4px for buttons/inputs, 8px for badges, 12px for
cards, 16px for large containers, 20px for hero elements. Never use pill shapes
(border-radius: 9999px) on cards or buttons — only on small badges and status dots.

## Components

**btn-primary** is the main CTA — purple background, white text, 4px radius, 12px
vertical padding. On hover it shifts to blue and lifts 2px with an intensified glow.

**card** is the workhorse container — semi-transparent white (0.03 opacity) on dark
background, 1px subtle border, 12px radius. On hover the background and border both
intensify, and the card lifts 4px.

**input** uses the secondary background (slightly lighter than page bg) with a
subtle border that turns purple on focus. No border radius larger than 4px.

**pricing-card-featured** uses a subtle purple gradient overlay at the top that
fades to transparent, with a solid purple border and a "Most Popular" badge
floating above the card.

## Do's and Don'ts

### Do
- Use weight 300 for all display typography — lightness is the brand voice
- Use blue-tinted shadows (rgba(50,50,93,...)) for all elevation
- Use gradient text for emphasis words in headlines (purple → blue)
- Use the section-label pattern: uppercase, tracked, purple, small
- Keep border-radius between 4px and 20px
- Use rgba() for all semi-transparent backgrounds and borders

### Don't
- Don't use pure black (#000000) — always #0a0a0f for warmth
- Don't use weight 700 for display text — 300 is the signature
- Don't use neutral gray shadows — always tint with blue
- Don't use pill shapes on cards or buttons
- Don't use more than 2 accent colors in a single composition
- Don't use emoji unless the brand explicitly uses them