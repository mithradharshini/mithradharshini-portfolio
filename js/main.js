document.addEventListener("DOMContentLoaded", () => {
  initContent();
  initBootLoader();
  initScrollEffects();
  initProtoSemTimeline();
  initEffectsToggle();
});

function initContent() {
  const data = portfolioData;
  
  // Hero
  document.getElementById('hero-loc').textContent = data.meta.location;
  document.getElementById('hero-status').textContent = data.hero.status;
  document.getElementById('hero-mission').textContent = data.hero.mission;
  document.getElementById('hero-name').textContent = data.hero.name;
  document.getElementById('hero-tagline').textContent = data.hero.tagline;

  // About
  document.getElementById('about-summary-text').textContent = data.about.summary;
  const skillsContainer = document.getElementById('about-skills-container');
  for (const [category, skills] of Object.entries(data.about.skills)) {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `
      <div class="mono-text neon-cyan-text mb-2">${category}</div>
      <div class="tag-cloud">
        ${skills.map(s => `<span>${s}</span>`).join('')}
      </div>
    `;
    skillsContainer.appendChild(card);
  }

  // Experience
  const expContainer = document.getElementById('experience-container');
  data.experience.forEach(exp => {
    const el = document.createElement('div');
    el.innerHTML = `
      <h3 class="display-text neon-magenta-text" style="font-size: 1.5rem; margin-bottom: 0.25rem;">${exp.role}</h3>
      <div class="mono-text neon-cyan-text mb-4">${exp.company} // ${exp.duration}</div>
      <ul style="list-style-type: square; padding-left: 1.5rem; color: var(--text-muted);" class="body-text">
        ${exp.bullets.map(b => `<li style="margin-bottom: 0.5rem;">${b}</li>`).join('')}
      </ul>
    `;
    expContainer.appendChild(el);
  });

  // ProtoSem Intro
  document.getElementById('protosem-title').textContent = data.protosem.title;
  document.getElementById('protosem-role').textContent = data.protosem.role;
  document.getElementById('protosem-subtitle').textContent = data.protosem.subtitle;
  document.getElementById('protosem-status').textContent = data.protosem.status;
  document.getElementById('protosem-desc1').textContent = data.protosem.description1;
  document.getElementById('protosem-desc2').textContent = data.protosem.description2;
  
  const tagsContainer = document.getElementById('protosem-tags');
  data.protosem.tags.forEach((t, i) => {
    const span = document.createElement('span');
    span.textContent = t;
    if (i === data.protosem.activeTagIndex) span.classList.add('highlight');
    tagsContainer.appendChild(span);
  });

  // Leadership
  const ldrContainer = document.getElementById('leadership-container');
  data.leadership.forEach(item => {
    ldrContainer.innerHTML += `
      <div class="module-card">
        <h4 class="display-text neon-magenta-text" style="font-size:1.1rem; margin-bottom:0.25rem">${item.role}</h4>
        <div class="mono-text neon-cyan-text" style="margin-bottom:1rem">${item.organization}</div>
        <p class="body-text text-sm muted-text">${item.description}</p>
      </div>
    `;
  });

  // Certifications
  const certContainer = document.getElementById('certifications-container');
  data.certifications.forEach(item => {
    certContainer.innerHTML += `
      <div class="module-card">
        <h4 class="display-text neon-orange-text" style="font-size:1.1rem; margin-bottom:0.25rem">${item.title}</h4>
        <div class="mono-text neon-cyan-text" style="margin-bottom:1rem">${item.issuer}</div>
        <p class="body-text text-sm muted-text">${item.description}</p>
      </div>
    `;
  });

  // Education
  const eduContainer = document.getElementById('education-container');
  data.education.forEach(item => {
    eduContainer.innerHTML += `
      <div class="module-card">
        <h4 class="display-text neon-yellow-text" style="font-size:1.1rem; margin-bottom:0.25rem">${item.degree}</h4>
        <div class="mono-text muted-text" style="margin-bottom:1rem">${item.institution}</div>
        <div class="mono-text neon-cyan-text">${item.period}</div>
        <div class="body-text muted-text">${item.details}</div>
      </div>
    `;
  });

  // Contact
  document.getElementById('contact-text').textContent = data.contactText;
  document.getElementById('contact-loc').textContent = data.meta.location;
  document.getElementById('contact-email').textContent = data.meta.email;
  document.getElementById('contact-email').href = `mailto:${data.meta.email}`;
  document.getElementById('contact-linkedin').textContent = 'LinkedIn Profile';
  document.getElementById('contact-linkedin').href = data.meta.linkedin;
  
  if(data.meta.formspreeEndpoint) {
    document.getElementById('contact-form').action = data.meta.formspreeEndpoint;
    document.getElementById('contact-form').method = "POST";
  } else {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Form endpoint not configured. Redirecting to Mailto.");
      window.location.href = `mailto:${data.meta.email}`;
    });
  }
}

