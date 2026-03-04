/* ============================================================
   NFL Draft Hub 2026 — Application Logic
   ============================================================ */

/* ------------------------------------------------------------
   A. State
   ------------------------------------------------------------ */
let currentTeam = null;
let currentTab  = 'season';

/* ------------------------------------------------------------
   B. Init
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  renderLanding();

  document.getElementById('btn-back')
    .addEventListener('click', showLanding);

  document.getElementById('team-grid')
    .addEventListener('click', handleTeamCardClick);

  document.getElementById('section-tabs')
    .addEventListener('click', handleTabClick);
});

/* ------------------------------------------------------------
   C. Navigation
   ------------------------------------------------------------ */
function showLanding() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('landing').classList.remove('hidden');
  document.getElementById('btn-back').classList.add('hidden');
  resetTeamColors();
  currentTeam = null;
  currentTab  = 'season';
}

function showDashboard(teamId) {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return;
  currentTeam = team;
  currentTab  = 'season';

  applyTeamColors(team.colors);

  document.getElementById('landing').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('btn-back').classList.remove('hidden');

  renderDashboard();
}

/* ------------------------------------------------------------
   D. Team Color Theming
   ------------------------------------------------------------ */
function applyTeamColors(colors) {
  const root = document.documentElement;
  root.style.setProperty('--team-primary',    colors.primary);
  root.style.setProperty('--team-secondary',  colors.secondary);
  root.style.setProperty('--team-accent',     colors.accent);
  root.style.setProperty('--team-primary-rgb', colors.primaryRgb);
  root.style.setProperty('--team-accent-rgb',  colors.accentRgb);
}

function resetTeamColors() {
  const props = [
    '--team-primary', '--team-secondary', '--team-accent',
    '--team-primary-rgb', '--team-accent-rgb'
  ];
  props.forEach(p => document.documentElement.style.removeProperty(p));
}

/* ------------------------------------------------------------
   E. Event Handlers
   ------------------------------------------------------------ */
function handleTeamCardClick(e) {
  const card = e.target.closest('[data-team-id]');
  if (card) showDashboard(card.dataset.teamId);
}

function handleTabClick(e) {
  const btn = e.target.closest('[data-tab]');
  if (!btn) return;

  currentTab = btn.dataset.tab;

  // Update active state on tab buttons
  document.querySelectorAll('#section-tabs [data-tab]').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === currentTab);
  });

  renderActiveTab();
}

/* ------------------------------------------------------------
   F. Landing Render
   ------------------------------------------------------------ */
function renderLanding() {
  const grid = document.getElementById('team-grid');
  grid.innerHTML = TEAMS.map(team => renderTeamCard(team)).join('');
}

