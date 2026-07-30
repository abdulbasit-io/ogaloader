# Ogaloader Master Design System

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Ogaloader — Digital Freight & Commodity Marketplace  
**Category:** E-Commerce + Logistics B2B Exchange  
**Brand Identity:** Grounded, Heavy-Duty, High-Trust, Telemetry-Driven  

---

## 1. Global Brand & Color System

The color tokens are extracted directly from the official Ogaloader logo mark.

### Brand Palette

| Role | Hex Code | RGB | CSS Variable | Visual Application |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Brand Blue** | `#0038A8` | `rgb(0, 56, 168)` | `--color-primary` | Navigation bar, headers, primary brand framing, outer "O" ring |
| **Primary Blue Hover** | `#002D88` | `rgb(0, 45, 136)` | `--color-primary-hover` | Active states for primary elements |
| **Freight Orange** | `#FF5500` | `rgb(255, 85, 0)` | `--color-accent` | Primary Action CTAs, truck booking indicators, package lid accents |
| **Freight Orange Hover**| `#E04B00` | `rgb(224, 75, 0)` | `--color-accent-hover` | Active states for CTA buttons |
| **Signal Red Accent** | `#E52B1E` | `rgb(229, 43, 30)` | `--color-signal` | Speed dividers, live telemetry alerts, critical warnings |
| **Escrow Green** | `#16A34A` | `rgb(22, 163, 74)` | `--color-escrow` | Fund escrow status, verified seller badge, positive delivery sign-off |
| **Ink Black (Text)** | `#0B0E14` | `rgb(11, 14, 20)` | `--color-text` | Body text, heavy logotype font, primary headings |
| **Muted Slate Text** | `#475569` | `rgb(71, 85, 105)` | `--color-text-muted` | Subtitles, helper text, table captions |
| **Surface Background** | `#F8FAFC` | `rgb(248, 250, 252)` | `--color-bg-surface` | Page background, container light cards |
| **Card White** | `#FFFFFF` | `rgb(255, 255, 255)` | `--color-bg-card` | Elevating content cards, modals, table rows |
| **Border Gray** | `#E2E8F0` | `rgb(226, 232, 240)` | `--color-border` | Subtle structural dividing lines |

---

## 2. Typography System

* **Primary Display / Headings**: `Plus Jakarta Sans`, sans-serif (Weights: 600, 700, 800) — Modern, authoritative, high legibility on mobile & desktop screens.
* **Body & Data Grid**: `Inter`, sans-serif (Weights: 400, 500, 600) — Precise, optimal density for tracking tables, price lists, and specs.
* **Monospace / Telemetry**: `JetBrains Mono` or `ui-monospace` (Weight: 500) — Used for Waybill IDs, Waybill QR codes, NIN/CAC Verification IDs, GPS Coordinates, and Escrow Hash Tokens.

### Font Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
```

---

## 3. Component Design Tokens

### Buttons & CTAs
```css
/* Primary Action Button (Freight Orange) */
.btn-primary {
  background-color: var(--color-accent);
  color: #FFFFFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 200ms ease, transform 150ms ease, box-shadow 200ms ease;
  box-shadow: 0 4px 14px rgba(255, 85, 0, 0.25);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255, 85, 0, 0.35);
}

/* Secondary Button (Cobalt Blue Outline) */
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background-color: rgba(0, 56, 168, 0.06);
  border-color: var(--color-primary-hover);
}
```

### Verified Trust & Status Pills
```css
/* Escrow & Verification Status Pill */
.status-pill-escrow {
  background-color: rgba(22, 163, 74, 0.1);
  color: var(--color-escrow);
  border: 1px solid rgba(22, 163, 74, 0.25);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
```

---

## 4. Content & Copywriting Governance Rules

### Strict Rule 1: No Generic Buzzwords or Empty Badges
* **Forbidden Examples**: `"Now Building for Africa"`, `"World-Class App"`, `"Revolutionizing Logistics"`, `"Best Platform Ever"`.
* **Required Alternative**: Every badge, headline, and subtext MUST state a concrete, verifiable operational capability or metric.
  * ✅ Correct: `"Direct Commodity Procurement & Verified Freight Dispatch"`
  * ✅ Correct: `"Escrow Protected · Live GPS Tracking · Electronic Waybills"`

### Strict Rule 2: Verifiable & Evidence-Backed Claims Only
* **Rule**: Do not publish statements that cannot be proven by software logic or operational reality.
* **Guidelines**:
  1. State *how* escrow works (e.g., *"Funds held in escrow until electronic proof of delivery (POD) is signed by buyer"*).
  2. State *how* drivers are verified (e.g., *"Mandatory NIN/BVN biometric lookup and roadworthiness check before onboarding"*).
  3. State *how* commodities are matched (e.g., *"Truck selection filtered by tonnage capacity, axle load rating, and proximity to supplier yard"*).

---

## 5. Scalable Frontend System Architecture

As Ogaloader expands from a landing page into a full interactive product suite, the frontend will be structured around **5 Core Modular Workflows**:

1. **Marketplace Catalog & Search**: Bulk procurement for construction materials (cement, granite, sand) and agricultural produce with instant weight-based shipping quotes.
2. **Freight Matcher & Truck Configurator**: Interactive vehicle selector (Flatbed, Tipper, Tanker, Container) based on load tonnage and pickup corridor.
3. **Escrow Checkout & Payment Gateway Simulation**: Multi-step checkout detailing commodity cost, freight rate, GIT insurance, and escrow hold status.
4. **Live Telemetry & Tracking Dashboard**: Real-time map route, speed, waypoint logs, Electronic Waybill generation, and POD sign-off.
5. **Portals (Seller Yard & Transporter Workspace)**: Supplier inventory manager and truck driver job dispatch board.

---

## 6. Pre-Delivery Checklist

Before delivering any UI component or page template:

- [ ] **No Emoji Icons**: All UI icons use Heroicons or Lucide SVG elements.
- [ ] **Cursor Pointer**: Explicitly set `cursor-pointer` on all interactive cards, pills, buttons, and table rows.
- [ ] **Brand Consistency**: Colors match exact hex tokens (`#0038A8`, `#FF5500`, `#E52B1E`, `#0B0E14`).
- [ ] **Accessibility (WCAG 2.1 AA)**: Minimum contrast ratio 4.5:1 for body text and 3:1 for large display elements.
- [ ] **Mobile Touch Targets**: Minimum 44x44px clickable area on all controls.
- [ ] **Factual Copy Verification**: Zero buzzword placeholders; all claims backed by operational evidence.
