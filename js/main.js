/**
 * MITHRA.OS // CLIENT CONTROLLER & INTERACTION ENGINE
 * ----------------------------------------------------------------------------
 * Powers dynamic DOM rendering from content.js, winding SVG highway math,
 * timeline filtering, expandable cards, skippable boot loader, and HUD telemetry.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  initBootLoader();
  initScrollFuel();
  initActiveSectionSpy();
  initEffectsToggle();
  initProtoSemTimeline();
  initContactForm();
});

/* ==========================================================================
   1. CONTENT RENDERER (FROM SINGLE SOURCE OF TRUTH: content.js)
   ========================================================================== */
function renderContent() {
  const data = portfolioData;

  // Hero Section
  document.getElementById('hero-loc').textContent = data.hero.locationReadout;
  document.getElementById('hero-status').textContent = data.hero.statusReadout;
  document.getElementById('hero-mission').textContent = data.hero.missionReadout;
  document.getElementById('hero-name').textContent = data.hero.displayName;
  document.getElementById('hero-tagline').textContent = data.hero.tagline;

  // Marquee Ticker Strip
  const tickerStrip = document.getElementById('ticker-strip');
  if (tickerStrip && data.ticker) {
    // Duplicate 3 times for seamless infinite scroll
    const items = [...data.ticker, ...data.ticker, ...data.ticker];
    tickerStrip.innerHTML = items.map(item => `
      <span class="ticker-item">
        <span>${item}</span>
        <span class="ticker-bullet">✦</span>
      </span>
    `).join('');
  }

  // Section 01: About
  document.getElementById('about-summary-text').textContent = data.about.summary;
  const skillsContainer = document.getElementById('about-skills-container');
  skillsContainer.innerHTML = '';
  data.about.modules.forEach(module => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
      <div class="module-header mono-text">
        <span class="module-title">${module.category}</span>
        <span class="module-badge">${module.badge}</span>
      </div>
      <div class="tag-cloud">
        ${module.skills.map(skill => `<span class="tag-chip">${skill}</span>`).join('')}
      </div>
    `;
    skillsContainer.appendChild(card);
  });

  // Section 02: Experience (Mission Log)
  const expContainer = document.getElementById('experience-container');
  expContainer.innerHTML = '';
  data.experience.missions.forEach(mission => {
    const entry = document.createElement('div');
    entry.className = 'mission-log-entry';
    entry.innerHTML = `
      <div class="mission-top-line">
        <h3 class="mission-role-title display-text">${mission.role}</h3>
        <span class="hud-tag status-active mono-text">
          <span class="status-led led-green"></span>STATUS: ${mission.status}
        </span>
      </div>
      <div class="mission-meta-strip mono-text">
        <span><i data-lucide="building" class="icon-sm"></i> ${mission.organization}</span>
        <span>•</span>
        <span><i data-lucide="calendar" class="icon-sm"></i> ${mission.duration}</span>
      </div>
      <ul class="mission-bullets-list body-text">
        ${mission.bullets.map(b => `
          <li class="mission-bullet-item">
            <span class="bullet-marker">›</span>
            <span>${b}</span>
          </li>
        `).join('')}
      </ul>
    `;
    expContainer.appendChild(entry);
  });

  // Section 03: ProtoSem Intro
  document.getElementById('protosem-heading').textContent = data.protosem.title;
  document.getElementById('protosem-role').textContent = data.protosem.role;
  document.getElementById('protosem-programme-line').textContent = data.protosem.programmeLine;
  document.getElementById('highway-subtitle').textContent = data.protosem.highwaySubtitle;
  document.getElementById('protosem-desc1').textContent = data.protosem.descCol1;
  document.getElementById('protosem-desc2').textContent = data.protosem.descCol2;

  // ProtoSem Meta Badges
  const metaBox = document.getElementById('protosem-meta-box');
  metaBox.innerHTML = data.protosem.metaBadges.map(b => `
    <div class="meta-row">
      <span class="label">${b.label}:</span>
      <span class="val">${b.value}</span>
    </div>
  `).join('');

  // ProtoSem Discipline Pills
  const disciplinesContainer = document.getElementById('protosem-tags');
  disciplinesContainer.innerHTML = data.protosem.disciplines.map(d => `
    <span class="tag-chip ${d.highlighted ? 'highlight' : ''}">${d.name}</span>
  `).join('');

  // Section 04: Leadership (Crew Badges)
  const leadContainer = document.getElementById('leadership-container');
  leadContainer.innerHTML = '';
  data.leadership.badges.forEach(b => {
    const card = document.createElement('div');
    card.className = 'crew-badge-card';
    card.innerHTML = `
      <div>
        <div class="crew-code-tag mono-text">${b.code} // COMMAND</div>
        <h3 class="crew-role-title display-text">${b.role}</h3>
        <div class="crew-org-name mono-text">${b.organization}</div>
        <p class="crew-desc body-text">${b.description}</p>
      </div>
      <div class="crew-highlight-pill mono-text">${b.highlight}</div>
    `;
    leadContainer.appendChild(card);
  });

  // Section 05: Certifications (Honors Medals)
  const certContainer = document.getElementById('certifications-container');
  certContainer.innerHTML = '';
  data.certifications.medals.forEach(m => {
    const card = document.createElement('div');
    card.className = 'medal-card';
    card.innerHTML = `
      <div class="medal-header mono-text">
        <span class="crew-code-tag">${m.badgeCode}</span>
        <span class="medal-tag">${m.tag}</span>
      </div>
      <h3 class="medal-title display-text">${m.title}</h3>
      <div class="medal-issuer mono-text">${m.issuer} • ${m.duration}</div>
      <p class="body-text text-muted">${m.description}</p>
    `;
    certContainer.appendChild(card);
  });

  // Section 06: Education (Flight Record)
  const eduContainer = document.getElementById('education-container');
  eduContainer.innerHTML = '';
  data.education.records.forEach(r => {
    const card = document.createElement('div');
    card.className = 'flight-record-card';
    card.innerHTML = `
      <div>
        <div class="flight-level-tag mono-text">${r.level}</div>
        <h3 class="flight-degree-title display-text">${r.degree}</h3>
        <div class="flight-institution">${r.institution}</div>
        <div class="mono-text text-sm muted-text mb-3">${r.location} • ${r.period}</div>
      </div>
      <div>
        <div class="flight-score-badge mono-text">
          <span>${r.scoreLabel}:</span>
          <span>${r.scoreValue}</span>
        </div>
        <p class="body-text text-sm muted-text">${r.notes}</p>
      </div>
    `;
    eduContainer.appendChild(card);
  });

  // Section 07: Contact
  document.getElementById('contact-subtext').textContent = data.contact.subtext;
  document.getElementById('contact-location').textContent = data.contact.location;
  
  const emailLink = document.getElementById('contact-email');
  emailLink.textContent = data.contact.email;
  emailLink.href = `mailto:${data.contact.email}`;

  const linkedInLink = document.getElementById('contact-linkedin');
  linkedInLink.textContent = 'linkedin.com/in/mithra-dharshini-r';
  linkedInLink.href = data.contact.linkedin;

  // Re-initialize any dynamic Lucide icons created during render
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   2. BOOT LOADER (SKIPPABLE BIOS INITIALIZATION)
   ========================================================================== */
function initBootLoader() {
  const loader = document.getElementById('boot-loader');
  const progressEl = document.getElementById('boot-progress');
  const barEl = document.getElementById('boot-bar');
  const skipBtn = document.getElementById('skip-boot-btn');
  
  // Instant bypass if user has reduced-motion enabled
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (loader) loader.style.display = 'none';
    return;
  }

  let progress = 0;
  let hasSkipped = false;

  const dismissLoader = () => {
    if (hasSkipped) return;
    hasSkipped = true;
    clearInterval(bootInterval);
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 400);
    }
  };

  const bootInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 8;
    if (progress >= 100) {
      progress = 100;
      progressEl.textContent = 100;
      barEl.style.width = '100%';
      clearInterval(bootInterval);
      setTimeout(dismissLoader, 300);
    } else {
      progressEl.textContent = progress;
      barEl.style.width = `${progress}%`;
    }
  }, 75);

  // Keyboard shortcut (Escape or Space) and click to skip
  if (skipBtn) skipBtn.addEventListener('click', dismissLoader);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
      dismissLoader();
    }
  }, { once: true });
}

/* ==========================================================================
   3. HUD SCROLL PROGRESS (FUEL GAUGE) & INTERSECTION OBSERVER
   ========================================================================== */
function initScrollFuel() {
  const fuel = document.getElementById('scroll-fuel');
  if (!fuel) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    fuel.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
  }, { passive: true });
}

function initActiveSectionSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Immediately make all sections visible so content is NEVER hidden behind opacity:0
  sections.forEach(sec => sec.classList.add('visible'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.dataset.section === activeId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.01 });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   4. FX TOGGLE (REDUCED VISUAL EFFECTS)
   ========================================================================== */
function initEffectsToggle() {
  const btn = document.getElementById('toggle-effects');
  const textEl = document.getElementById('fx-text');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('no-fx');
    const isOff = document.body.classList.contains('no-fx');
    if (textEl) textEl.textContent = isOff ? "FX: OFF" : "FX: ON";
    btn.setAttribute('aria-pressed', isOff ? "true" : "false");
  });
}

/* ==========================================================================
   5. PRICE PROTOSEM 20-WEEK TIMELINE & WINDING SVG HIGHWAY
   ========================================================================== */
function initProtoSemTimeline() {
  const data = portfolioData.protosem;
  const container = document.getElementById('timeline-nodes-container');
  if (!container) return;

  container.innerHTML = '';

  const milestones = data.milestones || [];
  const weeks = data.weeks || [];

  // Track which milestones have been rendered
  const renderedMilestones = new Set();

  weeks.forEach((item, index) => {
    // Check if any milestone should appear before this week
    milestones.forEach((m, mIdx) => {
      if (m.beforeWeek === item.week && !renderedMilestones.has(m.id)) {
        renderedMilestones.add(m.id);
        const banner = document.createElement('div');
        banner.className = 'phase-milestone-block mono-text';
        banner.dataset.phase = m.phase;
        banner.id = `milestone-${m.id}`;

        // Milestone alternating sides: even index label on left, odd index label on right
        const isLabelLeft = mIdx % 2 === 0;

        banner.innerHTML = `
          <div class="milestone-grid ${isLabelLeft ? 'label-left' : 'label-right'}">
            <div class="milestone-label-card">
              <span class="phase-mini-tag">${m.phaseBadge}</span>
              <h4 class="milestone-heading">${m.label}</h4>
            </div>
            <div class="milestone-node-pin" aria-hidden="true">
              <span class="milestone-pin-core">✦</span>
            </div>
            <div class="milestone-descriptor-card">
              <span class="descriptor-eyebrow">MILESTONE TRACK //</span>
              <p class="descriptor-text">${m.descriptor}</p>
            </div>
          </div>
        `;
        container.appendChild(banner);
      }
    });

    // Alternating Left / Right layout: Week 01 Left, Week 02 Right, etc.
    const isLeft = index % 2 === 0;

    // Status tag styling
    let statusClass = 'upcoming';
    if (item.status === 'Completed') statusClass = 'completed';
    else if (item.status === 'In progress') statusClass = 'in-progress';

    const nodeRow = document.createElement('div');
    nodeRow.className = `timeline-node-row ${isLeft ? 'left' : 'right'}`;
    nodeRow.dataset.phase = item.phase;
    nodeRow.dataset.week = item.week;
    nodeRow.id = `week-${item.week}`;

    const isFirstCard = index === 0;
    const nextWeekNum = item.week < 20 ? item.week + 1 : null;

    nodeRow.innerHTML = `
      <!-- Connector line between node and card -->
      <div class="node-connector-line" aria-hidden="true"></div>

      <!-- Center Circular Node with Week Number -->
      <div class="timeline-marker-node mono-text" aria-hidden="true">${item.week}</div>

      <!-- Interactive Week Card -->
      <div class="timeline-card ${isFirstCard ? 'active-card expanded' : ''}" 
           tabindex="0" 
           role="button" 
           aria-expanded="${isFirstCard ? 'true' : 'false'}"
           aria-label="Week ${item.week}: ${item.title}">
        
        <div class="card-top-row">
          <span class="week-code mono-text">WEEK ${item.week.toString().padStart(2, '0')} · ${item.phaseLabel}</span>
          <span class="status-badge ${statusClass} mono-text">${item.status}</span>
        </div>

        <h4 class="card-week-title">${item.title}</h4>

        <div class="card-details-panel">
          <p class="body-text">${item.summary || 'Ongoing exploration of intelligent commerce systems.'}</p>
        </div>

        <div class="card-bottom-actions mono-text">
          ${nextWeekNum ? `
            <a href="#week-${nextWeekNum}" class="next-week-link" data-target-week="${nextWeekNum}">
              <span>NEXT WEEK</span>
              <span class="next-arrow">›</span>
            </a>
          ` : `
            <span class="final-milestone-tag">FINAL MILESTONE ✦</span>
          `}
          <span class="toggle-indicator">${isFirstCard ? 'COLLAPSE' : 'EXPAND'}</span>
        </div>
      </div>
    `;

    // Click / Enter interaction to toggle card expansion
    const cardEl = nodeRow.querySelector('.timeline-card');
    const toggleExpand = (expandState) => {
      const isExpanded = typeof expandState === 'boolean' ? cardEl.classList.toggle('expanded', expandState) : cardEl.classList.toggle('expanded');
      cardEl.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      const toggleIndicator = cardEl.querySelector('.toggle-indicator');
      if (toggleIndicator) {
        toggleIndicator.textContent = isExpanded ? 'COLLAPSE' : 'EXPAND';
      }
      setTimeout(drawWindingHighway, 80);
    };

    cardEl.addEventListener('click', (e) => {
      // If user clicked the "NEXT WEEK ›" link, navigate to next week card
      if (e.target.closest('.next-week-link')) {
        e.preventDefault();
        e.stopPropagation();
        if (nextWeekNum) {
          const nextRow = document.getElementById(`week-${nextWeekNum}`);
          if (nextRow) {
            const nextCard = nextRow.querySelector('.timeline-card');
            if (nextCard) {
              nextCard.classList.add('expanded');
              nextCard.setAttribute('aria-expanded', 'true');
              const nextIndicator = nextCard.querySelector('.toggle-indicator');
              if (nextIndicator) nextIndicator.textContent = 'COLLAPSE';
              nextRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
              nextCard.focus();
              setTimeout(drawWindingHighway, 100);
            }
          }
        }
        return;
      }
      toggleExpand();
    });

    cardEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleExpand();
      }
    });

    container.appendChild(nodeRow);
  });

  // Calculate and draw SVG Winding Path
  drawWindingHighway();
  window.addEventListener('resize', debounce(drawWindingHighway, 120));

  // Initialize Filter Buttons: ALL (20), Phase 01, Phase 02, Phase 03, Phase 04
  const filterBtns = document.querySelectorAll('#timeline-filters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const selectedPhase = btn.dataset.phase;

      // Filter timeline nodes
      document.querySelectorAll('.timeline-node-row').forEach(node => {
        if (selectedPhase === 'all' || node.dataset.phase === selectedPhase) {
          node.classList.remove('filtered-out');
        } else {
          node.classList.add('filtered-out');
        }
      });

      // Filter milestone banners
      document.querySelectorAll('.phase-milestone-block').forEach(banner => {
        if (selectedPhase === 'all' || banner.dataset.phase === selectedPhase) {
          banner.classList.remove('filtered-out');
          banner.style.display = 'block';
        } else {
          banner.classList.add('filtered-out');
          banner.style.display = 'none';
        }
      });

      // Redraw SVG path to adjust to filtered content while remaining continuous
      setTimeout(drawWindingHighway, 150);
    });
  });
}

/**
 * Generates dynamic SVG sine-wave highway centered across desktop nodes
 * and straight on mobile.
 */
function drawWindingHighway() {
  const svg = document.getElementById('timeline-svg');
  const pathGlow = document.getElementById('timeline-path-glow');
  const pathCore = document.getElementById('timeline-path-core');
  const container = document.getElementById('timeline-nodes-container');
  if (!svg || !container || !pathGlow || !pathCore) return;

  const totalHeight = container.offsetHeight || 600;
  const isMobile = window.innerWidth < 768;
  const svgWidth = isMobile ? 60 : 160;

  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${totalHeight}`);
  svg.style.height = `${totalHeight}px`;

  const centerX = svgWidth / 2;

  if (isMobile) {
    // Pinned straight line on mobile through all nodes
    const pathD = `M ${centerX} 0 L ${centerX} ${totalHeight}`;
    pathGlow.setAttribute('d', pathD);
    pathCore.setAttribute('d', pathD);
    return;
  }

  // Smooth winding wave along the center line
  const visibleNodes = Array.from(container.querySelectorAll('.timeline-node-row:not(.filtered-out)'));
  if (visibleNodes.length === 0) {
    const pathD = `M ${centerX} 0 L ${centerX} ${totalHeight}`;
    pathGlow.setAttribute('d', pathD);
    pathCore.setAttribute('d', pathD);
    return;
  }

  // Generate smooth sine curve passing through each node
  let d = `M ${centerX} 0`;
  const containerRect = container.getBoundingClientRect();

  const nodePoints = visibleNodes.map(node => {
    const marker = node.querySelector('.timeline-marker-node');
    if (!marker) return null;
    const mRect = marker.getBoundingClientRect();
    const y = (mRect.top + mRect.height / 2) - containerRect.top;
    return (isNaN(y) || y <= 0) ? null : y;
  }).filter(y => y !== null);

  if (nodePoints.length > 1) {
    // Connect to first node
    d += ` L ${centerX} ${Math.max(0, nodePoints[0])}`;

    for (let i = 0; i < nodePoints.length - 1; i++) {
      const yCurrent = nodePoints[i];
      const yNext = nodePoints[i + 1];
      const midY = (yCurrent + yNext) / 2;
      const offset = i % 2 === 0 ? 26 : -26;
      d += ` Q ${centerX + offset} ${midY}, ${centerX} ${yNext}`;
    }

    // Connect to bottom
    d += ` L ${centerX} ${totalHeight}`;
  } else {
    // Fallback wave
    const segments = 20;
    const segmentHeight = totalHeight / segments;
    for (let i = 1; i <= segments; i++) {
      const y = segmentHeight * i;
      const prevY = segmentHeight * (i - 1);
      const midY = (y + prevY) / 2;
      const offset = i % 2 === 0 ? 26 : -26;
      d += ` Q ${centerX + offset} ${midY}, ${centerX} ${y}`;
    }
  }

  pathGlow.setAttribute('d', d);
  pathCore.setAttribute('d', d);
}

/* ==========================================================================
   6. CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const endpoint = portfolioData.meta.formspreeEndpoint;
  if (endpoint && endpoint.trim() !== "") {
    form.action = endpoint;
    form.method = "POST";
  } else {
    // Client-side fallback to formatted mailto
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert("TRANSMISSION ERROR: Please complete all input fields.");
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Cognitive ID / Name: ${name}\nReturn Frequency / Email: ${email}\n\nTransmission Payload:\n${message}`
      );

      window.location.href = `mailto:${portfolioData.meta.email}?subject=${subject}&body=${body}`;
    });
  }
}

/* ==========================================================================
   7. UTILITY: DEBOUNCE
   ========================================================================== */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