function renderTeamCard(team) {
  const [r, g, b] = hexToRgbParts(team.colors.primary);
  return `
    <div
      class="team-card"
      data-team-id="${team.id}"
      role="listitem"
      style="--card-accent: ${team.colors.primary}; --card-accent-rgb: ${r}, ${g}, ${b};"
      tabindex="0"
      aria-label="View ${team.city} ${team.name}"
      onkeydown="if(event.key==='Enter'||event.key===' ')this.click()"
    >
      <div class="team-card-abbr">${team.abbreviation}</div>
      <div class="team-card-name">${team.name}</div>
      <div class="team-card-city">${team.city}</div>
      <div class="team-card-meta">
        <span class="badge pick-badge">Pick #${team.draftPick}</span>
        <span class="badge" style="background: rgba(${r},${g},${b},0.12); color: rgba(${r},${g},${b},1); border: 1px solid rgba(${r},${g},${b},0.25);">${team.season.record}</span>
        <span class="arrow-icon">→</span>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------
   G. Dashboard Render
   ------------------------------------------------------------ */
function renderDashboard() {
  mountHero(renderHero(currentTeam));
  mountTabs(renderTabs());
  renderActiveTab();
}

function mountHero(html)  { document.getElementById('team-hero').innerHTML    = html; }
function mountTabs(html)  { document.getElementById('section-tabs').innerHTML = html; }
function mountContent(html) {
  const container = document.getElementById('tab-content');
  container.innerHTML = html;
  const panel = container.querySelector('.tab-panel');
  if (panel) {
    panel.classList.remove('tab-panel');
    void panel.offsetWidth; // force reflow to restart animation
    panel.classList.add('tab-panel');
  }
}

function renderHero(team) {
  const accentTextClass = isLightColor(team.colors.accent) ? 'badge-silver' : '';
  return `
    <div class="hero-inner">
      <div class="hero-abbr">${team.abbreviation}</div>
      <div class="hero-text">
        <div class="hero-city">${team.city}</div>
        <h2 class="hero-name">${team.city} ${team.name}</h2>
        <div class="hero-meta">
          <span class="hero-record">${team.season.record}</span>
          <span class="hero-pick ${accentTextClass}">Pick #${team.draftPick} · 2026 NFL Draft</span>
        </div>
      </div>
    </div>
  `;
}

function renderTabs() {
  const tabs = [
    { id: 'season',    label: 'Season Review', icon: '📊' },
    { id: 'needs',     label: 'Team Needs',    icon: '🎯' },
    { id: 'prospects', label: 'Draft Targets', icon: '⭐' }
  ];
  const buttonsHtml = tabs.map(tab => `
    <button
      class="tab-btn ${tab.id === currentTab ? 'active' : ''}"
      data-tab="${tab.id}"
      aria-pressed="${tab.id === currentTab}"
    >
      <span class="tab-icon" aria-hidden="true">${tab.icon}</span>
      ${tab.label}
    </button>
  `).join('');
  return `<div class="tabs-inner">${buttonsHtml}</div>`;
}

function renderActiveTab() {
  let html = '';
  if      (currentTab === 'season')    html = renderSeasonTab(currentTeam);
  else if (currentTab === 'needs')     html = renderNeedsTab(currentTeam);
  else if (currentTab === 'prospects') html = renderProspectsTab(currentTeam);
  mountContent(html);
}

/* ------------------------------------------------------------
   H. Season Review Tab
   ------------------------------------------------------------ */
function renderSeasonTab(team) {
  const statsHtml = team.season.stats.map(stat => {
    const rankClass = getRankClass(stat.rank, stat.good);
    return `
      <div class="stat-card">
        <span class="stat-label">${stat.label}</span>
        <span class="stat-value">${stat.value}</span>
        <span class="rank-badge ${rankClass}">Rank #${stat.rank}</span>
      </div>
    `;
  }).join('');

  const strengthsHtml = team.season.strengths.map(s => `<li>${s}</li>`).join('');
  const weaknessesHtml = team.season.weaknesses.map(w => `<li>${w}</li>`).join('');

  return `
    <div class="tab-panel">
      <p class="section-heading">2025 Season Overview</p>
      <p class="section-sub">${team.city} ${team.name} · ${team.season.record}</p>

      <div class="season-summary">
        <h3>Season Summary</h3>
        <p>${team.season.summary}</p>
      </div>

      <p class="section-heading" style="margin-bottom:16px;">Key Statistics</p>
      <div class="stats-grid">${statsHtml}</div>

      <p class="section-heading" style="margin-bottom:16px;">Strengths &amp; Weaknesses</p>
      <div class="sw-grid">
        <div class="sw-card strengths">
          <h4>What Worked</h4>
          <ul>${strengthsHtml}</ul>
        </div>
        <div class="sw-card weaknesses">
          <h4>Areas of Concern</h4>
          <ul>${weaknessesHtml}</ul>
        </div>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------
   I. Team Needs Tab
   ------------------------------------------------------------ */
function renderNeedsTab(team) {
  const needsHtml = team.needs.map(need => {
    const priorityClass = `priority-${need.priority.toLowerCase()}`;
    const needColor = need.priority === 'High'
      ? 'var(--priority-high)'
      : need.priority === 'Medium'
        ? 'var(--priority-medium)'
        : 'var(--priority-low)';

    return `
      <div class="need-card" style="--need-color: ${needColor};">
        <div class="need-pos-chip">${need.position}</div>
        <div class="need-content">
          <div class="need-header">
            <span class="need-position-label">${positionLabel(need.position)}</span>
            <span class="need-priority-badge ${priorityClass}">${need.priority} Need</span>
          </div>
          <p class="need-description">${need.description}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="tab-panel">
      <p class="section-heading">Key Positional Needs</p>
      <p class="section-sub">Heading into the 2026 Draft, ranked by priority</p>
      <div class="needs-list">${needsHtml}</div>
    </div>
  `;
}

/* ------------------------------------------------------------
   J. Draft Targets Tab
   ------------------------------------------------------------ */
function renderProspectsTab(team) {
  const accentTextClass = isLightColor(team.colors.accent) ? 'badge-silver' : '';

  const prospectsHtml = team.prospects.map(p => `
    <div class="prospect-card">
      <div class="prospect-header">
        <div class="prospect-pos-badge ${accentTextClass}">${p.position}</div>
        <div class="prospect-info">
          <div class="prospect-name">${p.name}</div>
          <div class="prospect-school">${p.school}</div>
        </div>
      </div>
      <span class="prospect-round">${p.projectedRound}</span>
      <div class="prospect-divider"></div>
      <p class="prospect-summary">${p.summary}</p>
    </div>
  `).join('');

  return `
    <div class="tab-panel">
      <p class="section-heading">Top Draft Targets</p>
      <p class="section-sub">Prospects that fit ${team.city}'s needs at pick #${team.draftPick}</p>
      <div class="prospects-grid">${prospectsHtml}</div>
    </div>
  `;
}

/* ------------------------------------------------------------
   K. Utility Functions
   ------------------------------------------------------------ */

// Returns rank badge CSS class.
// `good` is true when the team performed well in that category.
// A good result is always green; a bad result with a very low rank is red; otherwise neutral.
function getRankClass(rank, good) {
  if (good)        return 'rank-good';
  if (rank > 20)   return 'rank-bad';
  return 'rank-mid';
}

// Converts hex color (#RRGGBB) to an [r, g, b] array
function hexToRgbParts(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

// Returns true if a hex color is "light" (for contrast decisions)
function isLightColor(hex) {
  const [r, g, b] = hexToRgbParts(hex);
  // Perceived luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55;
}

// Maps a position abbreviation to a full readable label
function positionLabel(pos) {
  const map = {
    QB:  'Quarterback',
    OT:  'Offensive Tackle',
    CB:  'Cornerback',
    WR:  'Wide Receiver',
    IOL: 'Interior Offensive Line',
    S:   'Safety',
    TE:  'Tight End',
    LB:  'Linebacker',
    RB:  'Running Back',
    DL:  'Defensive Line',
    EDGE:'Edge Rusher',
    DE:  'Defensive End',
    DT:  'Defensive Tackle',
    OG:  'Offensive Guard',
    C:   'Center',
    K:   'Kicker',
    P:   'Punter'
  };
  return map[pos] || pos;
}
