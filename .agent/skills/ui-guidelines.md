# ResearchPulse Brand Guidelines

## Brand Positioning

ResearchPulse is an AI-powered research intelligence platform that continuously monitors high-signal technology sources, identifies emerging trends, and transforms raw information into actionable content opportunities.

### Brand Attributes

* Intelligent
* Analytical
* Fast
* Trustworthy
* Modern
* Technical
* Focused

### Brand Personality

ResearchPulse should feel:

* Like a senior research analyst
* Data-driven rather than opinion-driven
* Professional rather than playful
* Technical without being intimidating
* Efficient and focused

---

# Color System

## Dark Theme

### Primary Background

| Token            | Hex     |
| ---------------- | ------- |
| Background       | #0A070D |
| Surface          | #3D0000 |
| Elevated Surface | #69140E |
| Accent Surface   | #65483E |

### Text Colors

| Token          | Hex                    |
| -------------- | ---------------------- |
| Primary Text   | #FFFFFF                |
| Secondary Text | rgba(255,255,255,0.75) |
| Muted Text     | rgba(255,255,255,0.55) |

### Usage

* #0A070D → Application background
* #3D0000 → Cards, sidebars, panels
* #69140E → Interactive elements and highlighted content
* #65483E → Borders, chips, metadata, subtle accents

---

## Light Theme

### Primary Background

| Token            | Hex     |
| ---------------- | ------- |
| Background       | #FFFBFF |
| Surface          | #EBD8D0 |
| Elevated Surface | #EAC9C1 |
| Accent Surface   | #D3AB9E |

### Text Colors

| Token          | Hex              |
| -------------- | ---------------- |
| Primary Text   | #000000          |
| Secondary Text | rgba(0,0,0,0.75) |
| Muted Text     | rgba(0,0,0,0.55) |

### Usage

* #FFFBFF → Application background
* #EBD8D0 → Cards and containers
* #EAC9C1 → Secondary surfaces
* #D3AB9E → Highlights and accents

---

# Design Tokens

## Dark Mode Tokens

```json
{
  "background": "#0A070D",
  "surface": "#3D0000",
  "surfaceElevated": "#69140E",
  "accent": "#65483E",

  "textPrimary": "#FFFFFF",
  "textSecondary": "rgba(255,255,255,0.75)",
  "textMuted": "rgba(255,255,255,0.55)",

  "border": "#65483E"
}
```

## Light Mode Tokens

```json
{
  "background": "#FFFBFF",
  "surface": "#EBD8D0",
  "surfaceElevated": "#EAC9C1",
  "accent": "#D3AB9E",

  "textPrimary": "#000000",
  "textSecondary": "rgba(0,0,0,0.75)",
  "textMuted": "rgba(0,0,0,0.55)",

  "border": "#D3AB9E"
}
```

---

# Typography

## Primary Typeface

Recommended:

* Inter
* Geist
* IBM Plex Sans

## Heading Scale

| Element | Weight |
| ------- | ------ |
| H1      | 700    |
| H2      | 700    |
| H3      | 600    |
| H4      | 600    |

## Body Scale

| Element     | Weight |
| ----------- | ------ |
| Body Large  | 400    |
| Body Medium | 400    |
| Caption     | 500    |

---

# Product UI Principles

### Research First

Content and insights should always be more visually prominent than navigation.

### Data Over Decoration

Avoid excessive gradients, shadows, and animations.

### Signal vs Noise

Use color only to indicate importance, status, or actions.

### Readability Above All

Long-form research content should maintain excellent contrast and spacing.

---

# Status Colors

## Success

```css
#22C55E
```

## Warning

```css
#F59E0B
```

## Error

```css
#EF4444
```

## Information

```css
#3B82F6
```

---

# Voice & Messaging

### Tagline

"Research Less. Discover More."

### Alternative Taglines

* "AI-Powered Trend Intelligence."
* "From Signals to Insights."
* "Track What Matters."
* "Research at Machine Speed."
* "Discover Trends Before They Trend."

### One-Line Description

ResearchPulse continuously monitors high-signal technology sources and transforms emerging developments into actionable research insights and content opportunities.

---

# Dashboard Experience

The interface should feel like:

* A Bloomberg terminal for developers
* An AI-powered research desk
* A command center for trend discovery

Users should immediately understand:

1. What is happening
2. Why it matters
3. How important it is
4. What action they should take next

Avoid:

- Excessive gradients
- Heavy animations
- Social-media style UI

```
```
