---
version: alpha
name: Not Forgotten
description: Clean, confident, and trustworthy — built for trades and service businesses that want no opportunity lost. Deep navy authority with crisp near-black typography on a bright white canvas.
colors:
  primary: "#0b2c4d"
  secondary: "#0a0a0a"
  tertiary: "#e0a62a"
  neutral: "#ffffff"
  surface: "#f5f5f5"
  muted: "#737373"
  link: "#006aff"
typography:
  h1:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  sm: 8px
  md: 12px
  lg: 16px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
components:
  text-body:
    textColor: "{colors.secondary}"
  text-muted:
    textColor: "{colors.muted}"
  link-inline:
    textColor: "{colors.link}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-primary-hover:
    backgroundColor: "#1f5891"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
---

## Overview

Not Forgotten is a quote follow-up service for trades and small service businesses. The brand projects calm reliability and professional competence — the feeling that nothing slips through the cracks. The visual system uses deep navy as its anchor of trust, near-black for direct, unadorned communication, and gold as a sparing accent that signals value recovery.

The name itself is the brand promise: **no opportunity is forgotten.**

## Colors

- **Primary (`#0b2c4d`):** Deep Navy. The foundation of trust. Used for primary CTAs, navigation accents, and key brand moments. Derived from the live site's button background.
- **Secondary (`#0a0a0a`):** Near-Black. Headlines and body text. Slightly softer than pure `#000` but reads as black to the eye.
- **Tertiary (`#e0a62a`):** Gold. Used sparingly — star ratings, highlights, and moments of celebration. Represents recovered revenue.
- **Neutral (`#ffffff`):** White. The primary page background. Clean, bright, professional.
- **Surface (`#f5f5f5`):** Light Gray. Card backgrounds, section dividers, secondary surfaces.
- **Muted (`#737373`):** Gray. Secondary text, captions, less-emphasised content.
- **Link (`#006aff`):** Blue. Inline links and interactive text. Lighter than the navy to distinguish from buttons.

## Typography

Inter is the sole typeface — a modern, highly readable sans-serif designed for screens. It pairs a neutral, professional voice with excellent legibility at all sizes.

Headings use bold weights with tight line-height for impact. Body text uses regular weight with comfortable 1.6 leading for readability. The single-font approach keeps the brand cohesive and fast-loading.

## Layout & Spacing

The site uses generous whitespace to let content breathe. Section padding defaults to `xl` (80px) on desktop. Cards and grouped elements use `md` (24px) gaps. The overall rhythm is open and unhurried — confident enough to not overcrowd the page.

## Components

- **`button-primary`:** The main CTA. Deep navy background with white text. High contrast for maximum visibility. Used for "Book a Demo" and primary conversion actions.
- **`button-primary-hover`:** Lighter navy (`#1f5891`) to signal interactivity while staying within the trust palette.
- **`button-secondary`:** White background with navy text. Used for secondary actions like "See How It Works."
- **`card`:** Light gray surface with moderate rounding. Used for feature highlights and testimonial blocks.

## Do's and Don'ts

- **Do** use white backgrounds with generous spacing — the brand breathes.
- **Do** lead with the navy for primary actions and trust moments.
- **Do** keep typography clean: Inter only, no decorative fonts.
- **Don't** overuse the gold — it's an accent, not a primary.
- **Don't** add borders to cards; the surface color difference is enough.
- **Don't** use pure black (`#000`); use `{colors.secondary}` (`#0a0a0a`).
