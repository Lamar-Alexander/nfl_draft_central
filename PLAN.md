# NFL Draft Hub — Iteration Plan
**Focus**: Replace synthetic 2026 data with real 2023-2024 season data and the 2024 draft prospect class.

---

## Goal

Reframe the site as a **pre-draft preparation tool frozen in April 2024** — as if the user is preparing for the 2024 NFL Draft using the actual 2023 regular season results. The 2024 draft CSV provides the prospect pool. Each team gets a **mock draft** showing who they *could* have taken at each of their real pick slots based on fit — not revealing who they actually selected.

**Target audience**: Draft enthusiasts who want deep analysis — scheme fit, positional scarcity, cap context, and statistical reasoning.

---

## Scope: 4 Teams

This iteration features exactly 4 teams. Additional teams can be added in future iterations.

| Team | Abbreviation (CSV) |
|---|---|
| New England Patriots | NWE |
| Pittsburgh Steelers | PIT |
| Kansas City Chiefs | KAN |
| Buffalo Bills | BUF |

---

## Framing

| Element | Current (synthetic) | Target (real data) |
|---|---|---|
| Season | Fictional 2025 | Actual 2023 NFL season |
| Draft year | 2026 (fictional) | 2024 (real prospect class) |
| Prospect data | Fictional names/stats | Real players from `2024-nfl-draft.csv` |
| Site title | "NFL Draft Central 2026" | "NFL Draft Central 2024" |
| Team scope | All 32 teams (synthetic) | 4 featured teams |
| Disclaimer | Placeholder warning | Update to reflect real-data sourcing |

---

## Data Strategy

### 1. Season Stats — ESPN Free API (Build-Time Fetch)

Use ESPN's unofficial public API to pull real 2023 NFL season data. Since this is a static site, we write a **Node.js build script** (`scripts/fetch-data.js`) that:
- Fetches data once from ESPN's endpoints for the 4 teams
- Merges it with the CSV-based prospect data
- Outputs a regenerated `data.js`

This avoids runtime CORS/reliability concerns and keeps the site fully static.

**Key ESPN endpoints (no API key required):**
```
# Standings / records (2023 season)
https://site.api.espn.com/apis/site/v2/sports/football/nfl/standings?season=2023

# Team list and IDs
https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams

# Season stats per team (offensive/defensive rankings)
https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams/{espnTeamId}/statistics
```

**Stats to capture per team:**
- Win/loss record, points for/against
- Offensive rank (yards, points scored)
- Defensive rank (yards allowed, points allowed)
- Turnover differential
- Passing/rushing breakdown where available

### 2. Draft Prospect Pool — CSV Parsing

**File**: `2024-nfl-draft.csv`
**Schema**: `Round, Pick, Team, Player, Position, College/Univ`

The full CSV is parsed into a shared `draftClass` array. The `Team` column is **not used** for display — every player is treated as an available prospect in the pre-draft pool.

The `Round` and `Pick` fields are used to:
1. Determine each featured team's actual pick slots (e.g., NWE had pick #3 in Round 1)
2. Assign a draft grade label to each prospect (Day 1 / Day 2 / Day 3)

### 3. Positional Needs — Curated (Real-Season-Informed)

ESPN's API does not expose pre-draft needs analysis. This data is **curated based on real 2023 season outcomes** for the 4 featured teams. Each team gets:
- 3–5 positional needs, ranked by priority (High / Medium / Low)
- A narrative explanation referencing real 2023 performance indicators
- A positional scarcity note for the 2024 class

---

## Content Sections (All Four Active)

### Tab 1 — Season Recap
- W-L record, conference/division finish, playoff result
- 2–3 sentence narrative of how the 2023 season played out (curated)
- Strength and weakness bullet points (3–5 each, referencing real stats)

### Tab 2 — Key Stats
- Stat cards: Offensive rank, Defensive rank, Points Scored, Points Allowed, Turnover Differential, plus 1–2 position-specific highlights
- Each stat shows: value, league rank, and a good/bad indicator
- Each stat includes a short **context note** for draft enthusiasts (e.g., "27th in red zone TD% — address at WR or TE")

