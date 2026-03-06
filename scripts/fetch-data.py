#!/usr/bin/env python3
"""
NFL Draft Hub — Data Fetch Script
Run: python3 scripts/fetch-data.py

Fetches real 2023 NFL season stats from ESPN's public API for the 4 featured teams
and outputs a summary. Use this to verify or refresh data before updating data.js.

Requires: Python 3.6+, no external dependencies.
"""

import urllib.request
import urllib.error
import json
import csv
import os
import ssl

# Disable SSL verification for environments with certificate issues
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

FEATURED_TEAMS = [
    { 'id': 'patriots', 'csvAbbr': 'NWE', 'espnAbbr': 'NE',  'espnId': 17, 'name': 'Patriots', 'city': 'New England' },
    { 'id': 'steelers', 'csvAbbr': 'PIT', 'espnAbbr': 'PIT', 'espnId': 23, 'name': 'Steelers', 'city': 'Pittsburgh' },
    { 'id': 'chiefs',   'csvAbbr': 'KAN', 'espnAbbr': 'KC',  'espnId': 12, 'name': 'Chiefs',   'city': 'Kansas City' },
    { 'id': 'bills',    'csvAbbr': 'BUF', 'espnAbbr': 'BUF', 'espnId': 2,  'name': 'Bills',    'city': 'Buffalo'     },
]

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
        return json.loads(r.read())

def parse_csv(filepath):
    with open(filepath, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)

    # ── 1. Standings ────────────────────────────────────────────────────────
    print("Fetching 2023 NFL standings...")
    standings_url = 'https://site.api.espn.com/apis/v2/sports/football/nfl/standings?season=2023&type=2'
    standings = fetch_json(standings_url)

    records = {}
    for conf in standings.get('children', []):
        for entry in conf.get('standings', {}).get('entries', []):
            team = entry.get('team', {})
            abbr = team.get('abbreviation', '')
            stats = {s['name']: s.get('value', 0) for s in entry.get('stats', [])}
            records[abbr] = {
                'record':  f"{int(stats.get('wins',0))}-{int(stats.get('losses',0))}",
                'ptsDiff': int(stats.get('pointDifferential', 0)),
                'seed':    int(stats.get('playoffSeed', 0)),
            }

    # ── 2. Team statistics ───────────────────────────────────────────────────
    print("Fetching per-team statistics...")
    BASE = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/types/2/teams'
    KEY_STATS = {
        'passing': ['totalPoints', 'totalPointsPerGame', 'yardsPerGame', 'netPassingYards',
                    'netPassingYardsPerGame', 'QBRating', 'interceptions', 'sacks'],
        'rushing': ['rushingYards', 'rushingYardsPerGame'],
        'defensive': ['sacks'],
        'defensiveInterceptions': ['interceptions'],
        'general': ['fumblesLost', 'fumblesRecovered'],
    }

    team_stats = {}
    for team in FEATURED_TEAMS:
        espn_id = team['espnId']
        abbr = team['espnAbbr']
        url = f'{BASE}/{espn_id}/statistics'
        try:
            data = fetch_json(url)
            cats = data.get('splits', {}).get('categories', [])
            extracted = {}
            for cat in cats:
                name = cat.get('name', '')
                if name in KEY_STATS:
                    for s in cat.get('stats', []):
                        if s.get('name') in KEY_STATS[name]:
                            key = f"{name}.{s['name']}"
                            extracted[key] = {
                                'value': s.get('displayValue', ''),
                                'rank': s.get('rank'),
                            }
            team_stats[abbr] = extracted
        except Exception as e:
            print(f"  Warning: could not fetch stats for {abbr}: {e}")
            team_stats[abbr] = {}

    # ── 3. CSV parsing ───────────────────────────────────────────────────────
    csv_path = os.path.join(project_dir, '2024-nfl-draft.csv')
    picks = parse_csv(csv_path)
    print(f"Parsed {len(picks)} draft picks from CSV")

    # ── 4. Output summary ────────────────────────────────────────────────────
    print("\n" + "="*60)
    for team in FEATURED_TEAMS:
        abbr    = team['espnAbbr']
        csvAbbr = team['csvAbbr']
        rec     = records.get(abbr, {})
        stats   = team_stats.get(abbr, {})
        team_picks = [p for p in picks if p['Team'] == csvAbbr]

        # calculate points allowed
        pts_for   = int(stats.get('passing.totalPoints', {}).get('value', '0').replace(',', '') or 0)
        pts_diff  = rec.get('ptsDiff', 0)
        pts_against = pts_for - pts_diff

        print(f"\n{team['city']} {team['name']} ({abbr})")
        print(f"  Record:          {rec.get('record','?')} (Seed #{rec.get('seed','?')})")
        print(f"  Points Scored:   {pts_for} (rank {stats.get('passing.totalPoints',{}).get('rank','?')})")
        print(f"  Points Allowed:  {pts_against} (calculated)")
        print(f"  Yards/Game:      {stats.get('passing.yardsPerGame',{}).get('value','?')} (rank {stats.get('passing.yardsPerGame',{}).get('rank','?')})")
        print(f"  QB Rating:       {stats.get('passing.QBRating',{}).get('value','?')} (rank {stats.get('passing.QBRating',{}).get('rank','?')})")
        print(f"  INTs thrown:     {stats.get('passing.interceptions',{}).get('value','?')} (rank {stats.get('passing.interceptions',{}).get('rank','?')})")
        print(f"  INTs by D:       {stats.get('defensiveInterceptions.interceptions',{}).get('value','?')} (rank {stats.get('defensiveInterceptions.interceptions',{}).get('rank','?')})")
        print(f"  Def Sacks:       {stats.get('defensive.sacks',{}).get('value','?')} (rank {stats.get('defensive.sacks',{}).get('rank','?')})")
        print(f"  Passing Yards:   {stats.get('passing.netPassingYards',{}).get('value','?')} (rank {stats.get('passing.netPassingYards',{}).get('rank','?')})")
        print(f"  Rushing Yards:   {stats.get('rushing.rushingYards',{}).get('value','?')} (rank {stats.get('rushing.rushingYards',{}).get('rank','?')})")
        print(f"  Draft picks ({len(team_picks)}):")
        for p in team_picks:
            print(f"    R{p['Round']}P{p['Pick']}: {p['Player']} ({p['Position']}) - {p['College/Univ']}")

if __name__ == '__main__':
    main()
