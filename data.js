/* ============================================================
   NFL Draft Hub 2026 — Team Data
   All content is illustrative placeholder data for demo purposes.
   Player names, statistics, and projections are fictional.
   ============================================================ */

const TEAMS = [

  /* ----------------------------------------------------------
     New England Patriots — Pick #4
     ---------------------------------------------------------- */
  {
    id: "patriots",
    name: "Patriots",
    city: "New England",
    abbreviation: "NE",
    draftPick: 4,
    colors: {
      primary:    "#002244",
      secondary:  "#C60C30",
      accent:     "#C60C30",
      primaryRgb: "0, 34, 68",
      accentRgb:  "198, 12, 48"
    },
    season: {
      record: "4-13",
      summary: "The 2025 season marked the third consecutive year of rebuilding for New England following the departure of Bill Belichick. The team cycled through two starting quarterbacks, struggled to generate consistent offense in the red zone, and surrendered significant yardage through opposing passing attacks. While flashes of young talent emerged at receiver and on the defensive line, the overall product on the field reflected a roster still in the early stages of a complete overhaul. The Patriots finished last in the AFC East, securing the fourth overall pick in the 2026 NFL Draft — their highest selection in over two decades — and enter the offseason with critical decisions ahead at the most important position in football.",
      stats: [
        { label: "Win/Loss Record",       value: "4–13",  rank: 30, good: false },
        { label: "Offensive Rank",         value: "27th",  rank: 27, good: false },
        { label: "Defensive Rank",         value: "22nd",  rank: 22, good: false },
        { label: "Points Scored",          value: "278",   rank: 28, good: false },
        { label: "Points Allowed",         value: "391",   rank: 24, good: false },
        { label: "Turnover Differential",  value: "–11",   rank: 30, good: false }
      ],
      strengths: [
        "Young pass rushers showing genuine development — 3rd-year DE averaged 8.5 sacks",
        "Promising slot receiver with strong yards-after-catch numbers in limited starts",
        "Strong draft capital: multiple top-50 picks across 2026 and 2027",
        "Clean salary cap situation with significant space to add free agents"
      ],
      weaknesses: [
        "Quarterback position is completely unsettled — no franchise answer on the current roster",
        "Offensive line allowed 54 sacks, worst in the conference",
        "Red zone offense converted at 48%, ranking 29th in the league",
        "Secondary gave up 4,100 passing yards; below-average coverage metrics league-wide",
        "Special teams were consistently poor, costing meaningful field position in close games"
      ]
    },
    needs: [
      {
        position: "QB",
        priority: "High",
        description: "The most urgent need on the roster. New England has not had a franchise quarterback since 2019. Both starters this season posted passer ratings below 82.0 and combined for 21 interceptions. This fourth overall pick is almost certainly used here — or leveraged in a trade to move up for the top QB in the class."
      },
      {
        position: "OT",
        priority: "High",
        description: "The offensive tackle position was a liability all season. The left side allowed double-digit sacks and the right tackle spent 10 games on injured reserve. A long-term starting solution at left tackle is essential to protecting any investment made at quarterback."
      },
      {
        position: "CB",
        priority: "Medium",
        description: "The starting cornerback room lacks a true number-one cover corner. Opposing offenses consistently targeted the outside alignment for explosive plays. Adding a press-capable boundary corner would address the defense's most-exploited vulnerability."
      },
      {
        position: "WR",
        priority: "Medium",
        description: "While slot receiver talent exists, there is no legitimate outside vertical threat on the depth chart. A receiver who can win downfield and create separation on contested routes would open the offense dramatically and complement the developing interior weapons."
      },
      {
        position: "IOL",
        priority: "Low",
        description: "Interior offensive line depth is thin beyond the starters. A versatile guard/center prospect in the mid-rounds would provide developmental depth, competition, and insurance given the team's recent injury history up front."
      }
    ],
    prospects: [
      {
        name: "Caleb Maddox",
        position: "QB",
        school: "Tennessee",
        projectedRound: "1st Round – Top 5",
        summary: "Maddox is a prototypical pocket passer at 6'4\" with exceptional arm strength and one of the cleanest release mechanics in this class. He posted a 34-to-7 touchdown-to-interception ratio in his final collegiate season operating under center in a pro-style system. His ability to process pre-snap and deliver accurate timing throws to all three levels makes him the consensus top quarterback available. New England would be selecting him as the cornerstone of their franchise rebuild."
      },
      {
        name: "Jordan Ashby",
        position: "OT",
        school: "Penn State",
        projectedRound: "1st Round – Top 15",
        summary: "A two-year starter at left tackle who combines rare athleticism with advanced technique in pass protection. Ashby allowed only three sacks across his final season despite regularly facing elite edge rushers in the Big Ten. His footwork and hand placement are widely considered NFL-ready, and he could step in as a Week 1 starter to directly address the offensive tackle crisis that undermined the entire offense in 2025."
      },
      {
        name: "Marcus Telvin",
        position: "CB",
        school: "Georgia",
        projectedRound: "1st Round – Late First",
        summary: "Telvin is an aggressive boundary corner who excels in press coverage and has the length — 6'1\", 32.5-inch arms — to disrupt timing routes at the line of scrimmage. He recorded six interceptions and fifteen pass breakups across two seasons as Georgia's primary outside corner. His physicality and ball-hawking instincts fit the defensive identity New England has historically built their best teams around."
      },
      {
        name: "Devon Priestley",
        position: "WR",
        school: "Ohio State",
        projectedRound: "2nd Round",
        summary: "Priestley is a long-striding vertical threat at 6'2\" who averaged 18.4 yards per reception in his junior season. He wins with route precision on deep crossers and has the catch radius to high-point contested balls. Adding Priestley in the second round would give New England a genuine downfield weapon to complement their developing slot receiver and create space for a new quarterback to operate in."
      }
    ]
  },

  /* ----------------------------------------------------------
     Las Vegas Raiders — Pick #13
     ---------------------------------------------------------- */
  {
    id: "raiders",
    name: "Raiders",
    city: "Las Vegas",
    abbreviation: "LV",
    draftPick: 13,
    colors: {
      primary:    "#000000",
      secondary:  "#2a2a2a",
      accent:     "#A5ACAF",
      primaryRgb: "0, 0, 0",
      accentRgb:  "165, 172, 175"
    },
    season: {
      record: "7-10",
      summary: "The 2025 Raiders season was a story of promise undercut by inconsistency. The team opened 4-2 and generated real optimism in the AFC West, but a rash of injuries to the offensive line and a turnover-prone November stretch derailed any playoff ambitions. The defense showed genuine improvement under its second-year coordinator, ranking in the top ten for pressure rate as the pass rush came into its own. The biggest concern heading into the offseason is a wide receiver room that ranked among the league's least productive in yards per route run, and continued volatility at the quarterback position that will likely force a decision in the first round.",
      stats: [
        { label: "Win/Loss Record",       value: "7–10",  rank: 18, good: false },
        { label: "Offensive Rank",         value: "18th",  rank: 18, good: false },
        { label: "Defensive Rank",         value: "11th",  rank: 11, good: true  },
        { label: "Points Scored",          value: "318",   rank: 19, good: false },
        { label: "Points Allowed",         value: "334",   rank: 13, good: true  },
        { label: "Turnover Differential",  value: "–4",    rank: 22, good: false }
      ],
      strengths: [
        "Pass rush ranked 8th in pressure rate, anchored by a proven veteran edge rusher",
        "Run game showed flashes — 1,200-yard back provides a reliable ground foundation",
        "Second-year linebacker developing into a legitimate play-caller and coverage defender",
        "Front office has stockpiled mid-round picks via recent trades to add depth"
      ],
      weaknesses: [
        "Wide receiver corps ranked 28th in yards per route run — no viable WR1 on the roster",
        "Quarterback play was volatile: 17 touchdowns paired with 15 interceptions",
        "Offensive line depth collapsed under injuries, sending four starters to injured reserve",
        "Red zone defense allowed touchdowns on 67% of opponent trips inside the 20 — worst in the AFC",
        "Third-down conversion rate of 34% ranked 27th in the league, stalling drives consistently"
      ]
    },
    needs: [
      {
        position: "WR",
        priority: "High",
        description: "The most glaring offensive deficiency on the roster. Las Vegas has no receiver capable of consistently winning outside against man coverage or creating separation at the top of routes. A genuine WR1 would transform the entire offensive system and take pressure off play-action and the run game."
      },
      {
        position: "QB",
        priority: "High",
        description: "Despite a serviceable win total, the current starter's turnover issues represent a long-term ceiling problem. Whether the Raiders address this at pick 13 depends on their evaluation of available talent, but a developmental option in later rounds is a near-certainty regardless of the first-round decision."
      },
      {
        position: "OT",
        priority: "Medium",
        description: "The injury-ravaged offensive line needs an infusion of quality at right tackle. The current starter is on the final year of his contract and missed six games in 2025. Drafting a developmentally ready tackle would shore up depth and provide long-term continuity at a position with significant turnover risk."
      },
      {
        position: "S",
        priority: "Medium",
        description: "The safety position has been a revolving door for multiple seasons. The team needs a high-range single-high safety who can anchor the backend and provide the coverage reliability that allows the pass rush to operate without constantly worrying about giving up big plays over the top."
      },
      {
        position: "TE",
        priority: "Low",
        description: "The tight end room lacks a receiving weapon. The current starter is valued primarily as a blocker and offers minimal threat in the passing game. Adding a move tight end in the mid-to-late rounds who can serve as a viable seam threat would open up a dimension the offense currently cannot threaten."
      }
    ],
    prospects: [
      {
        name: "Tyrese Calloway",
        position: "WR",
        school: "LSU",
        projectedRound: "1st Round – Top 15",
        summary: "Calloway is a 6'1\" outside receiver with elite short-area quickness and the contested-catch ability to win against physical press coverage. He led the SEC in receiving yards in his final season and shows advanced route running for a player his age, selling releases with precise footwork at the stem. His arrival would immediately address Las Vegas's most critical offensive need and give the quarterback a reliable option on third downs and in the red zone."
      },
      {
        name: "Darius Fontenot",
        position: "S",
        school: "Alabama",
        projectedRound: "1st Round – Late First",
        summary: "Fontenot is a true single-high safety who combines elite deep-field range with the ball skills to generate turnovers. He recorded four interceptions and twelve pass breakups in his senior season while maintaining disciplined positioning. His ability to erase vertical threats would give Las Vegas's improving pass rush the freedom to attack without constantly worrying about giving up explosive plays over the top."
      },
      {
        name: "Cole Vanderburg",
        position: "OT",
        school: "Michigan",
        projectedRound: "2nd Round",
        summary: "Vanderburg is a plus athlete at the tackle position who played both left and right side during his collegiate career, providing the versatility the Raiders' injury-plagued line desperately needs. His run blocking is technically sound and his punch in pass protection is consistently strong. At 6'5\" and 310 pounds, he has the frame to handle power rushers and the lateral quickness to manage speed-to-power counter moves in the NFL."
      },
      {
        name: "Elijah Morrow",
        position: "TE",
        school: "Notre Dame",
        projectedRound: "3rd Round",
        summary: "Morrow is a move tight end at 6'4\" with natural hands and a smooth route tree in the short-to-intermediate area. He posted a 4.62 forty at the combine and has the athleticism to align in the slot and create mismatches against linebackers in coverage. Adding Morrow in the third round would cost-effectively solve the receiving tight end gap without spending a premium pick on the position."
      }
    ]
  },

  /* ----------------------------------------------------------
     Dallas Cowboys — Pick #24
     ---------------------------------------------------------- */
  {
    id: "cowboys",
    name: "Cowboys",
    city: "Dallas",
    abbreviation: "DAL",
    draftPick: 24,
    colors: {
      primary:    "#003594",
      secondary:  "#041E42",
      accent:     "#C0C8D0",
      primaryRgb: "0, 53, 148",
      accentRgb:  "192, 200, 208"
    },
    season: {
      record: "11-6",
      summary: "The 2025 Cowboys were one of the NFC's more resilient teams, navigating early-season injuries to key skill positions with strong offensive line play and a defense that ranked in the top half of the league in most major categories. A mid-season trade for a veteran wide receiver stabilized the passing game, and the team rode a six-game winning streak to secure the fourth seed in the NFC. Their first-round playoff exit was a familiar outcome — a strong regular season undermined by offensive inconsistency when elimination was on the line. At pick 24, Dallas is targeting high-upside developmental players to address the position group attrition that threatens their window over the next two to three seasons.",
      stats: [
        { label: "Win/Loss Record",       value: "11–6",  rank: 7,  good: true  },
        { label: "Offensive Rank",         value: "9th",   rank: 9,  good: true  },
        { label: "Defensive Rank",         value: "14th",  rank: 14, good: true  },
        { label: "Points Scored",          value: "382",   rank: 8,  good: true  },
        { label: "Points Allowed",         value: "317",   rank: 14, good: true  },
        { label: "Turnover Differential",  value: "+6",    rank: 9,  good: true  }
      ],
      strengths: [
        "Offensive line is among the three best units in the NFC — allowed only 26 sacks all season",
        "Established WR1 with back-to-back 1,200-yard seasons provides a reliable top target",
        "Veteran quarterback in prime years, top-12 passer rating for the third consecutive season",
        "Defensive line depth is elite — four rotational linemen combined for double-digit sacks"
      ],
      weaknesses: [
        "Linebacker corps is aging — two starters will be 30+ entering the 2026 season",
        "Cornerback depth is thin beyond the starter; CB2 spot was a consistent liability late in games",
        "Running back situation lacks a three-down option after the starter tore his ACL in Week 14",
        "Playoff offense has averaged only 17 points across two postseason appearances in three years",
        "Tight end production declined; starter is on the final year of his contract with no successor ready"
      ]
    },
    needs: [
      {
        position: "LB",
        priority: "High",
        description: "Both starting linebackers are entering the final phases of their careers and the team has no viable succession plan in place. A coverage-capable linebacker who can handle modern spread formations is the most important positional investment Dallas can make to keep the defense competitive over the next three to five seasons."
      },
      {
        position: "RB",
        priority: "High",
        description: "The ACL tear to the primary starter creates genuine urgency at running back. While a committee approach is workable short-term, Dallas's offensive identity requires a reliable three-down runner to take pressure off the passing game and maintain the time-of-possession advantages they built their season around."
      },
      {
        position: "CB",
        priority: "Medium",
        description: "The CB2 spot was repeatedly exposed in both the regular season and postseason. Drafting a corner who can compete immediately and develop into a long-term CB1 as the current starter ages would future-proof the secondary before the problem becomes a crisis."
      },
      {
        position: "TE",
        priority: "Medium",
        description: "With the veteran starter entering free agency, Dallas needs a succession plan at tight end. A receiving-first option who can develop behind the current starter and take over the role in year two would preserve the seam-attack dimension that has been central to their passing offense."
      },
      {
        position: "DL",
        priority: "Low",
        description: "While the defensive line is currently elite, two rotational contributors are on expiring contracts. Adding a developmental interior rusher now prevents a potential depth vacuum two years from now when those pieces may depart in free agency."
      }
    ],
    prospects: [
      {
        name: "Isaiah Drummond",
        position: "LB",
        school: "Michigan State",
        projectedRound: "1st Round – Late First",
        summary: "Drummond is the most complete linebacker in this class, offering above-average run-stopping instincts alongside genuine coverage ability in both zone and man assignments. He led all Power Four linebackers in pass breakups and recorded only two missed tackles across his final season. His athleticism — 4.53 forty, 38\" vertical — means he can handle tight ends and running backs without a coverage disadvantage, making him the ideal answer to Dallas's aging linebacker core."
      },
      {
        name: "Malik Broussard",
        position: "RB",
        school: "Georgia",
        projectedRound: "2nd Round",
        summary: "Broussard is a powerful, patient runner at 5'11\" and 220 pounds who averaged 5.4 yards per carry on zone-blocked schemes — exactly the system Dallas employs. He is a reliable pass-catcher out of the backfield and has demonstrated the ability to pick up blitzes in pass protection, making him a genuine three-down option. His fit with Dallas's scheme and offensive line is considered one of the cleaner position-team matches in the 2026 draft class."
      },
      {
        name: "Trevon Harland",
        position: "CB",
        school: "Clemson",
        projectedRound: "2nd Round",
        summary: "Harland has the size-speed combination — 6'0\", 4.43 forty — that NFL teams covet at outside cornerback. He is still developing technically but his instincts in off-coverage and his ability to mirror receivers in man alignment are already above average. Drafting Harland gives Dallas a player who can compete for playing time immediately and develop into a long-term starter as the current CB1 enters the later stages of his career."
      },
      {
        name: "Nathan Quill",
        position: "TE",
        school: "Stanford",
        projectedRound: "3rd Round",
        summary: "Quill is a technically refined tight end who ran a complete route tree in Stanford's pro-style system and projects cleanly to the NFL receiving role. At 6'5\" and 248 pounds, he provides a large target with reliable hands — he dropped only two passes in his final two collegiate seasons. He would develop behind the current starter for a season before stepping into the lead role, ensuring seamless continuity at a position central to the Cowboys' passing attack."
      }
    ]
  }

]; // end TEAMS
