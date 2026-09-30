# Design System: Dark Soft Neubrutalism

This document defines the visual design system, token architecture, and interaction patterns for **Nuvio Subs** (`/configure` web interface).

---

## 1. Design Direction & Core Dials

- **Aesthetic Family**: Dark Soft Neubrutalism (Night-Friendly)
- **Design Intent**: Combines the bold structural identity of Neubrutalism (thick solid black borders, hard offset drop shadows, monospace data chips) with an eye-friendly dark palette and luminous pastel accents.
- **The Three Dials (`design-taste-frontend`)**:
  - `DESIGN_VARIANCE: 7` &mdash; High-contrast asymmetrical stamps, bold borders, and distinct component containment while keeping form inputs ergonomic.
  - `MOTION_INTENSITY: 5` &mdash; Immediate, tactile mechanical click feedback (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`) with fast 100ms transitions.
  - `VISUAL_DENSITY: 5` &mdash; Clear group boundaries with ample breathing room, avoiding cluttered dashboards.

---

## 2. Color Palette & Tokens

### Surfaces & Structure
| Token | HEX | Description / Usage |
|---|---|---|
| `neo-bg` | `#0D0E13` | Canvas background with radial dot grid |
| `neo-grid` | `#26283A` | Subtle 1px dot pattern spaced at 20px intervals |
| `neo-card` | `#161720` | Primary container card background |
| `neo-card-header` | `#12131A` | Header banner for cards & terminal bars |
| `neo-input` | `#0A0B0F` | Form input backgrounds & inactive chips |
| `neo-border` | `#000000` | 2px solid border on cards, inputs, and chips |
| `neo-shadow` | `#050608` | Hard geometric drop-shadow (`4px 4px 0px #050608`) |

### Luminous Accents
| Token | HEX | Description / Usage |
|---|---|---|
| `lavender` | `#B8A9FF` | Primary action button, active chip background, focus glow |
| `lavender-hover`| `#A594FF` | Hover state for primary action |
| `mint` | `#A7F3D0` | Version badge, "Zero Ads" indicator, active toggle, run test |
| `mint-hover` | `#86EFAC` | Hover state for secondary interactive controls |
| `amber` | `#FDE68A` | Warning badge, live querying indicator, connected zero-match state |
| `rose` | `#FDA4AF` | Error states, failed provider test messages |

### Typography Colors
| Token | HEX | Usage |
|---|---|---|
| `text-primary` | `#FFFFFF` / `#EDEDF2` | Headings, card titles, and high-emphasis text |
| `text-secondary`| `#9496A8` | Descriptive helper text, unselected options |
| `text-muted` | `#636577` | Footers, subtle labels, and timestamps |

---

## 3. Typography

- **Headings & Body Display**: `Space Grotesk`
  - Weights: `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold)
  - Characteristics: Geometric grotesque typeface with quirky retro-digital cuts, angled terminals, and tech brutalist attitude, maintaining sharp readability at all sizes.
- **Data, Forms, & Badges**: `JetBrains Mono`
  - Weights: `500` (Medium), `700` (Bold), `800` (ExtraBold)
  - Characteristics: Clean monospaced letterforms that ensure key codes, language ISO codes, and credentials remain legible.

---

## 4. Component Patterns

### A. Neubrutalist Cards
- Container with `border-2 border-black` and `shadow-[4px_4px_0px_#050608]`.
- Rounded corners at `rounded-2xl` (16px) for an approachable, soft feel.
- Dark charcoal fill `#161720` creating a distinct elevation over the `#0D0E13` dot canvas.

### B. Tactile Buttons & Chips
- **Interactive States**:
  - **Resting**: `border-2 border-black shadow-[4px_4px_0px_#050608]`
  - **Hover**: Subtle lift `translate-x-[-1px] translate-y-[-1px] shadow-[6px_6px_0px_#050608]`
  - **Active / Pressed**: Mechanical click `translate-x-[2px] translate-y-[2px] shadow-none`
- **Primary CTA**: Solid Digital Lavender `#B8A9FF` with pure black text and icon.
- **Secondary CTA**: Neutral card dark fill `#161720` with white text and 2px border.

### C. Form Inputs
- Background: Pitch dark `#0A0B0F` with monospace font.
- Border: `2px solid #000000`.
- Focus State: Snappy ring with Lavender glow `focus:border-[#B8A9FF] focus:shadow-[3px_3px_0px_#B8A9FF]`.
- Password Toggle: Custom square stamp button with hard shadow.

### D. Neubrutalist Toggle Switch
- Enclosure: Pill with `2px solid #000000` and dark base `#0A0B0F`.
- Active State: Snaps to Mint `#A7F3D0` with white thumb encased in a solid 2px black border.

### E. Diagnostics Terminal
- Structured as an instrumentation panel with top status header.
- Status Indicator: Hardware LED dot with pulse animation on active queries.
- Provider Rows: Individual rounded dark blocks with status badges (`#133929` Mint background for ready providers).

---

## 5. Brand Identity & Logo Integration

- **Mark**: **Soft N-Flow (Continuous Ribbon Monogram)**.
- **Application**:
  - Encased in a square neubrutalist badge (`w-9 h-9 bg-[#161720] border-2 border-black shadow-neo-sm`) in the top navigation bar.
  - Stroke rendered in clean neutral white `#F4F4F6` with round caps.
  - Pairs directly with the bold `nuvio-subs` wordmark and the green `v1.0.0` pill badge.
