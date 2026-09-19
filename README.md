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

## 📝 Editing ProtoSem Weeks (Owner-Only CMS)

The weekly cards in the **PRICE ProtoSem** section ("20-Week Innovation Highway") are editable exclusively by the portfolio owner via a hidden, zero-backend retro-futurism CMS.

### 🔑 Step 1: Create a Fine-Grained GitHub Token

1. Go to your GitHub account: **Settings** > **Developer Settings** > **Personal access tokens** > **Fine-grained tokens**.
2. Click **Generate new token**.
3. Fill in:
   - **Token name**: `ProtoSem Portfolio CMS`
   - **Expiration**: Select 30, 60, or 90 days.
   - **Repository access**: Select **Only select repositories** and pick `mithradharshini/mithradharshini-portfolio`.
   - **Permissions**: Under **Repository permissions**, find **Contents** and set it to **Read and write**.
4. Click **Generate token** and copy your token (`github_pat_...`).

> 🔒 **Security Notice**: Your token is stored **STRICTLY in your personal browser's `localStorage`**. It is never hardcoded, never committed to Git, and never sent to any third-party server. All network calls go directly to `api.github.com`.

---

### 🖥️ Step 2: Open Admin Mode

1. Open your portfolio in your browser and append `#admin` to the URL:  
   👉 **`https://mithradharshini.github.io/mithradharshini-portfolio/#admin`**  
   *(Alternative triggers: press `Ctrl + Shift + P` anywhere on the site, or click the subtle `•` bullet in the footer)*
2. Paste your GitHub token into the cyber authorization prompt and click **AUTHORIZE SESSION ✦**.
3. Once verified against GitHub, the **ADMIN MODE** top bar will appear and an **`[✎ EDIT]`** button will become visible on every week card.

---

### ✍️ Step 3: Edit Journal Entries & Upload Photos

1. Click **`[✎ EDIT]`** on any week card.
2. In the editor drawer:
   - **Title**: Update the weekly deliverable title.
   - **Status**: Toggle between `Completed`, `In progress`, or `Upcoming`.
   - **Timeframe / Date Range**: Enter an optional date range (e.g. `12 Jan - 18 Jan`).
   - **Card Summary**: Brief 1-2 sentence overview for the card collapsed view.
   - **Weekly Reflection (Details)**: Write your comprehensive field notes. Supports safe formatting:
     - Paragraphs (double newline)
     - Line breaks (single newline)
     - Bullet points (`- Item`)
     - Bold text (`**bold text**`)
     - Italic text (`*italic text*`)
     - Section headings (`### Heading`)
     - Click the **`PREVIEW`** tab to see real-time formatted rendering.
   - **Field Photos**:
     - Drag & drop or browse photos into the upload zone.
     - **Automatic Client-Side Compression**: Images are automatically resized to max 1600px, converted to WebP at ~80% quality, and have metadata stripped right in your browser before upload (files > 8MB are safely guarded).
     - Add a **Caption** (shown under the thumbnail and in the Lightbox) and **Alt text** (for accessibility).
     - Use `[▲]` / `[▼]` to reorder images, or `[🗑]` to delete them.
3. **Autosave Protection**: An in-progress draft is continuously autosaved to your browser's `localStorage`, protecting your write-up if your tab closes unexpectedly.

---

### 🚀 Step 4: Publish to GitHub Pages

1. Click **`✦ PUBLISH TO GITHUB PAGES`**.
2. The CMS directly performs:
   - Uploads new compressed photos into `assets/weeks/week-XX/`.
   - Updates `data/weeks.json` with your reflection, timeframe, and image metadata in an atomic commit on the `main` branch.
   - Immediately re-renders your local view so you can review the result.
3. **Propagation Time**: GitHub Pages automatically rebuilds and deploys your updates live across the globe in approximately **1 to 2 minutes**.

---

### 🛟 Fallback Method: Direct GitHub Web Editing

If you ever wish to update weeks without using the in-browser Admin CMS:

1. **Edit Text & Metadata**:
   - Navigate to [`data/weeks.json`](data/weeks.json) on GitHub.
   - Click the **✎ Edit this file** button.
   - Update the `details`, `dateRange`, `summary`, or `status` properties for the desired week.
   - Commit directly to `main`.
2. **Add Photos Manually**:
   - Navigate to `assets/weeks/` on GitHub (create folder `week-XX` if needed).
   - Click **Add file** > **Upload files** and upload your images.
   - Reference the path in `data/weeks.json` inside the week's `images` array:
     ```json
     "images": [
       {
         "src": "assets/weeks/week-01/sensor-board.webp",
         "alt": "ProtoSem sensor board prototype",
         "caption": "Hardware checkout testbed"
       }
     ]
     ```

---

### ✅ Public View & Regression Checklist

- **Public Visitors**: Normal visitors see a clean, read-only experience with zero admin buttons, zero token requests, and zero admin hints.
- **Empty Weeks**: Any week with no `details` and no `images` renders identically to the original site.
- **Populated Weeks**: When expanded, displays the timeframe badge, summary, safe markdown write-up, and a responsive thumbnail grid.
- **Accessible Lightbox**: Clicking any thumbnail opens a keyboard-navigable Lightbox (`Esc` closes, `ArrowLeft` / `ArrowRight` navigates, focus trapped, returns focus to thumbnail upon close).

---

## 📂 File Architecture

```
mithradharshini-portfolio/
├── index.html              # Semantic HTML structure & HUD telemetry
├── README.md               # Documentation, setup & ProtoSem editing guide
├── css/
│   └── style.css           # Retro Futurism styling, lightbox, and CMS UI
├── data/
│   └── weeks.json          # Single source of truth for 20 ProtoSem weeks
├── js/
│   ├── content.js          # Static portfolio data & fallback dataset
│   ├── main.js             # SVG highway math, DOM renderer, lightbox & admin loader
│   └── admin.js            # Owner-only CMS engine (GitHub REST API client)
└── assets/
    ├── favicon.svg         # Retro neon rocket icon
    ├── resume.html         # ATS-optimized printable resume
    └── weeks/              # Weekly field photo repository (week-01/, week-02/, ...)
```
