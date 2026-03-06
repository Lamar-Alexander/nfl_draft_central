/* ============================================================
   NFL Draft Hub 2024 — Application Logic
   ============================================================ */

/* ------------------------------------------------------------
   A. Position filter map
   Maps a team's needPosition string → CSV position codes
   ------------------------------------------------------------ */
const POSITION_FILTER = {
  QB:   ['QB'],
  WR:   ['WR'],
  OL:   ['OL', 'OT', 'G', 'C'],
  TE:   ['TE'],
  DB:   ['DB', 'CB', 'SAF', 'FS'],
  CB:   ['CB', 'DB'],
  SAF:  ['SAF', 'DB', 'FS'],
  EDGE: ['DE', 'OLB', 'DL'],
  LB:   ['LB', 'OLB'],
  DL:   ['DL', 'DT', 'DE'],
  RB:   ['RB'],
};

/* ------------------------------------------------------------
   B. State
   ------------------------------------------------------------ */
let currentTeam = null;
let currentTab  = 'season';

/* ------------------------------------------------------------
   C. Init
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
   D. Navigation
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
   E. Team Color Theming
   ------------------------------------------------------------ */
function applyTeamColors(colors) {
  const root = document.documentElement;
  root.style.setProperty('--team-primary',     colors.primary);
  root.style.setProperty('--team-secondary',   colors.secondary);
  root.style.setProperty('--team-accent',      colors.accent);
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
   F. Event Handlers
   ------------------------------------------------------------ */
function handleTeamCardClick(e) {
  const card = e.target.closest('[data-team-id]');
  if (card) showDashboard(card.dataset.teamId);
}

function handleTabClick(e) {
  const btn = e.target.closest('[data-tab]');
  if (!btn) return;

  currentTab = btn.dataset.tab;

  document.querySelectorAll('#section-tabs [data-tab]').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === currentTab);
  });

  renderActiveTab();
}

/* ------------------------------------------------------------
   G. Landing Render
   ------------------------------------------------------------ */
function renderLanding() {
  const grid = document.getElementById('team-grid');
  grid.innerHTML = TEAMS.map(team => renderTeamCard(team)).join('');
}

