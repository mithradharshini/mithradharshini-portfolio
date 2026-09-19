/**
 * MITHRA.OS // PROTOSEM ADMIN CMS ENGINE
 * ----------------------------------------------------------------------------
 * Powers owner-only editing for the 20-Week Innovation Highway:
 * - Hidden admin activation via #admin or ?admin=1
 * - Secure GitHub PAT authentication stored ONLY in browser's localStorage
 * - Verified against GitHub repository permissions (permissions.push === true)
 * - In-browser client-side image compression & optimization (max 1600px, WebP 80%)
 * - Live markdown preview with safe HTML sanitization
 * - Draft autosaving to localStorage
 * - Direct publishing via GitHub Contents API to assets/weeks/ and data/weeks.json
 * - Zero third-party dependencies, 100% retro-futurism styled.
 */

(function () {
  'use strict';

  // Repository Configuration
  const REPO_OWNER = 'mithradharshini';
  const REPO_NAME = 'mithradharshini-portfolio';
  const REPO_BRANCH = 'main';
  const STORAGE_TOKEN_KEY = 'protosem_admin_token';
  const DRAFT_KEY_PREFIX = 'protosem_draft_week_';

  let isInitialized = false;
  let activeEditorWeek = null;
  let activeEditorDraft = null;
  let currentWeeksData = [];
  let pendingDeletedImages = [];

  /**
   * Helper: Escape HTML string
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Helper: Zero-pad week number
   */
  function padWeek(num) {
    return num.toString().padStart(2, '0');
  }

  /**
   * Helper: Show transient HUD notification toast
   */
  function showToast(message, type = 'info', durationMs = 4500) {
    let toast = document.getElementById('admin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'admin-toast';
      toast.className = 'admin-toast mono-text';
      document.body.appendChild(toast);
    }
    toast.className = `admin-toast mono-text show ${type}`;
    toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, durationMs);
  }

  /**
   * Client-side Canvas Image Compression
   * - Max 1600px longest edge
   * - Converts to WebP (fallback JPEG) at 80% quality
   * - Strips EXIF/metadata
   */
  function processImageFile(file) {
    return new Promise((resolve, reject) => {
      // Reject non-images
      if (!file.type.startsWith('image/')) {
        return reject(new Error('Invalid file type. Please upload an image file (PNG, JPG, WebP, etc.).'));
      }
      // Reject files > 8MB before processing
      if (file.size > 8 * 1024 * 1024) {
        return reject(new Error(`File "${file.name}" is ${Math.round(file.size / (1024 * 1024))}MB. Maximum allowed is 8MB.`));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDimension = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Try WebP first, fallback to JPEG
          let format = 'image/webp';
          let extension = 'webp';
          let dataUrl = canvas.toDataURL(format, 0.82);

          if (!dataUrl.startsWith('data:image/webp')) {
            format = 'image/jpeg';
            extension = 'jpg';
            dataUrl = canvas.toDataURL(format, 0.82);
          }

          // Extract pure Base64 content
          const base64Data = dataUrl.split(',')[1];
          const cleanName = file.name.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/\.[^/.]+$/, '').toLowerCase();
          const uniqueFilename = `${cleanName}-${Date.now()}.${extension}`;

          resolve({
            filename: uniqueFilename,
            base64: base64Data,
            dataUrl: dataUrl,
            width: width,
            height: height
          });
        };
        img.onerror = () => reject(new Error('Failed to read image data.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to load file.'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Verify token against GitHub API and check repo push permissions
   */
  async function verifyGitHubToken(token) {
    if (!token || !token.trim()) {
      throw new Error('Please enter a valid GitHub Personal Access Token.');
    }
    const cleanToken = token.trim();
    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: {
        'Authorization': `Bearer ${cleanToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (res.status === 401 || res.status === 403) {
      throw new Error('Authentication rejected by GitHub. Please check your token.');
    }
    if (res.status === 404) {
      throw new Error(`Repository ${REPO_OWNER}/${REPO_NAME} not found or token has no access.`);
    }
    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    if (!data.permissions || !data.permissions.push) {
      throw new Error(`Token verified, but it lacks WRITE/PUSH permissions on ${REPO_OWNER}/${REPO_NAME}. Ensure your fine-grained token has "Contents: Read and write".`);
    }

    return {
      repoName: data.full_name,
      owner: data.owner ? data.owner.login : REPO_OWNER
    };
  }

  /**
   * Prompt Owner for Token
   */
  function showAuthPromptModal() {
    let modal = document.getElementById('admin-auth-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'admin-auth-modal';
      modal.className = 'admin-modal-backdrop';
      modal.innerHTML = `
        <div class="admin-modal-box">
          <div class="admin-modal-header mono-text">
            <h3 class="admin-modal-title">✦ PROTOSEM CMS // AUTHENTICATION</h3>
            <button type="button" class="admin-icon-btn" id="admin-auth-close" aria-label="Close modal">×</button>
          </div>
          <div class="admin-modal-body">
            <p class="body-text" style="color: var(--text-cream); margin-bottom: 0.5rem;">
              Enter your fine-grained GitHub Personal Access Token to edit the 20-Week Innovation Highway journal entries and photos.
            </p>
            <div class="week-date-range mono-text" style="display: block; line-height: 1.5; padding: 0.6rem;">
              <span class="range-badge">SECURITY NOTICE:</span> Your token is saved <strong>ONLY</strong> in your browser's private local storage. It is never transmitted anywhere except directly to <code>api.github.com</code>.
            </div>

            <div class="admin-form-group" style="margin-top: 0.75rem;">
              <label for="admin-token-input" class="mono-text">GITHUB_PERSONAL_ACCESS_TOKEN_</label>
              <input type="password" id="admin-token-input" class="admin-input mono" placeholder="github_pat_... or ghp_..." autocomplete="off" spellcheck="false" />
            </div>

            <div id="admin-auth-error" class="mono-text" style="display: none; color: #ff6b8b; font-size: 0.78rem; line-height: 1.4; padding: 0.5rem; background: rgba(255, 46, 151, 0.1); border: 1px solid #ff3366; border-radius: 4px;"></div>
          </div>
          <div class="admin-modal-footer">
            <button type="button" class="admin-btn" id="admin-auth-cancel">CANCEL</button>
            <button type="button" class="admin-btn" id="admin-auth-submit" style="background: rgba(0, 240, 255, 0.2); border-color: var(--neon-cyan); color: var(--neon-cyan); font-weight: 700;">
              AUTHORIZE SESSION ✦
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeAuth = () => {
        modal.classList.remove('active');
        if (window.location.hash === '#admin') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      };

      modal.querySelector('#admin-auth-close').addEventListener('click', closeAuth);
      modal.querySelector('#admin-auth-cancel').addEventListener('click', closeAuth);

      const submitBtn = modal.querySelector('#admin-auth-submit');
      const inputEl = modal.querySelector('#admin-token-input');
      const errorEl = modal.querySelector('#admin-auth-error');

      const handleAuth = async () => {
        const val = inputEl.value.trim();
        if (!val) {
          errorEl.textContent = 'Please enter a token.';
          errorEl.style.display = 'block';
          return;
        }

        submitBtn.textContent = 'VERIFYING CREDENTIALS...';
        submitBtn.disabled = true;
        errorEl.style.display = 'none';

        try {
          await verifyGitHubToken(val);
          localStorage.setItem(STORAGE_TOKEN_KEY, val);
          modal.classList.remove('active');
          showToast('Authentication confirmed! Admin mode active.', 'success');
          activateAdminMode();
        } catch (err) {
          errorEl.textContent = err.message || 'Authorization failed.';
          errorEl.style.display = 'block';
        } finally {
          submitBtn.textContent = 'AUTHORIZE SESSION ✦';
          submitBtn.disabled = false;
        }
      };

      submitBtn.addEventListener('click', handleAuth);
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAuth();
      });
    }

    modal.classList.add('active');
    setTimeout(() => {
      const inp = modal.querySelector('#admin-token-input');
      if (inp) inp.focus();
    }, 100);
  }

  /**
   * Activate Admin Mode: Inject Admin Bar & Edit Buttons
   */
  function activateAdminMode() {
    isInitialized = true;

    // Inject Top Bar
    let bar = document.getElementById('protosem-admin-bar');
    if (!bar) {
      bar = document.createElement('header');
      bar.id = 'protosem-admin-bar';
      bar.className = 'protosem-admin-bar mono-text';
      bar.innerHTML = `
        <div class="admin-bar-left">
          <span class="admin-badge">ADMIN MODE</span>
          <span class="admin-repo-info">REPO: ${REPO_OWNER}/${REPO_NAME}</span>
        </div>
        <div class="admin-bar-actions">
          <button type="button" class="admin-btn" id="admin-export-json" title="Download backup of weeks data">
            📥 EXPORT JSON
          </button>
          <button type="button" class="admin-btn" id="admin-import-json" title="Restore weeks data from JSON file">
            📤 IMPORT JSON
          </button>
          <button type="button" class="admin-btn danger" id="admin-exit-btn">
            LOGOUT / EXIT [×]
          </button>
        </div>
        <input type="file" id="admin-import-file-input" accept=".json" style="display: none;" />
      `;
      document.body.prepend(bar);

      // Export JSON handler
      bar.querySelector('#admin-export-json').addEventListener('click', () => {
        const data = portfolioData.protosem.weeks || [];
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `weeks-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Weeks data exported successfully.', 'success');
      });

      // Import JSON handler
      const fileInp = bar.querySelector('#admin-import-file-input');
      bar.querySelector('#admin-import-json').addEventListener('click', () => {
        fileInp.click();
      });
      fileInp.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (evt) => {
          try {
            const imported = JSON.parse(evt.target.result);
            if (!Array.isArray(imported) || imported.length === 0) {
              throw new Error('Imported file must contain an array of weeks.');
            }
            if (confirm(`Replace all weeks data with ${imported.length} weeks from "${file.name}" and commit to GitHub?`)) {
              await commitAllWeeksJson(imported, `chore(protosem): import weeks backup from ${file.name}`);
            }
          } catch (err) {
            alert(`Failed to import JSON: ${err.message}`);
          }
          fileInp.value = '';
        };
        reader.readAsText(file);
      });

      // Logout handler
      bar.querySelector('#admin-exit-btn').addEventListener('click', () => {
        if (confirm('Exit Admin Mode and forget your GitHub access token from this browser?')) {
          localStorage.removeItem(STORAGE_TOKEN_KEY);
          isInitialized = false;
          bar.remove();
          document.querySelectorAll('.admin-card-edit-btn').forEach(btn => btn.remove());
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          showToast('Admin mode deactivated. Token removed.', 'info');
        }
      });
    }

    refreshCardButtons();
  }

  /**
   * Injects or updates [✎ EDIT] button on all week cards
   */
  function refreshCardButtons() {
    if (!isInitialized) return;

    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach(card => {
      const nodeRow = card.closest('.timeline-node-row');
      if (!nodeRow) return;
      const weekNum = parseInt(nodeRow.dataset.week, 10);
      if (!weekNum) return;

      let editBtn = card.querySelector('.admin-card-edit-btn');
      if (!editBtn) {
        editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'admin-card-edit-btn mono-text';
        editBtn.textContent = '✎ EDIT';
        editBtn.setAttribute('aria-label', `Edit Week ${weekNum} journal entry`);

        editBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openWeekEditor(weekNum);
        });

        const topRow = card.querySelector('.card-top-row');
        if (topRow) {
          topRow.appendChild(editBtn);
        } else {
          card.prepend(editBtn);
        }
      }
    });
  }

  /**
   * Open Week Editor Modal
   */
  function openWeekEditor(weekNum) {
    const weeks = portfolioData.protosem.weeks || [];
    let weekItem = weeks.find(w => w.week === weekNum);
    if (!weekItem) {
      showToast(`Week ${weekNum} not found in dataset.`, 'error');
      return;
    }

    activeEditorWeek = weekNum;
    pendingDeletedImages = [];

    // Check for saved local draft
    const draftJson = localStorage.getItem(DRAFT_KEY_PREFIX + weekNum);
    let draft = null;
    if (draftJson) {
      try {
        draft = JSON.parse(draftJson);
      } catch (e) {}
    }

    // Work with clone of item
    activeEditorDraft = draft ? Object.assign({}, weekItem, draft) : JSON.parse(JSON.stringify(weekItem));
    if (!Array.isArray(activeEditorDraft.images)) activeEditorDraft.images = [];

    renderWeekEditorModal(draft !== null);
  }

  /**
   * Render the Week Editor Modal Dialog
   */
  function renderWeekEditorModal(hasRestoredDraft) {
    let modal = document.getElementById('protosem-editor-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'protosem-editor-modal';
      modal.className = 'admin-modal-backdrop';
      document.body.appendChild(modal);
    }

    const item = activeEditorDraft;
    const weekNum = item.week;

    modal.innerHTML = `
      <div class="admin-modal-box wide" role="dialog" aria-modal="true" aria-labelledby="editor-title">
        <div class="admin-modal-header mono-text">
          <h3 class="admin-modal-title" id="editor-title">
            <span>✦ FIELD JOURNAL EDITOR // WEEK ${padWeek(weekNum)}</span>
            <span style="font-size: 0.72rem; color: var(--neon-cyan); opacity: 0.85;">(${item.phaseLabel})</span>
          </h3>
          <button type="button" class="admin-icon-btn" id="editor-close-btn" aria-label="Close editor">×</button>
        </div>

        <div class="admin-modal-body">
          ${hasRestoredDraft ? `
            <div id="draft-notice" class="mono-text" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.85rem; background: rgba(0, 240, 255, 0.12); border: 1px solid var(--neon-cyan); border-radius: 6px; font-size: 0.75rem; color: var(--neon-cyan);">
              <span>✦ Unsaved draft restored from this browser</span>
              <button type="button" class="admin-btn" id="discard-draft-btn" style="padding: 0.15rem 0.45rem; font-size: 0.68rem;">DISCARD DRAFT</button>
            </div>
          ` : ''}

          <!-- Row 1: Title & Status -->
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label for="ed-title" class="mono-text">WEEK_TITLE_</label>
              <input type="text" id="ed-title" class="admin-input" value="${escapeHtml(item.title)}" required />
            </div>
            <div class="admin-form-group">
              <label for="ed-status" class="mono-text">STATUS_</label>
              <select id="ed-status" class="admin-select mono">
                <option value="Completed" ${item.status === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="In progress" ${item.status === 'In progress' ? 'selected' : ''}>In progress</option>
                <option value="Upcoming" ${item.status === 'Upcoming' ? 'selected' : ''}>Upcoming</option>
              </select>
            </div>
          </div>

          <!-- Row 2: Date Range & Summary -->
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label for="ed-daterange" class="mono-text">TIMEFRAME / DATE RANGE (OPTIONAL)_</label>
              <input type="text" id="ed-daterange" class="admin-input mono" placeholder="e.g. 12 Jan - 18 Jan" value="${escapeHtml(item.dateRange || '')}" />
            </div>
            <div class="admin-form-group">
              <label for="ed-summary" class="mono-text">CARD SUMMARY (1-2 SENTENCES)_</label>
              <input type="text" id="ed-summary" class="admin-input" placeholder="Brief high-level summary..." value="${escapeHtml(item.summary || '')}" />
            </div>
          </div>

          <!-- Section 3: Weekly Reflection / Details Write-up -->
          <div class="admin-form-group">
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
              <label class="mono-text">WEEKLY REFLECTION & DETAILED WRITE-UP (SUPPORTS SAFE MARKDOWN)_</label>
              <div class="admin-tabs mono-text">
                <button type="button" class="admin-tab-btn active" id="tab-write">WRITE</button>
                <button type="button" class="admin-tab-btn" id="tab-preview">PREVIEW</button>
              </div>
            </div>

            <textarea id="ed-details" class="admin-textarea" placeholder="Write what happened this week...&#10;&#10;Formatting tips:&#10;- Bullet points with '- '&#10;- **Bold text**&#10;- ### Section headings&#10;- Double line break for new paragraph">${escapeHtml(item.details || '')}</textarea>
            
            <div id="ed-preview-box" class="admin-preview-panel" style="display: none;"></div>
            <span class="mono-text" style="font-size: 0.68rem; color: var(--text-muted);">Safe subset allowed: paragraphs, line breaks, **bold**, *italic*, - bullet lists, ### headings. Raw HTML is escaped.</span>
          </div>

          <!-- Section 4: Image Attachments -->
          <div class="admin-form-group">
            <label class="mono-text">FIELD PHOTOS & VISUAL ARTIFACTS_</label>
            
            <div class="admin-dropzone" id="image-dropzone">
              <input type="file" id="image-file-input" multiple accept="image/*" style="display: none;" />
              <div class="admin-dropzone-prompt mono-text">
                <span>📁 DRAG & DROP PHOTOS HERE, OR <strong style="color: var(--neon-cyan); text-decoration: underline;">BROWSE FILES</strong></span>
                <span class="admin-dropzone-sub">Images are compressed client-side (max 1600px WebP, metadata stripped). Max 8MB per original.</span>
              </div>
            </div>

            <div class="admin-image-list" id="editor-image-list">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>

        <div class="admin-modal-footer">
          <button type="button" class="admin-btn" id="editor-cancel-btn">CANCEL</button>
          <button type="button" class="admin-btn" id="editor-save-btn" style="background: rgba(0, 240, 255, 0.2); border-color: var(--neon-cyan); color: var(--neon-cyan); font-weight: 700;">
            ✦ PUBLISH TO GITHUB PAGES
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Auto-save draft on input change
    const titleInput = modal.querySelector('#ed-title');
    const statusSelect = modal.querySelector('#ed-status');
    const dateRangeInput = modal.querySelector('#ed-daterange');
    const summaryInput = modal.querySelector('#ed-summary');
    const detailsTextarea = modal.querySelector('#ed-details');
    const previewBox = modal.querySelector('#ed-preview-box');

    const updateDraftState = () => {
      activeEditorDraft.title = titleInput.value.trim();
      activeEditorDraft.status = statusSelect.value;
      activeEditorDraft.dateRange = dateRangeInput.value.trim();
      activeEditorDraft.summary = summaryInput.value.trim();
      activeEditorDraft.details = detailsTextarea.value;
      localStorage.setItem(DRAFT_KEY_PREFIX + weekNum, JSON.stringify(activeEditorDraft));
    };

    [titleInput, statusSelect, dateRangeInput, summaryInput, detailsTextarea].forEach(el => {
      el.addEventListener('input', updateDraftState);
    });

    // Write / Preview Tabs
    const tabWrite = modal.querySelector('#tab-write');
    const tabPreview = modal.querySelector('#tab-preview');

    tabWrite.addEventListener('click', () => {
      tabWrite.classList.add('active');
      tabPreview.classList.remove('active');
      detailsTextarea.style.display = 'block';
      previewBox.style.display = 'none';
    });

    tabPreview.addEventListener('click', () => {
      tabPreview.classList.add('active');
      tabWrite.classList.remove('active');
      detailsTextarea.style.display = 'none';
      previewBox.style.display = 'block';
      const parsedHtml = window.formatMarkdownSafe ? window.formatMarkdownSafe(detailsTextarea.value) : escapeHtml(detailsTextarea.value);
      previewBox.innerHTML = parsedHtml || '<span style="color: var(--text-muted);">No reflection written yet.</span>';
    });

    // Discard draft button
    const discardBtn = modal.querySelector('#discard-draft-btn');
    if (discardBtn) {
      discardBtn.addEventListener('click', () => {
        localStorage.removeItem(DRAFT_KEY_PREFIX + weekNum);
        openWeekEditor(weekNum);
      });
    }

    // Render current images in the editor
    renderEditorImageList();

    // Dropzone logic
    const dropzone = modal.querySelector('#image-dropzone');
    const fileInput = modal.querySelector('#image-file-input');

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleImageUploadFiles(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleImageUploadFiles(e.target.files);
      }
    });

    // Close & Cancel
    const handleClose = () => {
      modal.classList.remove('active');
    };

    modal.querySelector('#editor-close-btn').addEventListener('click', handleClose);
    modal.querySelector('#editor-cancel-btn').addEventListener('click', handleClose);

    // Save & Publish
    modal.querySelector('#editor-save-btn').addEventListener('click', () => {
      saveAndPublishWeek(weekNum);
    });
  }

  /**
   * Process and attach newly uploaded image files
   */
  async function handleImageUploadFiles(files) {
    showToast(`Processing ${files.length} image(s)...`, 'info', 2000);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const processed = await processImageFile(file);
        activeEditorDraft.images.push({
          src: '', // will be set upon upload
          alt: file.name.replace(/\.[^/.]+$/, ''),
          caption: '',
          _isNew: true,
          _filename: processed.filename,
          _base64: processed.base64,
          _previewUrl: processed.dataUrl
        });
      } catch (err) {
        alert(err.message);
      }
    }
    // Update local draft
    localStorage.setItem(DRAFT_KEY_PREFIX + activeEditorWeek, JSON.stringify(activeEditorDraft));
    renderEditorImageList();
  }

  /**
   * Render the list of images inside the editor
   */
  function renderEditorImageList() {
    const listContainer = document.getElementById('editor-image-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const images = activeEditorDraft.images || [];

    if (images.length === 0) {
      listContainer.innerHTML = '<span class="mono-text" style="font-size: 0.72rem; color: var(--text-muted);">No images attached for this week.</span>';
      return;
    }

    images.forEach((img, idx) => {
      const itemRow = document.createElement('div');
      itemRow.className = 'admin-image-item';

      const previewSrc = img._previewUrl || img.src || img.url || '';

      itemRow.innerHTML = `
        <img src="${escapeHtml(previewSrc)}" alt="" class="admin-image-preview" />
        
        <div class="admin-image-inputs">
          <input type="text" class="img-caption-input" placeholder="Photo caption (displayed under image)" value="${escapeHtml(img.caption || '')}" data-idx="${idx}" />
          <input type="text" class="img-alt-input" placeholder="Accessibility Alt text" value="${escapeHtml(img.alt || '')}" data-idx="${idx}" />
        </div>

        <div class="admin-image-actions">
          ${idx > 0 ? `<button type="button" class="admin-icon-btn move-up" data-idx="${idx}" title="Move up">▲</button>` : ''}
          ${idx < images.length - 1 ? `<button type="button" class="admin-icon-btn move-down" data-idx="${idx}" title="Move down">▼</button>` : ''}
          <button type="button" class="admin-icon-btn delete" data-idx="${idx}" title="Remove image">🗑</button>
        </div>
      `;

      // Inputs handling
      const captionInp = itemRow.querySelector('.img-caption-input');
      captionInp.addEventListener('input', (e) => {
        img.caption = e.target.value;
        localStorage.setItem(DRAFT_KEY_PREFIX + activeEditorWeek, JSON.stringify(activeEditorDraft));
      });

      const altInp = itemRow.querySelector('.img-alt-input');
      altInp.addEventListener('input', (e) => {
        img.alt = e.target.value;
        localStorage.setItem(DRAFT_KEY_PREFIX + activeEditorWeek, JSON.stringify(activeEditorDraft));
      });

      // Move Up
      const upBtn = itemRow.querySelector('.move-up');
      if (upBtn) {
        upBtn.addEventListener('click', () => {
          const temp = images[idx - 1];
          images[idx - 1] = images[idx];
          images[idx] = temp;
          localStorage.setItem(DRAFT_KEY_PREFIX + activeEditorWeek, JSON.stringify(activeEditorDraft));
          renderEditorImageList();
        });
      }

      // Move Down
      const downBtn = itemRow.querySelector('.move-down');
      if (downBtn) {
        downBtn.addEventListener('click', () => {
          const temp = images[idx + 1];
          images[idx + 1] = images[idx];
          images[idx] = temp;
          localStorage.setItem(DRAFT_KEY_PREFIX + activeEditorWeek, JSON.stringify(activeEditorDraft));
          renderEditorImageList();
        });
      }

      // Delete
      itemRow.querySelector('.delete').addEventListener('click', () => {
        if (!img._isNew && (img.src || img.url)) {
          pendingDeletedImages.push(img.src || img.url);
        }
        images.splice(idx, 1);
        localStorage.setItem(DRAFT_KEY_PREFIX + activeEditorWeek, JSON.stringify(activeEditorDraft));
        renderEditorImageList();
      });

      listContainer.appendChild(itemRow);
    });
  }

  /**
   * Save & Publish Week to GitHub repository via GitHub REST API
   */
  async function saveAndPublishWeek(weekNum) {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (!token) {
      showToast('Authentication token missing. Please sign in.', 'error');
      showAuthPromptModal();
      return;
    }

    const saveBtn = document.getElementById('editor-save-btn');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = 'COMMITTING TO GITHUB...';
    }

    try {
      showToast('Step 1/3: Uploading new media assets...', 'info', 3000);

      // 1. Upload any newly added images
      const images = activeEditorDraft.images || [];
      for (const img of images) {
        if (img._isNew && img._base64) {
          const targetPath = `assets/weeks/week-${padWeek(weekNum)}/${img._filename}`;
          const uploadRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${targetPath}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `media(protosem): upload week ${padWeek(weekNum)} visual ${img._filename}`,
              content: img._base64,
              branch: REPO_BRANCH
            })
          });

          if (!uploadRes.ok) {
            const errJson = await uploadRes.json().catch(() => ({}));
            throw new Error(`Failed to upload ${img._filename}: ${errJson.message || uploadRes.statusText}`);
          }

          // Point to permanent repository relative path
          img.src = targetPath;
          delete img._isNew;
          delete img._base64;
          delete img._previewUrl;
          delete img._filename;
        }
      }

      // 2. Clean up any deleted images from repo if requested
      for (const delPath of pendingDeletedImages) {
        try {
          // Get SHA of existing file to delete it
          const checkRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${delPath}?ref=${REPO_BRANCH}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (checkRes.ok) {
            const fileMeta = await checkRes.json();
            await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${delPath}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: `media(protosem): delete unused visual ${delPath}`,
                sha: fileMeta.sha,
                branch: REPO_BRANCH
              })
            });
          }
        } catch (e) {
          console.warn('Could not delete old image file from repo:', delPath, e);
        }
      }

      showToast('Step 2/3: Updating data/weeks.json on GitHub...', 'info', 3000);

      // 3. Fetch latest data/weeks.json from GitHub to get current SHA and merge
      let weeksRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/weeks.json?ref=${REPO_BRANCH}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json'
        }
      });

      if (!weeksRes.ok) {
        throw new Error(`Failed to fetch current weeks.json: ${weeksRes.statusText}`);
      }

      let fileData = await weeksRes.json();
      let remoteWeeks = JSON.parse(decodeURIComponent(escape(atob(fileData.content.replace(/\s/g, '')))));

      // Update specific week
      const targetIdx = remoteWeeks.findIndex(w => w.week === weekNum);
      const updatedWeek = {
        week: weekNum,
        phase: activeEditorDraft.phase,
        phaseLabel: activeEditorDraft.phaseLabel,
        title: activeEditorDraft.title,
        summary: activeEditorDraft.summary,
        status: activeEditorDraft.status,
        dateRange: activeEditorDraft.dateRange || "",
        details: activeEditorDraft.details || "",
        images: activeEditorDraft.images.map(img => ({
          src: img.src || img.url || "",
          alt: img.alt || "",
          caption: img.caption || ""
        })),
        updatedAt: new Date().toISOString()
      };

      if (targetIdx >= 0) {
        remoteWeeks[targetIdx] = updatedWeek;
      } else {
        remoteWeeks.push(updatedWeek);
      }

      // Encode UTF-8 JSON to Base64
      const updatedJsonString = JSON.stringify(remoteWeeks, null, 2);
      const updatedBase64 = btoa(unescape(encodeURIComponent(updatedJsonString)));

      // Commit to GitHub with 409 conflict retry handler
      let commitRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/weeks.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update ProtoSem Week ${padWeek(weekNum)}`,
          content: updatedBase64,
          sha: fileData.sha,
          branch: REPO_BRANCH
        })
      });

      // Handle 409 SHA conflict: re-fetch and retry once
      if (commitRes.status === 409) {
        showToast('Resolving conflict: re-fetching latest commit...', 'info', 2000);
        weeksRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/weeks.json?ref=${REPO_BRANCH}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fileData = await weeksRes.json();
        remoteWeeks = JSON.parse(decodeURIComponent(escape(atob(fileData.content.replace(/\s/g, '')))));
        const retryIdx = remoteWeeks.findIndex(w => w.week === weekNum);
        if (retryIdx >= 0) remoteWeeks[retryIdx] = updatedWeek;
        else remoteWeeks.push(updatedWeek);

        commitRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/weeks.json`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Update ProtoSem Week ${padWeek(weekNum)}`,
            content: btoa(unescape(encodeURIComponent(JSON.stringify(remoteWeeks, null, 2)))),
            sha: fileData.sha,
            branch: REPO_BRANCH
          })
        });
      }

      if (!commitRes.ok) {
        const commitErr = await commitRes.json().catch(() => ({}));
        throw new Error(`Failed to commit data/weeks.json: ${commitErr.message || commitRes.statusText}`);
      }

      showToast('Step 3/3: Success! Updating live presentation...', 'success', 3000);

      // Clear draft in localStorage
      localStorage.removeItem(DRAFT_KEY_PREFIX + weekNum);

      // Sync local in-memory dataset and re-render cards immediately
      portfolioData.protosem.weeks = remoteWeeks;
      if (typeof window.initProtoSemTimeline === 'function') {
        await window.initProtoSemTimeline();
      }

      // Close modal
      const modal = document.getElementById('protosem-editor-modal');
      if (modal) modal.classList.remove('active');

      alert(`Saved! Changes committed to GitHub main.\n\nThe live site updates in about 1-2 minutes after GitHub Pages rebuilds.`);

    } catch (err) {
      console.error('Publish error:', err);
      alert(`Publishing Error: ${err.message}`);
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = '✦ PUBLISH TO GITHUB PAGES';
      }
    }
  }

  /**
   * Commit complete weeks array to GitHub (used by JSON backup import)
   */
  async function commitAllWeeksJson(allWeeks, commitMessage) {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (!token) {
      showToast('Token missing. Please sign in.', 'error');
      showAuthPromptModal();
      return;
    }

    try {
      showToast('Committing imported weeks to GitHub...', 'info', 3000);

      const getRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/weeks.json?ref=${REPO_BRANCH}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!getRes.ok) throw new Error('Could not access current data/weeks.json.');
      const fileData = await getRes.json();

      const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(allWeeks, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/weeks.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: commitMessage || 'chore(protosem): import complete weeks dataset',
          content: base64,
          sha: fileData.sha,
          branch: REPO_BRANCH
        })
      });

      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(err.message || putRes.statusText);
      }

      portfolioData.protosem.weeks = allWeeks;
      if (typeof window.initProtoSemTimeline === 'function') {
        await window.initProtoSemTimeline();
      }

      showToast('Dataset imported and committed successfully!', 'success');
    } catch (err) {
      alert(`Import error: ${err.message}`);
    }
  }

  /**
   * Public API exposed to window
   */
  window.ProtoSemAdmin = {
    init: function (forceOpenPrompt = false) {
      const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (storedToken) {
        // Fast verify
        verifyGitHubToken(storedToken)
          .then(() => {
            activateAdminMode();
          })
          .catch((err) => {
            console.warn('Stored token invalid:', err);
            localStorage.removeItem(STORAGE_TOKEN_KEY);
            if (forceOpenPrompt) showAuthPromptModal();
          });
      } else if (forceOpenPrompt) {
        showAuthPromptModal();
      }
    },
    refreshCardButtons: refreshCardButtons,
    openEditor: openWeekEditor,
    get isActive() {
      return isInitialized;
    }
  };

})();
