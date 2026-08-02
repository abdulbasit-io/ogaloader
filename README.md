# Ogaloader — Digital Freight & Bulk Commodity Marketplace

**Ogaloader** is an enterprise-grade digital freight and bulk commodity marketplace built for direct supplier procurement, algorithmic axle-load truck matching, escrow settlement, and live GPS transit telemetry.

---

## 🚀 Tech Stack

* **Core**: React 19 SPA
* **Build Tooling**: Vite 8
* **Styling**: Tailwind CSS v4 + Custom HSL Design Tokens
* **Typography**: Plus Jakarta Sans & Inter
* **Icons**: `lucide-react` & Custom Sharp Brand SVGs
* **Deployment**: Vercel SPA (`dist` build output)

---

## 🎨 Design System & Brand Palette

The interface follows the official **Ogaloader Design System Specification** defined in [`design-system/ogaloader/MASTER.md`](file:///home/abdulbasit/ogaloader/design-system/ogaloader/MASTER.md).

* **Brand Royal Blue**: `#0038A8` (Primary action anchors & interactive states)
* **Brand Vibrant Orange**: `#FF5500` (High-priority CTAs & focal highlights)
* **Accent Crimson Red**: `#E52B1E` (Warning & risk state indicators)
* **Deep Ink Surface**: `#0B0E14` (High-rigor dark sections & hero background)
* **Crisp Light Surface**: `#F8FAFC` (Rhythmic light background sections for maximum readability)

---

## 📁 Repository Structure

```
ogaloader/
├── design-system/
│   └── ogaloader/
│       ├── MASTER.md                 # Design System & Token Specification
│       └── COPY_AND_PRODUCT_GUIDE.md # CPO & Product Copy Governance Guide
├── public/
│   └── assets/                       # Static public assets & brand logo
├── src/
│   ├── components/
│   │   ├── Logo.jsx                  # Bounded brand logo with SVG fallback
│   │   ├── Navbar.jsx                # Sticky glassmorphism header & drawer
│   │   ├── Hero.jsx                  # Hero section & Live Telemetry widget
│   │   ├── TrustBar.jsx              # Light surface verification bar
│   │   ├── ProblemSolution.jsx       # Dark comparison matrix
│   │   ├── HowItWorks.jsx            # Light surface 4-step workflow tabs
│   │   ├── MarketplacePreview.jsx    # Freight & Tonnage Escrow Calculator
│   │   ├── Features.jsx              # High-rigor capability grid
│   │   ├── UserPersonas.jsx          # Buyer, Supplier & Transporter solutions
│   │   ├── WaitlistCTA.jsx           # Priority registration form
│   │   └── Footer.jsx                # Footer & official social media links
│   ├── App.jsx                       # Main application layout assembly
│   ├── main.jsx                      # React 19 root entrypoint
│   └── index.css                     # Tailwind v4 import & custom tokens
├── index.html                        # Application HTML template & fonts
├── vite.config.js                    # Vite configuration with Tailwind CSS v4
├── vercel.json                       # Vercel deployment routing config
├── package.json                      # Dependencies & scripts
└── README.md
```

---

## 🛠️ Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/abdulbasit-io/ogaloader.git
cd ogaloader

# Install dependencies
npm install
```

### 2. Local Development Server

```bash
npm run dev
# Launches dev server at http://localhost:5173
```

### 3. Production Build & Preview

```bash
# Build production bundle to dist/
npm run build

# Preview production build locally
npm run preview
# Preview server runs at http://localhost:4173
```

---

## 🔗 Official Social Media Channels

* 🔴 **YouTube**: [https://www.youtube.com/@Ogaloader](https://www.youtube.com/@Ogaloader)
* 📸 **Instagram**: [https://www.instagram.com/ogaloader](https://www.instagram.com/ogaloader)
* 🔷 **Facebook**: [https://web.facebook.com/ogaloader](https://web.facebook.com/ogaloader)
* 🎵 **TikTok**: [https://www.tiktok.com/@ogaloader](https://www.tiktok.com/@ogaloader)

---

## 📦 Deployment (Vercel)

Configured for automatic deployment on **Vercel** via [`vercel.json`](file:///home/abdulbasit/ogaloader/vercel.json):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## ⚖️ Governance & Copywriting Policy

Every headline, card, badge, and metric across the application adheres strictly to verifiable operational capabilities (e.g. *T+1 Escrow Settlement*, *NIN/BVN Vetted Drivers*, *Live GPS Telemetry*). Unsubstantiated hype statements are strictly prohibited under the product copy guide.