function initBootLoader() {
  const loader = document.getElementById('boot-loader');
  const progressEl = document.getElementById('boot-progress');
  const barEl = document.getElementById('boot-bar');
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.style.display = 'none';
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress > 100) progress = 100;
    progressEl.textContent = progress;
    barEl.style.width = `${progress}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
      }, 300);
    }
  }, 100);
}

function initEffectsToggle() {
  const btn = document.getElementById('toggle-effects');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('no-fx');
    btn.textContent = document.body.classList.contains('no-fx') ? "FX:OFF" : "FX:ON";
  });
}

function initScrollEffects() {
  // Fuel Gauge
  const fuel = document.getElementById('scroll-fuel');
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    fuel.style.width = scrolled + "%";
  });

  // Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

function initProtoSemTimeline() {
  const data = portfolioData.protosem.weeks;
  const container = document.getElementById('timeline-nodes-container');
  let currentPhase = 0;

  data.forEach((item, index) => {
    // Inject phase header if it's new
    if (item.phase !== currentPhase) {
      const banner = document.createElement('div');
      banner.className = 'phase-header-banner mono-text';
      banner.innerHTML = `<span>${item.phaseLabel}</span>`;
      container.appendChild(banner);
      currentPhase = item.phase;
    }

    // Determine layout
    const isLeft = index % 2 === 0;
    
    // Status color
    let statusClass = '';
    if(item.status === 'Completed') statusClass = 'active';
    else if(item.status === 'Upcoming') statusClass = 'upcoming';

    const node = document.createElement('div');
    node.className = `timeline-node-item ${isLeft ? 'left' : 'right'}`;
    node.dataset.phase = item.phase;
    
    node.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <div class="card-header">
          <span class="mono-text muted-text">WEEK ${(index+1).toString().padStart(2, '0')} // PHASE ${item.phase.toString().padStart(2, '0')}</span>
          <span class="hud-tag status-tag ${statusClass}">${item.status}</span>
        </div>
        <div class="card-week-title">${item.title}</div>
      </div>
    `;
    container.appendChild(node);
  });

  // Draw winding SVG
  drawWindingPath();
  window.addEventListener('resize', drawWindingPath);

  // Filters
  const filters = document.querySelectorAll('.filter-btn');
  filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filters.forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
      const phase = e.target.dataset.phase;
      
      document.querySelectorAll('.timeline-node-item').forEach(node => {
        if (phase === 'all' || node.dataset.phase === phase) {
          node.classList.remove('filtered-out');
        } else {
          node.classList.add('filtered-out');
        }
      });
      // Redraw SVG after transition
      setTimeout(drawWindingPath, 300);
    });
  });
}

function drawWindingPath() {
  const svg = document.getElementById('timeline-svg');
  const pathGlow = document.getElementById('timeline-path-glow');
  const pathCore = document.getElementById('timeline-path-core');
  
  const width = svg.clientWidth || 100;
  const height = document.getElementById('timeline-nodes-container').clientHeight;
  svg.setAttribute('viewBox', \`0 0 \${width} \${height}\`);
  svg.style.height = height + 'px';

  // Create a gentle sine wave
  let d = \`M \${width/2} 0\`;
  const segments = 10;
  for (let i = 1; i <= segments; i++) {
    const y = (height / segments) * i;
    const prevY = (height / segments) * (i - 1);
    const midY = (y + prevY) / 2;
    const offset = i % 2 === 0 ? 30 : -30;
    
    // Check if mobile (path is on left)
    if(window.innerWidth < 768) {
       d += \` L \${width/2} \${y}\`; // Straight line on mobile
    } else {
       d += \` Q \${width/2 + offset} \${midY}, \${width/2} \${y}\`;
    }
  }

  pathGlow.setAttribute('d', d);
  pathCore.setAttribute('d', d);
}
