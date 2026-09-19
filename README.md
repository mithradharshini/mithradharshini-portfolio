# MITHRA DHARSHINI R // PORTFOLIO (RETRO FUTURISM)

Welcome to the personal portfolio website of **Mithra Dharshini R** (BBA Candidate & Innovation Trainee at PRICE ProtoSem), designed and engineered in a distinct **Retro Futurism (70s-80s Vintage Mission Control & Synthwave)** visual style.

Live Deployment: [https://mithradharshini.github.io/mithradharshini-portfolio/](https://mithradharshini.github.io/mithradharshini-portfolio/)

---

## 🚀 Design Aesthetic & Features

- **Retro Futurism Palette**:
  - Deep space indigo backgrounds (`#12062B` to `#1C0B3F`) with subtle analog noise
  - Electric Cyan (`#00F0FF`), Neon Magenta (`#FF2E97`), Sunset Orange (`#FF8A3D`), Warm Yellow (`#FFD166`), and Cream text (`#F4ECFF`)
  - Specular metallic chrome gradients on primary display titles
- **Vintage Sci-Fi Hero**:
  - Horizontally sliced sunset sun with CSS gradient
  - 3D perspective neon cyan grid floor traveling toward the horizon
  - Starfield backdrop and radar reticle
- **Mission Control Panels**:
  - Chunky rounded enclosures (`border-radius: 20px`) with metallic corner screws, glowing neon borders, and pulsating status LEDs
- **Single Source of Truth**:
  - All text, credentials, experiences, and all 20 weeks of ProtoSem live in [`js/content.js`](js/content.js) for effortless editing without touching HTML or CSS
- **Flagship PRICE ProtoSem Highway**:
  - Dynamic winding SVG highway trail centered between alternating Left/Right week cards
  - Numbered circular nodes (1–20)
  - 5 Phase filters: `ALL (20)`, `Phase 01 (5)`, `Phase 02 (5)`, `Phase 03 (5)`, `Phase 04 (5)`
  - 5 Phase milestone header blocks with paired opposite descriptors
  - Interactive expand/collapse on cards with full keyboard navigation (`Tab`, `Enter`, `Space`)
  - Clear neutral `[TODO: ...]` placeholders for pending deliverables
- **Interactive HUD & Accessibility**:
  - Fixed HUD navigation bar with active section indicator and fuel-gauge scroll progress bar
  - Skippable BIOS boot loader (`INITIALIZING MITHRA.OS ... 100%`) with `[ESC]` / click skip
  - "FX: ON / FX: OFF" toggle button to easily disable scanlines and animations
  - WCAG AA high contrast text and full `prefers-reduced-motion` compliance
- **Zero Build Step**:
  - Plain HTML5, CSS3, and vanilla JS with relative asset paths for instant deployment on GitHub Pages

---

## 🛠️ How to Edit Content

To update any text on the website, simply open:
👉 **[`js/content.js`](js/content.js)**

### 1. Updating Personal Information & Links
In `portfolioData.meta` and `portfolioData.hero`:
```javascript
meta: {
  email: "mithradharshini968.7@gmail.com",
  linkedin: "https://www.linkedin.com/in/mithra-dharshini-r-208159378",
  location: "COIMBATORE, TAMIL NADU, IN",
  formspreeEndpoint: "" // Paste Formspree or Web3Forms URL here
}
```

### 2. Updating ProtoSem Weeks
In `portfolioData.protosem.weeks`, update any week's title, summary, or status:
```javascript
{
  week: 8,
  phase: 2,
  phaseLabel: "PHASE 02",
  title: "Week 08: Smart Shelf Sensor Calibration", // Replace placeholder
  summary: "Testing optical sensor integration with live shelf inventory models.",
  status: "Completed" // "Completed" | "In progress" | "Upcoming"
}
```

### 3. Adding or Updating Experience & Skills
Update `portfolioData.about.modules`, `portfolioData.experience.missions`, or `portfolioData.leadership.badges`.

---

## 🌐 Deploying to GitHub Pages

Because there are no frameworks or build steps, deployment is immediate:

1. **Push the repository** to GitHub under your account:
   ```bash
   git init
   git add .
   git commit -m "Launch retro futurism portfolio website"
   git branch -M main
   git remote add origin https://github.com/mithradharshini/mithradharshini-portfolio.git
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
3. Your site will be live at:
   `https://mithradharshini.github.io/mithradharshini-portfolio/`

---

## 📂 File Architecture

```
mithradharshini-portfolio/
├── index.html              # Main semantic HTML structure & HUD
├── README.md               # Documentation & setup guide
├── css/
│   └── style.css           # Complete Retro Futurism CSS system
├── js/
│   ├── content.js          # Single source of truth (all editable content)
│   └── main.js             # SVG highway math, DOM renderer, and interactions
└── assets/
    ├── favicon.svg         # Retro neon rocket icon
    └── resume.html         # ATS-optimized printable resume
```