function renderTeamCard(team) {
  const [r, g, b] = hexToRgbParts(team.colors.primary);
  const pickLabel = team.draftPick <= 32 ? `Pick #${team.draftPick}` : `R2 Pick #${team.draftPick}`;
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
        <span class="badge pick-badge">${pickLabel}</span>
        <span class="badge" style="background: rgba(${r},${g},${b},0.12); color: rgba(${r},${g},${b},1); border: 1px solid rgba(${r},${g},${b},0.25);">${team.season.record}</span>
        <span class="arrow-icon">→</span>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------
   H. Dashboard Render
   ------------------------------------------------------------ */
function renderDashboard() {
  mountHero(renderHero(currentTeam));
  mountTabs(renderTabs());
  renderActiveTab();
}

function mountHero(html)    { document.getElementById('team-hero').innerHTML    = html; }
function mountTabs(html)    { document.getElementById('section-tabs').innerHTML = html; }
function mountContent(html) {
  const container = document.getElementById('tab-content');
  container.innerHTML = html;
  const panel = container.querySelector('.tab-panel');
  if (panel) {
    panel.classList.remove('tab-panel');
    void panel.offsetWidth;
    panel.classList.add('tab-panel');
  }
}

function renderHero(team) {
  const accentTextClass = isLightColor(team.colors.accent) ? 'badge-silver' : '';
  const pickLabel = team.draftPick <= 32 ? `Pick #${team.draftPick}` : `R2 · Pick #${team.draftPick}`;
  return `
    <div class="hero-inner">
      <div class="hero-abbr">${team.abbreviation}</div>
      <div class="hero-text">
        <div class="hero-city">${team.city}</div>
        <h2 class="hero-name">${team.city} ${team.name}</h2>
        <div class="hero-meta">
          <span class="hero-record">${team.season.record}</span>
          <span class="hero-pick ${accentTextClass}">${pickLabel} · 2024 NFL Draft</span>
        </div>
      </div>
    </div>
  `;
}

function renderTabs() {
  const tabs = [
    { id: 'season', label: 'Season Review', icon: '📊' },
    { id: 'needs',  label: 'Team Needs',    icon: '🎯' },
    { id: 'mock',   label: 'Mock Draft',    icon: '⭐' }
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
  if      (currentTab === 'season') html = renderSeasonTab(currentTeam);
  else if (currentTab === 'needs')  html = renderNeedsTab(currentTeam);
  else if (currentTab === 'mock')   html = renderMockDraftTab(currentTeam);
  mountContent(html);
}

/* ------------------------------------------------------------
   I. Season Review Tab
   ------------------------------------------------------------ */
function renderSeasonTab(team) {
  const statsHtml = team.season.stats.map(stat => {
    const rankClass = getRankClass(stat.rank, stat.good);
    return `
      <div class="stat-card">
        <span class="stat-label">${stat.label}</span>
        <span class="stat-value">${stat.value}</span>
        <span class="rank-badge ${rankClass}">Rank #${stat.rank}</span>
        ${stat.context ? `<span class="stat-context">${stat.context}</span>` : ''}
      </div>
    `;
  }).join('');

  const strengthsHtml = team.season.strengths.map(s => `<li>${s}</li>`).join('');
  const weaknessesHtml = team.season.weaknesses.map(w => `<li>${w}</li>`).join('');

  return `
    <div class="tab-panel">
      <p class="section-heading">2023 Season Overview</p>
      <p class="section-sub">${team.city} ${team.name} · ${team.season.record} · ${team.season.playoffResult}</p>

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
   J. Team Needs Tab
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
          ${need.scarcity ? `<p class="need-scarcity">2024 class depth: ${need.scarcity}</p>` : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="tab-panel">
      <p class="section-heading">Key Positional Needs</p>
      <p class="section-sub">Heading into the 2024 Draft, ranked by priority</p>
      <div class="needs-list">${needsHtml}</div>
    </div>
  `;
}

/* ------------------------------------------------------------
   K. Mock Draft Tab
   ------------------------------------------------------------ */
function renderMockDraftTab(team) {
  const accentTextClass = isLightColor(team.colors.accent) ? 'badge-silver' : '';

  const picksHtml = team.picks.map(pick => {
    const dayGrade   = pick.round === 1 ? 'Day 1' : pick.round <= 3 ? 'Day 2' : 'Day 3';
    const dayClass   = pick.round === 1 ? 'day-1' : pick.round <= 3 ? 'day-2' : 'day-3';
    const matchPos   = POSITION_FILTER[pick.needPosition] || [pick.needPosition];
    const prospects  = DRAFT_CLASS
      .filter(p => matchPos.includes(p.position))
      .sort((a, b) => a.pick - b.pick)
      .slice(0, 3);

    const prospectsHtml = prospects.length
      ? prospects.map(p => {
          const pDay      = p.round === 1 ? 'Day 1' : p.round <= 3 ? 'Day 2' : 'Day 3';
          const pDayClass = p.round === 1 ? 'day-1' : p.round <= 3 ? 'day-2' : 'day-3';
          return `
            <div class="mock-prospect">
              <div class="mock-prospect-pos ${accentTextClass}">${p.position}</div>
              <div class="mock-prospect-info">
                <span class="mock-prospect-name">${p.player}</span>
                <span class="mock-prospect-college">${p.college || 'Unknown'}</span>
              </div>
              <span class="mock-day-badge ${pDayClass}">${pDay}</span>
            </div>
          `;
        }).join('')
      : `<p class="mock-no-prospects">No prospects found for this position in the 2024 class.</p>`;

    return `
      <div class="mock-pick-row">
        <div class="mock-pick-header">
          <div class="mock-pick-label">
            <span class="mock-round">Round ${pick.round} · Pick #${pick.pick}</span>
            <span class="mock-day-badge ${dayClass}">${dayGrade}</span>
          </div>
          <div class="mock-pick-need">
            Addressing: <strong>${positionLabel(pick.needPosition)}</strong>
          </div>
        </div>
        <div class="mock-prospects-list">
          ${prospectsHtml}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="tab-panel">
      <p class="section-heading">Mock Draft</p>
      <p class="section-sub">Prospect fits for ${team.city} at each of their ${team.picks.length} picks</p>
      <div class="mock-draft-list">
        ${picksHtml}
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------
   L. Utility Functions
   ------------------------------------------------------------ */
function getRankClass(rank, good) {
  if (good)       return 'rank-good';
  if (rank > 20)  return 'rank-bad';
  return 'rank-mid';
}

function hexToRgbParts(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

function isLightColor(hex) {
  const [r, g, b] = hexToRgbParts(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

function positionLabel(pos) {
  const map = {
    QB:   'Quarterback',
    OL:   'Offensive Line',
    OT:   'Offensive Tackle',
    WR:   'Wide Receiver',
    TE:   'Tight End',
    CB:   'Cornerback',
    DB:   'Defensive Back',
    SAF:  'Safety',
    LB:   'Linebacker',
    OLB:  'Outside Linebacker',
    EDGE: 'Edge Rusher',
    DL:   'Defensive Line',
    DT:   'Defensive Tackle',
    DE:   'Defensive End',
    RB:   'Running Back',
    IOL:  'Interior Offensive Line',
    G:    'Guard',
    C:    'Center',
    FS:   'Free Safety',
    K:    'Kicker',
    P:    'Punter',
  };
  return map[pos] || pos;
}