### Tab 3 — Positional Needs
- Ranked list (High → Medium → Low) for 3–5 positions
- Each entry includes:
  - Position label and priority badge
  - 2–4 sentence explanation citing real 2023 evidence
  - Scarcity note: is this position deep or thin in the 2024 class?

### Tab 4 — Mock Draft
Replaces the previous "Top Prospects" tab. Shows a **team-specific mock draft** using the team's actual 2024 pick slots.

**Logic**:
1. Look up the team's real picks from the CSV by team abbreviation (Round + Pick number)
2. For each pick slot, identify which of the team's positional needs it should address — prioritizing higher needs in earlier rounds
3. Recommend 2–3 prospects from the pool whose `Position` matches the target need at that pick
4. Prospects are surfaced from the full pool; they may or may not have been available in reality at that slot (this is mock draft territory — not a simulation of actual draft board order)
5. The actual player who was drafted there is **not revealed**

**Pick slot display:**
```
Round 1, Pick #3 · Addressing: QB (High need)
  → Prospect A · QB · School  [Day 1]
  → Prospect B · QB · School  [Day 1]
```

**Day grade mapping:**
| Round | Grade |
|---|---|
| 1 | Day 1 |
| 2–3 | Day 2 |
| 4–7 | Day 3 |

---

## File Changes

### New: `scripts/fetch-data.js`
Node.js script (run as `node scripts/fetch-data.js`) that:
1. Fetches ESPN API endpoints for the 4 featured teams
2. Parses `2024-nfl-draft.csv` into a `draftClass` array
3. Writes `data.js` with the real-data schema

### Modified: `data.js`
- Replace all synthetic team entries with the 4 real teams + real 2023 data
- Add top-level `DRAFT_CLASS` constant (all 2024 prospects, team-agnostic)
- Each team entry keeps existing schema; `prospects` array removed in favor of `picks` array (see below)

**New `picks` field per team** (replaces `prospects`):
```js
picks: [
  { round: 1, pick: 3, needPosition: "QB" },
  { round: 2, pick: 34, needPosition: "OT" },
  // ...
]
```
The `app.js` mock draft logic uses this to look up matching prospects from `DRAFT_CLASS`.

### Modified: `app.js`
- Remove static prospect rendering; add mock draft tab renderer
- Mock draft logic: for each pick in `team.picks`, filter `DRAFT_CLASS` by `position === needPosition`, sort by pick number ascending (best prospects first), take top 2–3
- Add Day 1/2/3 grade label helper
- Update site title/year references (2026 → 2024)
- Team grid renders only the 4 featured teams

### Modified: `index.html`
- Update title tag and visible year references
- Update disclaimer text

---

## Implementation Phases

### Phase 1 — Data Infrastructure
1. Write `scripts/fetch-data.js`
2. Verify ESPN API endpoints return usable data for all 4 teams
3. Parse CSV and produce `DRAFT_CLASS` array with correct schema

### Phase 2 — Curated Team Layer
4. For each of the 4 teams: curate 2023 season narrative, strengths/weaknesses, positional needs with context notes
5. Map each team's real 2024 pick slots from CSV → `picks` array with `needPosition` assignments
6. Merge all data into final `data.js`

### Phase 3 — UI Wiring
7. Update `app.js` with mock draft renderer and prospect filtering logic
8. Update team grid to show only 4 teams
9. Update year references throughout

### Phase 4 — QA
10. Spot-check stats for all 4 teams against known sources
11. Verify mock draft surfaces plausible fits at each pick slot
12. Confirm Day grade labels and need assignments are correct

---

## Open Questions

- **ESPN API reliability**: If the stats endpoint returns incomplete data for any team, fall back to manually curated values for those stats.
- **Pick-to-need mapping**: Assigning a `needPosition` to each pick requires editorial judgment (e.g., if KC had a 2nd round pick, which of their needs should it address?). This is curated during Phase 2.
- **Prospect pool depth at thin positions**: Some teams may have needs at positions with few prospects in the 2024 class. The mock draft should surface what's available and note scarcity.
