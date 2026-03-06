/* ============================================================
   NFL Draft Hub 2024 — Data
   Season stats sourced from ESPN's public API (2023 NFL regular season).
   Draft prospect data sourced from the 2024 NFL Draft class.
   Positional needs, narratives, and mock draft assignments are
   editorially curated based on real 2023 season outcomes.
   ============================================================ */

/* ------------------------------------------------------------
   DRAFT_CLASS — All 257 picks from the 2024 NFL Draft
   Used as the prospect pool for mock draft recommendations.
   Team assignments are intentionally omitted (pre-draft framing).
   ------------------------------------------------------------ */
const DRAFT_CLASS = [
  { round: 1, pick: 1,   player: 'Caleb Williams',           position: 'QB',  college: 'USC' },
  { round: 1, pick: 2,   player: 'Jayden Daniels',           position: 'QB',  college: 'LSU' },
  { round: 1, pick: 3,   player: 'Drake Maye',               position: 'QB',  college: 'North Carolina' },
  { round: 1, pick: 4,   player: 'Marvin Harrison Jr.',      position: 'WR',  college: 'Ohio St.' },
  { round: 1, pick: 5,   player: 'Joe Alt',                  position: 'OL',  college: 'Notre Dame' },
  { round: 1, pick: 6,   player: 'Malik Nabers',             position: 'WR',  college: 'LSU' },
  { round: 1, pick: 7,   player: 'JC Latham',               position: 'OL',  college: 'Alabama' },
  { round: 1, pick: 8,   player: 'Michael Penix',            position: 'QB',  college: 'Washington' },
  { round: 1, pick: 9,   player: 'Rome Odunze',              position: 'WR',  college: 'Washington' },
  { round: 1, pick: 10,  player: 'J.J. McCarthy',            position: 'QB',  college: 'Michigan' },
  { round: 1, pick: 11,  player: 'Olumuyiwa Fashanu',        position: 'OL',  college: 'Penn St.' },
  { round: 1, pick: 12,  player: 'Bo Nix',                   position: 'QB',  college: 'Oregon' },
  { round: 1, pick: 13,  player: 'Brock Bowers',             position: 'TE',  college: 'Georgia' },
  { round: 1, pick: 14,  player: 'Taliese Fuaga',            position: 'OL',  college: 'Oregon St.' },
  { round: 1, pick: 15,  player: 'Laiatu Latu',              position: 'DL',  college: 'UCLA' },
  { round: 1, pick: 16,  player: 'Byron Murphy',             position: 'DL',  college: 'Texas' },
  { round: 1, pick: 17,  player: 'Dallas Turner',            position: 'LB',  college: 'Alabama' },
  { round: 1, pick: 18,  player: 'Amarius Mims',             position: 'OL',  college: 'Georgia' },
  { round: 1, pick: 19,  player: 'Jared Verse',              position: 'DL',  college: 'Florida St.' },
  { round: 1, pick: 20,  player: 'Troy Fautanu',             position: 'OL',  college: 'Washington' },
  { round: 1, pick: 21,  player: 'Chop Robinson',            position: 'DE',  college: 'Penn St.' },
  { round: 1, pick: 22,  player: 'Quinyon Mitchell',         position: 'CB',  college: 'Toledo' },
  { round: 1, pick: 23,  player: 'Brian Thomas',             position: 'WR',  college: 'LSU' },
  { round: 1, pick: 24,  player: 'Terrion Arnold',           position: 'DB',  college: 'Alabama' },
  { round: 1, pick: 25,  player: 'Jordan Morgan',            position: 'OL',  college: 'Arizona' },
  { round: 1, pick: 26,  player: 'Graham Barton',            position: 'OL',  college: 'Duke' },
  { round: 1, pick: 27,  player: 'Darius Robinson',          position: 'DL',  college: 'Missouri' },
  { round: 1, pick: 28,  player: 'Xavier Worthy',            position: 'WR',  college: 'Texas' },
  { round: 1, pick: 29,  player: 'Tyler Guyton',             position: 'OL',  college: 'Oklahoma' },
  { round: 1, pick: 30,  player: 'Nate Wiggins',             position: 'CB',  college: 'Clemson' },
  { round: 1, pick: 31,  player: 'Ricky Pearsall',           position: 'WR',  college: 'Florida' },
  { round: 1, pick: 32,  player: 'Xavier Legette',           position: 'WR',  college: 'South Carolina' },
  { round: 2, pick: 33,  player: 'Keon Coleman',             position: 'WR',  college: 'Florida St.' },
  { round: 2, pick: 34,  player: 'Ladd McConkey',            position: 'WR',  college: 'Georgia' },
  { round: 2, pick: 35,  player: 'Ruke Orhorhoro',           position: 'DT',  college: 'Clemson' },
  { round: 2, pick: 36,  player: "Jer'Zhan Newton",          position: 'DL',  college: 'Illinois' },
  { round: 2, pick: 37,  player: "Ja'Lynn Polk",             position: 'WR',  college: 'Washington' },
  { round: 2, pick: 38,  player: "T'Vondre Sweat",           position: 'DL',  college: 'Texas' },
  { round: 2, pick: 39,  player: 'Braden Fiske',             position: 'DL',  college: 'Florida St.' },
  { round: 2, pick: 40,  player: 'Cooper DeJean',            position: 'DB',  college: 'Iowa' },
  { round: 2, pick: 41,  player: 'Kool-Aid McKinstry',       position: 'DB',  college: 'Alabama' },
  { round: 2, pick: 42,  player: 'Kamari Lassiter',          position: 'DB',  college: 'Georgia' },
  { round: 2, pick: 43,  player: 'Max Melton',               position: 'DB',  college: 'Rutgers' },
  { round: 2, pick: 44,  player: 'Jackson Powers-Johnson',   position: 'OL',  college: 'Oregon' },
  { round: 2, pick: 45,  player: 'Edgerrin Cooper',          position: 'LB',  college: 'Texas A&M' },
  { round: 2, pick: 46,  player: 'Jonathon Brooks',          position: 'RB',  college: 'Texas' },
  { round: 2, pick: 47,  player: 'Tyler Nubin',              position: 'DB',  college: 'Minnesota' },
  { round: 2, pick: 48,  player: 'Maason Smith',             position: 'DT',  college: 'LSU' },
  { round: 2, pick: 49,  player: 'Kris Jenkins',             position: 'DL',  college: 'Michigan' },
  { round: 2, pick: 50,  player: 'Mike Sainristil',          position: 'DB',  college: 'Michigan' },
  { round: 2, pick: 51,  player: 'Zach Frazier',             position: 'OL',  college: 'West Virginia' },
  { round: 2, pick: 52,  player: 'Adonai Mitchell',          position: 'WR',  college: 'Texas' },
  { round: 2, pick: 53,  player: 'Ben Sinnott',              position: 'TE',  college: 'Kansas St.' },
  { round: 2, pick: 54,  player: 'Michael Hall',             position: 'DT',  college: 'Ohio St.' },
  { round: 2, pick: 55,  player: 'Patrick Paul',             position: 'OL',  college: 'Houston' },
  { round: 2, pick: 56,  player: 'Marshawn Kneeland',        position: 'DL',  college: 'Western Michigan' },
  { round: 2, pick: 57,  player: 'Chris Braswell',           position: 'LB',  college: 'Alabama' },
  { round: 2, pick: 58,  player: 'Javon Bullard',            position: 'DB',  college: 'Georgia' },
  { round: 2, pick: 59,  player: 'Blake Fisher',             position: 'OL',  college: 'Notre Dame' },
  { round: 2, pick: 60,  player: 'Cole Bishop',              position: 'SAF', college: 'Utah' },
  { round: 2, pick: 61,  player: 'Ennis Rakestraw',          position: 'DB',  college: 'Missouri' },
  { round: 2, pick: 62,  player: 'Roger Rosengarten',        position: 'OL',  college: 'Washington' },
  { round: 2, pick: 63,  player: 'Kingsley Suamataia',       position: 'OL',  college: 'BYU' },
  { round: 2, pick: 64,  player: 'Renardo Green',            position: 'DB',  college: 'Florida St.' },
  { round: 3, pick: 65,  player: 'Malachi Corley',           position: 'WR',  college: 'Western Kentucky' },
  { round: 3, pick: 66,  player: 'Trey Benson',              position: 'RB',  college: 'Florida St.' },
  { round: 3, pick: 67,  player: 'Brandon Coleman',          position: 'OL',  college: 'TCU' },
  { round: 3, pick: 68,  player: 'Caedan Wallace',           position: 'OL',  college: 'Penn St.' },
  { round: 3, pick: 69,  player: 'Junior Colson',            position: 'LB',  college: 'Michigan' },
  { round: 3, pick: 70,  player: 'Andru Phillips',           position: 'DB',  college: 'Kentucky' },
  { round: 3, pick: 71,  player: 'Isaiah Adams',             position: 'OL',  college: 'Illinois' },
  { round: 3, pick: 72,  player: 'Trevin Wallace',           position: 'LB',  college: 'Kentucky' },
  { round: 3, pick: 73,  player: 'Cooper Beebe',             position: 'OL',  college: 'Kansas St.' },
  { round: 3, pick: 74,  player: 'Bralen Trice',             position: 'DE',  college: 'Washington' },
  { round: 3, pick: 75,  player: 'Kiran Amegadjie',          position: 'OL',  college: 'Yale' },
  { round: 3, pick: 76,  player: 'Jonah Elliss',             position: 'DE',  college: 'Utah' },
  { round: 3, pick: 77,  player: 'Delmar Glaze',             position: 'OL',  college: 'Maryland' },
  { round: 3, pick: 78,  player: 'Calen Bullock',            position: 'SAF', college: 'USC' },
  { round: 3, pick: 79,  player: 'Matt Goncalves',           position: 'OL',  college: 'Pittsburgh' },
  { round: 3, pick: 80,  player: 'Jermaine Burton',          position: 'WR',  college: 'Alabama' },
  { round: 3, pick: 81,  player: 'Christian Haynes',         position: 'OL',  college: 'Connecticut' },
  { round: 3, pick: 82,  player: 'Tip Reiman',               position: 'TE',  college: 'Illinois' },
  { round: 3, pick: 83,  player: 'Blake Corum',              position: 'RB',  college: 'Michigan' },
  { round: 3, pick: 84,  player: 'Roman Wilson',             position: 'WR',  college: 'Michigan' },
  { round: 3, pick: 85,  player: 'Zak Zinter',               position: 'OL',  college: 'Michigan' },
  { round: 3, pick: 86,  player: 'Dominick Puni',            position: 'OL',  college: 'Kansas' },
  { round: 3, pick: 87,  player: 'Marist Liufau',            position: 'LB',  college: 'Notre Dame' },
  { round: 3, pick: 88,  player: 'MarShawn Lloyd',           position: 'RB',  college: 'USC' },
  { round: 3, pick: 89,  player: 'Tykee Smith',              position: 'DB',  college: 'Georgia' },
  { round: 3, pick: 90,  player: 'Elijah Jones',             position: 'DB',  college: 'Boston Col.' },
  { round: 3, pick: 91,  player: "Ty'Ron Hopper",            position: 'LB',  college: 'Missouri' },
  { round: 3, pick: 92,  player: 'Jalen McMillan',           position: 'WR',  college: 'Washington' },
  { round: 3, pick: 93,  player: 'Adisa Isaac',              position: 'DE',  college: 'Penn St.' },
  { round: 3, pick: 94,  player: 'Jalyx Hunt',               position: 'DE',  college: 'Houston Christian' },
  { round: 3, pick: 95,  player: 'DeWayne Carter',           position: 'DT',  college: 'Duke' },
  { round: 3, pick: 96,  player: 'Jarrian Jones',            position: 'DB',  college: 'Florida St.' },
  { round: 3, pick: 97,  player: 'McKinnley Jackson',        position: 'DL',  college: 'Texas A&M' },
  { round: 3, pick: 98,  player: 'Payton Wilson',            position: 'LB',  college: 'North Carolina St.' },
  { round: 3, pick: 99,  player: 'Kamren Kinchens',          position: 'SAF', college: 'Miami (FL)' },
  { round: 3, pick: 100, player: 'Luke McCaffrey',           position: 'WR',  college: 'Rice' },
  { round: 4, pick: 101, player: "Ja'Tavion Sanders",        position: 'TE',  college: 'Texas' },
  { round: 4, pick: 102, player: 'Troy Franklin',            position: 'WR',  college: 'Oregon' },
  { round: 4, pick: 103, player: 'Layden Robinson',          position: 'OL',  college: 'Texas A&M' },
  { round: 4, pick: 104, player: 'Dadrion Taylor-Demerson',  position: 'DB',  college: 'Texas Tech' },
  { round: 4, pick: 105, player: 'Justin Eboigbe',           position: 'DL',  college: 'Alabama' },
  { round: 4, pick: 106, player: 'Cedric Gray',              position: 'LB',  college: 'North Carolina' },
  { round: 4, pick: 107, player: 'Theo Johnson',             position: 'TE',  college: 'Penn St.' },
  { round: 4, pick: 108, player: 'Khyree Jackson',           position: 'DB',  college: 'Oregon' },
  { round: 4, pick: 109, player: 'Brandon Dorlus',           position: 'DE',  college: 'Oregon' },
  { round: 4, pick: 110, player: 'Javon Baker',              position: 'WR',  college: 'Central Florida' },
  { round: 4, pick: 111, player: 'Evan Williams',            position: 'DB',  college: 'Oregon' },
  { round: 4, pick: 112, player: 'Decamerion Richardson',    position: 'CB',  college: 'Mississippi St.' },
  { round: 4, pick: 113, player: 'Devontez Walker',          position: 'WR',  college: 'North Carolina' },
  { round: 4, pick: 114, player: 'Javon Foster',             position: 'OL',  college: 'Missouri' },
  { round: 4, pick: 115, player: 'Erick All',                position: 'TE',  college: 'Iowa' },
  { round: 4, pick: 116, player: 'Jordan Jefferson',         position: 'DT',  college: 'LSU' },
  { round: 4, pick: 117, player: 'Tanor Bortolini',          position: 'OL',  college: 'Wisconsin' },
  { round: 4, pick: 118, player: 'Tyrice Knight',            position: 'LB',  college: 'Texas-El Paso' },
  { round: 4, pick: 119, player: 'Mason McCormick',          position: 'OL',  college: 'South Dakota St.' },
  { round: 4, pick: 120, player: 'Jaylen Wright',            position: 'RB',  college: 'Tennessee' },
  { round: 4, pick: 121, player: 'AJ Barner',                position: 'TE',  college: 'Michigan' },
  { round: 4, pick: 122, player: 'Tory Taylor',              position: 'P',   college: 'Iowa' },
  { round: 4, pick: 123, player: 'Cade Stover',              position: 'TE',  college: 'Ohio St.' },
  { round: 4, pick: 124, player: 'Malik Mustapha',           position: 'DB',  college: 'Wake Forest' },
  { round: 4, pick: 125, player: 'Bucky Irving',             position: 'RB',  college: 'Oregon' },
  { round: 4, pick: 126, player: 'Giovanni Manu',            position: 'OL',  college: 'British Columbia' },
  { round: 4, pick: 127, player: 'Will Shipley',             position: 'RB',  college: 'Clemson' },
  { round: 4, pick: 128, player: 'Ray Davis',                position: 'RB',  college: 'Kentucky' },
  { round: 4, pick: 129, player: 'Isaac Guerendo',           position: 'RB',  college: 'Louisville' },
  { round: 4, pick: 130, player: 'T.J. Tampa',               position: 'DB',  college: 'Iowa St.' },
  { round: 4, pick: 131, player: 'Jared Wiley',              position: 'TE',  college: 'TCU' },
  { round: 4, pick: 132, player: 'Sione Vaki',               position: 'SAF', college: 'Utah' },
  { round: 4, pick: 133, player: 'Jaden Hicks',              position: 'DB',  college: 'Washington St.' },
  { round: 4, pick: 134, player: 'Braelon Allen',            position: 'RB',  college: 'Wisconsin' },
  { round: 4, pick: 135, player: 'Jacob Cowing',             position: 'WR',  college: 'Arizona' },
  { round: 5, pick: 136, player: 'Nehemiah Pritchett',       position: 'CB',  college: 'Auburn' },
  { round: 5, pick: 137, player: 'Tarheeb Still',            position: 'DB',  college: 'Maryland' },
  { round: 5, pick: 138, player: 'Xavier Thomas',            position: 'DE',  college: 'Clemson' },
  { round: 5, pick: 139, player: 'Jordan Magee',             position: 'LB',  college: 'Temple' },
  { round: 5, pick: 140, player: 'Cam Hart',                 position: 'CB',  college: 'Notre Dame' },
  { round: 5, pick: 141, player: 'Sedrick Van Pran-Granger', position: 'OL',  college: 'Georgia' },
  { round: 5, pick: 142, player: 'Anthony Gould',            position: 'WR',  college: 'Oregon St.' },
  { round: 5, pick: 143, player: 'JD Bertrand',              position: 'LB',  college: 'Notre Dame' },
  { round: 5, pick: 144, player: 'Austin Booker',            position: 'DL',  college: 'Kansas' },
  { round: 5, pick: 145, player: 'Kris Abrams-Draine',       position: 'DB',  college: 'Missouri' },
  { round: 5, pick: 146, player: 'Jarvis Brownlee',          position: 'DB',  college: 'Louisville' },
  { round: 5, pick: 147, player: 'Audric Estime',            position: 'RB',  college: 'Notre Dame' },
  { round: 5, pick: 148, player: 'Tommy Eichenberg',         position: 'LB',  college: 'Ohio St.' },
  { round: 5, pick: 149, player: 'Josh Newton',              position: 'CB',  college: 'TCU' },
  { round: 5, pick: 150, player: 'Spencer Rattler',          position: 'QB',  college: 'South Carolina' },
  { round: 5, pick: 151, player: 'Jaylon Carlies',           position: 'DB',  college: 'Missouri' },
  { round: 5, pick: 152, player: 'Ainias Smith',             position: 'WR',  college: 'Texas A&M' },
  { round: 5, pick: 153, player: 'Deantre Prince',           position: 'CB',  college: 'Mississippi' },
  { round: 5, pick: 154, player: 'Brennan Jackson',          position: 'DE',  college: 'Washington St.' },
  { round: 5, pick: 155, player: 'Jeremiah Trotter Jr.',     position: 'LB',  college: 'Clemson' },
  { round: 5, pick: 156, player: 'Jamari Thrash',            position: 'WR',  college: 'Louisville' },
  { round: 5, pick: 157, player: 'Chau Smith-Wade',          position: 'DB',  college: 'Washington St.' },
  { round: 5, pick: 158, player: 'Mohamed Kamara',           position: 'DL',  college: 'Colorado St.' },
  { round: 5, pick: 159, player: 'Hunter Nourzad',           position: 'OL',  college: 'Penn St.' },
  { round: 5, pick: 160, player: 'Edefuan Ulofoshio',        position: 'LB',  college: 'Washington' },
  { round: 5, pick: 161, player: 'Dominique Hampton',        position: 'CB',  college: 'Washington' },
  { round: 5, pick: 162, player: 'Christian Jones',          position: 'OL',  college: 'Texas' },
  { round: 5, pick: 163, player: 'Jacob Monk',               position: 'OL',  college: 'Duke' },
  { round: 5, pick: 164, player: 'Jaylin Simpson',           position: 'SAF', college: 'Auburn' },
  { round: 5, pick: 165, player: 'Rasheen Ali',              position: 'RB',  college: 'Marshall' },
  { round: 5, pick: 166, player: 'Tyrone Tracy Jr.',         position: 'RB',  college: 'Purdue' },
  { round: 5, pick: 167, player: 'Keilan Robinson',          position: 'RB',  college: 'Texas' },
  { round: 5, pick: 168, player: 'Javon Solomon',            position: 'DE',  college: 'Troy' },
  { round: 5, pick: 169, player: 'Kitan Oladapo',            position: 'DB',  college: 'Oregon St.' },
  { round: 5, pick: 170, player: 'Bub Means',                position: 'WR',  college: 'Pittsburgh' },
  { round: 5, pick: 171, player: 'Jordan Travis',            position: 'QB',  college: 'Florida St.' },
  { round: 5, pick: 172, player: 'Trevor Keegan',            position: 'OL',  college: 'Michigan' },
  { round: 5, pick: 173, player: 'Isaiah Davis',             position: 'RB',  college: 'South Dakota St.' },
  { round: 5, pick: 174, player: 'Caelen Carson',            position: 'DB',  college: 'Wake Forest' },
  { round: 5, pick: 175, player: 'Jaylan Ford',              position: 'LB',  college: 'Texas' },
  { round: 5, pick: 176, player: "Qwan'tez Stiggers",        position: 'CB',  college: '' },
  { round: 6, pick: 177, player: 'Walter Rouse',             position: 'OL',  college: 'Oklahoma' },
  { round: 6, pick: 178, player: 'Logan Lee',                position: 'DL',  college: 'Iowa' },
  { round: 6, pick: 179, player: 'Sataoa Laumea',            position: 'OL',  college: 'Utah' },
  { round: 6, pick: 180, player: 'Marcellas Dial',           position: 'DB',  college: 'South Carolina' },
  { round: 6, pick: 181, player: 'Kimani Vidal',             position: 'RB',  college: 'Troy' },
  { round: 6, pick: 182, player: "Jha'Quan Jackson",         position: 'WR',  college: 'Tulane' },
  { round: 6, pick: 183, player: 'Darius Muasau',            position: 'LB',  college: 'UCLA' },
  { round: 6, pick: 184, player: 'Malik Washington',         position: 'WR',  college: 'Virginia' },
  { round: 6, pick: 185, player: 'Johnny Wilson',            position: 'WR',  college: 'Florida St.' },
  { round: 6, pick: 186, player: 'Jase McClellan',           position: 'RB',  college: 'Alabama' },
  { round: 6, pick: 187, player: 'Casey Washington',         position: 'WR',  college: 'Illinois' },
  { round: 6, pick: 188, player: 'Jamal Hill',               position: 'LB',  college: 'Oregon' },
  { round: 6, pick: 189, player: 'Mekhi Wingo',              position: 'DT',  college: 'LSU' },
  { round: 6, pick: 190, player: 'Dylan McMahon',            position: 'OL',  college: 'North Carolina St.' },
  { round: 6, pick: 191, player: 'Tejhaun Palmer',           position: 'WR',  college: 'Ala-Birmingham' },
  { round: 6, pick: 192, player: 'D.J. James',               position: 'CB',  college: 'Auburn' },
  { round: 6, pick: 193, player: 'Joe Milton',               position: 'QB',  college: 'Tennessee' },
  { round: 6, pick: 194, player: 'Tanner McLachlan',         position: 'TE',  college: 'Arizona' },
  { round: 6, pick: 195, player: 'Ryan Watts',               position: 'SAF', college: 'Texas' },
  { round: 6, pick: 196, player: 'Tyler Davis',              position: 'DT',  college: 'Clemson' },
  { round: 6, pick: 197, player: 'Zion Logue',               position: 'DL',  college: 'Georgia' },
  { round: 6, pick: 198, player: 'Patrick McMorris',         position: 'DB',  college: 'California' },
  { round: 6, pick: 199, player: 'Khristian Boyd',           position: 'DL',  college: 'Northern Iowa' },
  { round: 6, pick: 200, player: 'Jaden Crumedy',            position: 'DT',  college: 'Mississippi St.' },
  { round: 6, pick: 201, player: 'Micah Abraham',            position: 'CB',  college: 'Marshall' },
  { round: 6, pick: 202, player: 'Travis Glover',            position: 'OT',  college: 'Georgia St.' },
  { round: 6, pick: 203, player: 'Will Reichard',            position: 'K',   college: 'Alabama' },
  { round: 6, pick: 204, player: 'Tylan Grable',             position: 'OL',  college: 'Central Florida' },
  { round: 6, pick: 205, player: 'Jawhar Jordan',            position: 'RB',  college: 'Louisville' },
  { round: 6, pick: 206, player: 'Nathaniel Watson',         position: 'LB',  college: 'Mississippi St.' },
  { round: 6, pick: 207, player: 'Michael Jerrell',          position: 'OT',  college: 'Findlay' },
  { round: 6, pick: 208, player: 'Dylan Laube',              position: 'RB',  college: 'New Hampshire' },
  { round: 6, pick: 209, player: 'Joshua Karty',             position: 'K',   college: 'Stanford' },
  { round: 6, pick: 210, player: 'Christian Mahogany',       position: 'OL',  college: 'Boston Col.' },
  { round: 6, pick: 211, player: 'Kamal Hadden',             position: 'DB',  college: 'Tennessee' },
  { round: 6, pick: 212, player: 'Cam Little',               position: 'K',   college: 'Arkansas' },
  { round: 6, pick: 213, player: 'Jordan Whittington',       position: 'WR',  college: 'Texas' },
  { round: 6, pick: 214, player: 'Cedric Johnson',           position: 'DE',  college: 'Mississippi' },
  { round: 6, pick: 215, player: 'Jarrett Kingston',         position: 'OL',  college: 'USC' },
  { round: 6, pick: 216, player: 'Ryan Flournoy',            position: 'WR',  college: 'SE Missouri St.' },
  { round: 6, pick: 217, player: 'Beaux Limmer',             position: 'OL',  college: 'Arkansas' },
  { round: 6, pick: 218, player: 'Devin Leary',              position: 'QB',  college: 'Kentucky' },
  { round: 6, pick: 219, player: 'Daequan Hardy',            position: 'CB',  college: 'Penn St.' },
  { round: 6, pick: 220, player: 'Elijah Klein',             position: 'G',   college: 'Texas-El Paso' },
  { round: 7, pick: 221, player: 'Travis Clayton',           position: 'OT',  college: '' },
  { round: 7, pick: 222, player: 'Javontae Jean-Baptiste',   position: 'DL',  college: 'Notre Dame' },
  { round: 7, pick: 223, player: 'Trey Taylor',              position: 'FS',  college: 'Air Force' },
  { round: 7, pick: 224, player: 'Daijahn Anthony',          position: 'SAF', college: 'Mississippi' },
  { round: 7, pick: 225, player: 'Brenden Rice',             position: 'WR',  college: 'USC' },
  { round: 7, pick: 226, player: 'Jaden Davis',              position: 'DB',  college: 'Miami (FL)' },
  { round: 7, pick: 227, player: 'Myles Harden',             position: 'DB',  college: 'South Dakota' },
  { round: 7, pick: 228, player: 'Nick Samac',               position: 'C',   college: 'Michigan St.' },
  { round: 7, pick: 229, player: 'M.J. Devonshire',          position: 'DB',  college: 'Pittsburgh' },
  { round: 7, pick: 230, player: 'Michael Jurgens',          position: 'OL',  college: 'Wake Forest' },
  { round: 7, pick: 231, player: 'Jaheim Bell',              position: 'TE',  college: 'Florida St.' },
  { round: 7, pick: 232, player: 'Levi Drake Rodriguez',     position: 'DT',  college: 'Texas A&M-Commerce' },
  { round: 7, pick: 233, player: 'Nathan Thomas',            position: 'OL',  college: 'Louisiana' },
  { round: 7, pick: 234, player: 'Jonah Laulu',              position: 'DL',  college: 'Oklahoma' },
  { round: 7, pick: 235, player: 'Devaughn Vele',            position: 'WR',  college: 'Utah' },
  { round: 7, pick: 236, player: 'Myles Cole',               position: 'OLB', college: 'Texas Tech' },
  { round: 7, pick: 237, player: 'Matt Lee',                 position: 'C',   college: 'Miami (FL)' },
  { round: 7, pick: 238, player: 'Solomon Byrd',             position: 'DE',  college: 'USC' },
  { round: 7, pick: 239, player: 'Josiah Ezirim',            position: 'OT',  college: 'Eastern Kentucky' },
  { round: 7, pick: 240, player: 'Michael Barrett',          position: 'LB',  college: 'Michigan' },
  { round: 7, pick: 241, player: 'Tahj Washington',          position: 'WR',  college: 'USC' },
  { round: 7, pick: 242, player: 'James Williams',           position: 'SAF', college: 'Miami (FL)' },
  { round: 7, pick: 243, player: 'Jowon Briggs',             position: 'DE',  college: 'Cincinnati' },
  { round: 7, pick: 244, player: 'Justin Rogers',            position: 'DL',  college: 'Auburn' },
  { round: 7, pick: 245, player: 'Michael Pratt',            position: 'QB',  college: 'Tulane' },
  { round: 7, pick: 246, player: 'Devin Culp',               position: 'TE',  college: 'Washington' },
  { round: 7, pick: 247, player: 'Marcus Harris',            position: 'DL',  college: 'Auburn' },
  { round: 7, pick: 248, player: 'C.J. Hanson',              position: 'G',   college: 'Holy Cross' },
  { round: 7, pick: 249, player: 'LaDarius Henderson',       position: 'OL',  college: 'Michigan' },
  { round: 7, pick: 250, player: 'Sanoussi Kane',            position: 'SAF', college: 'Purdue' },
  { round: 7, pick: 251, player: 'Tatum Bethune',            position: 'LB',  college: 'Florida St.' },
  { round: 7, pick: 252, player: 'Jaylen Harrell',           position: 'DE',  college: 'Michigan' },
  { round: 7, pick: 253, player: 'Cornelius Johnson',        position: 'WR',  college: 'Michigan' },
  { round: 7, pick: 254, player: 'KT Leveston',              position: 'OL',  college: 'Kansas St.' },
  { round: 7, pick: 255, player: 'Kalen King',               position: 'CB',  college: 'Penn St.' },
  { round: 7, pick: 256, player: 'Nick Gargiulo',            position: 'OL',  college: 'South Carolina' },
  { round: 7, pick: 257, player: 'Jaylen Key',               position: 'SAF', college: 'Alabama' },
];

/* ------------------------------------------------------------
   TEAMS — 4 featured teams for the 2024 draft cycle
   Season stats from ESPN API (2023 NFL regular season).
   Ranks are league-wide (1 = best, 32 = worst) unless noted.
   ------------------------------------------------------------ */
const TEAMS = [

  /* ----------------------------------------------------------
     New England Patriots — Highest pick: #3 overall
     ---------------------------------------------------------- */
  {
    id: "patriots",
    name: "Patriots",
    city: "New England",
    abbreviation: "NE",
    draftPick: 3,
    colors: {
      primary:    "#002244",
      secondary:  "#C60C30",
      accent:     "#C60C30",
      primaryRgb: "0, 34, 68",
      accentRgb:  "198, 12, 48"
    },
    season: {
      record: "4-13",
      playoffResult: "Missed playoffs — last in AFC East",
      summary: "Bill Belichick's final season in New England was one of the most painful in franchise history. Mac Jones was benched in Week 7 after a 57.6% completion rate and a 6-to-8 TD-to-INT ratio, with Bailey Zappe and Malik Cunningham rotating in. No arrangement worked — the offense ranked dead last in total yards per game (295.2) and second-to-last in points scored (236). The defense held its own for stretches but was undermined by a historically bad offense and a -130 point differential. Belichick resigned following the season, and the 4-13 finish netted New England the third overall pick — their highest selection in over two decades.",
      stats: [
        { label: "Points Scored",      value: "236",   rank: 31, good: false, context: "2nd fewest in NFL; franchise low since 1992" },
        { label: "Points Allowed",     value: "366",   rank: 24, good: false, context: "-130 point differential, 29th in the league" },
        { label: "Yards per Game",     value: "295.2", rank: 31, good: false, context: "Dead last in the NFL in total offense" },
        { label: "Passing Yards",      value: "3,069", rank: 28, good: false, context: "Mac Jones posted a 73.8 passer rating — 30th in NFL" },
        { label: "Sacks by Defense",   value: "36",    rank: 27, good: false, context: "Pass rush collapse after Matthew Judon injury" },
        { label: "INTs Thrown",        value: "21",    rank: 30, good: false, context: "3rd-most interceptions thrown in the entire NFL" }
      ],
      strengths: [
        "Christian Gonzalez emerged as a legitimate CB1 before a season-ending injury in Week 4",
        "Rushing defense was solid — allowed only 95.7 yards per game on the ground",
        "Held the 3rd overall pick heading into a historically strong QB class",
        "Clean cap situation with over $100M in projected 2024 space"
      ],
      weaknesses: [
        "Dead last in passing yards, yards per game, and points scored — total offensive collapse",
        "Mac Jones posted a 73.8 passer rating (30th) before being benched; no franchise QB on the roster",
        "Defensive sacks dropped to 36 (27th in NFL) after losing Matthew Judon for the season",
        "Receiver corps had no viable WR1 — DeVante Parker was released, Bourne inconsistent",
        "Offensive line allowed 48 sacks — protection was a chronic issue all season"
      ]
    },
    needs: [
      {
        position: "QB",
        priority: "High",
        description: "The most urgent need in franchise history. New England has not had a reliable franchise quarterback since Brady's departure in 2020. Both starters in 2023 posted passer ratings below 80.0 combined for 21 interceptions. The #3 overall pick is almost certainly used on the franchise cornerstone of the next decade — this is the most important decision the new coaching staff will make.",
        scarcity: "Elite — deepest QB class since 2021, with multiple Day-1 starters projected in the top 12."
      },
      {
        position: "OL",
        priority: "High",
        description: "The offensive line allowed 48 sacks in 2023 — one of the highest totals in the league — and the pass protection was consistently abysmal. A starting-caliber tackle, particularly at left tackle to protect the incoming franchise QB, is the most critical non-QB investment this front office can make.",
        scarcity: "Good — this draft class has legitimate first-round OL talent across multiple positions."
      },
      {
        position: "WR",
        priority: "Medium",
        description: "New England has no legitimate wide receiver threat outside the slot. DeVante Parker was released, Kendrick Bourne has been inconsistent, and there is no player who can win outside against man coverage. A dynamic receiver who can stretch the field and give the incoming QB a real weapon is a Day 2 priority.",
        scarcity: "Excellent — the 2024 class has multiple elite WR prospects projected in the top 10."
      },
      {
        position: "EDGE",
        priority: "Medium",
        description: "The pass rush generated only 36 sacks (27th in NFL) after Matthew Judon was lost for the season. With Judon's future uncertain and the roster thin behind him, adding a young edge rusher with legitimate starter potential is essential to restoring a defense that once defined the franchise.",
        scarcity: "Average — some quality EDGE options in rounds 2-3 but elite talent gone early."
      },
      {
        position: "CB",
        priority: "Low",
        description: "Christian Gonzalez showed star potential before his season-ending injury. Behind him, depth is thin — the secondary was exploited in the second half of the season with a patchwork CB2 and CB3. Adding a press-capable corner who can develop into a long-term starter ensures continuity if Gonzalez needs time to return.",
        scarcity: "Strong — multiple first-round CB prospects available in this class."
      }
    ],
    picks: [
      { round: 1, pick: 3,   needPosition: "QB"   },
      { round: 2, pick: 37,  needPosition: "WR"   },
      { round: 3, pick: 68,  needPosition: "OL"   },
      { round: 4, pick: 103, needPosition: "OL"   },
      { round: 4, pick: 110, needPosition: "WR"   },
      { round: 6, pick: 180, needPosition: "DB"   },
      { round: 6, pick: 193, needPosition: "QB"   },
      { round: 7, pick: 231, needPosition: "TE"   }
    ]
  },

  /* ----------------------------------------------------------
     Pittsburgh Steelers — Highest pick: #20 overall
     ---------------------------------------------------------- */
  {
    id: "steelers",
    name: "Steelers",
    city: "Pittsburgh",
    abbreviation: "PIT",
    draftPick: 20,
    colors: {
      primary:    "#101820",
      secondary:  "#101820",
      accent:     "#FFB612",
      primaryRgb: "16, 24, 32",
      accentRgb:  "255, 182, 18"
    },
    season: {
      record: "10-7",
      playoffResult: "Wild Card — lost to Buffalo Bills 31–17",
      summary: "Pittsburgh's 2023 season was defined by its defense and undermined by its offense. T.J. Watt claimed his third Defensive Player of the Year award with 19 sacks, anchoring a unit that ranked 11th in sacks league-wide (47) and held divisional opponents to a 5-1 record. The offense told a different story — Kenny Pickett managed only 13 passing touchdowns, ranking 30th, while posting a conservative passer rating of 84.6. Najee Harris and Jaylen Warren combined for a solid 2,010 rushing yards (13th), but the passing game lacked a reliable second option. Pittsburgh snuck into the playoffs as a wild card but were overmatched in a 31-17 loss to the Bills.",
      stats: [
        { label: "Points Scored",      value: "304",   rank: 28, good: false, context: "13 passing TDs — 30th in NFL; offense couldn't sustain drives" },
        { label: "Points Allowed",     value: "324",   rank: 15, good: true,  context: "Solid defense despite a -20 point differential overall" },
        { label: "Yards per Game",     value: "319.5", rank: 25, good: false, context: "Ranked 25th — offense struggled to generate consistent yardage" },
        { label: "Rushing Yards",      value: "2,010", rank: 13, good: true,  context: "Harris + Warren combo effective; one of the better run games" },
        { label: "Sacks by Defense",   value: "47",    rank: 11, good: true,  context: "T.J. Watt led with 19 sacks — DPOY for 3rd time" },
        { label: "INTs Thrown",        value: "9",     rank: 4,  good: true,  context: "Ball security was excellent — 4th fewest INTs in NFL" }
      ],
      strengths: [
        "T.J. Watt won his 3rd Defensive Player of the Year award with 19 sacks",
        "Najee Harris and Jaylen Warren combined for 2,010 rushing yards (13th in NFL)",
        "Excellent ball security — Kenny Pickett threw only 9 interceptions (4th fewest in league)",
        "Defensive line depth was solid — 47 team sacks ranked 11th in the NFL",
        "5-1 division record secured a playoff berth despite a modest overall record"
      ],
      weaknesses: [
        "Only 13 passing touchdowns — 30th in the NFL; the offense could not win through the air",
        "No legitimate WR2 opposite George Pickens; Diontae Johnson's role was inconsistent",
        "Offensive tackle play was the weakest position group on the roster",
        "Kenny Pickett struggled with accuracy and big-game execution",
        "Interior offensive line needed a true starting-caliber center long-term"
      ]
    },
    needs: [
      {
        position: "OL",
        priority: "High",
        description: "The offensive line was the team's most glaring structural weakness in 2023. Dan Moore Jr. allowed repeated pressures at left tackle, and the interior offered little in the way of impact play. A starting-caliber tackle — ideally at the blindside — is the most important non-defensive investment Pittsburgh can make to give any quarterback a fighting chance.",
        scarcity: "Good — legitimate first-round OL talent available, especially at tackle and center."
      },
      {
        position: "WR",
        priority: "High",
        description: "George Pickens is a legitimate WR1, but there is no credible WR2 on the roster. Diontae Johnson's future in Pittsburgh is uncertain, and without a second reliable option, opposing defenses can shade coverage toward Pickens. Adding a complementary receiver who can win in the intermediate area and create separation off the line would transform the passing game.",
        scarcity: "Excellent — the 2024 WR class is historically deep, including multiple first-round options."
      },
      {
        position: "OL",
        priority: "Medium",
        description: "The interior offensive line — particularly the center position — lacks a long-term franchise answer. Kendrick Green's play has been inconsistent, and the team needs a physical, communicative center who can anchor the line and handle pre-snap responsibilities in a pro-style system.",
        scarcity: "Good — the 2024 class has interior linemen who could contribute from Day 1."
      },
      {
        position: "LB",
        priority: "Medium",
        description: "Patrick Queen departed in free agency, leaving a hole at off-ball linebacker. Pittsburgh needs a coverage-capable LB who can handle spread formations and operate as the communication anchor in the middle of their defense. An athletic linebacker who can run and cover is the ideal profile.",
        scarcity: "Average — there is LB talent scattered across all three days of the draft."
      },
      {
        position: "EDGE",
        priority: "Low",
        description: "While Watt is elite, depth behind him is limited. Alex Highsmith is the only other reliable pass rusher. Adding a developmental edge player in the mid-rounds provides insurance and competition — the position is too important to leave thin heading into a year where Watt will face maximum attention.",
        scarcity: "Average — depth EDGE options available on Day 2 and Day 3."
      }
    ],
    picks: [
      { round: 1, pick: 20,  needPosition: "OL"   },
      { round: 2, pick: 51,  needPosition: "OL"   },
      { round: 3, pick: 84,  needPosition: "WR"   },
      { round: 3, pick: 98,  needPosition: "LB"   },
      { round: 4, pick: 119, needPosition: "OL"   },
      { round: 6, pick: 178, needPosition: "DL"   },
      { round: 6, pick: 195, needPosition: "SAF"  }
    ]
  },

  /* ----------------------------------------------------------
     Kansas City Chiefs — Highest pick: #28 overall
     ---------------------------------------------------------- */
  {
    id: "chiefs",
    name: "Chiefs",
    city: "Kansas City",
    abbreviation: "KC",
    draftPick: 28,
    colors: {
      primary:    "#E31837",
      secondary:  "#101820",
      accent:     "#FFB81C",
      primaryRgb: "227, 24, 55",
      accentRgb:  "255, 184, 28"
    },
    season: {
      record: "11-6",
      playoffResult: "Super Bowl LVIII Champions — defeated San Francisco 49ers 25–22 (OT)",
      summary: "The Kansas City Chiefs won their fourth Super Bowl title in franchise history, defeating the San Francisco 49ers 25-22 in overtime in Las Vegas. The path wasn't glamorous — Kansas City ranked just 15th in points scored (371) with a receiver corps that featured no true WR1 outside of Travis Kelce. Patrick Mahomes managed the game brilliantly despite limited weapons, while Chris Jones led a defense that ranked 2nd in the NFL in sacks (57). The Chiefs won again by being the most clutch team in football, outlasting opponents in big moments. They now enter the draft as back-to-back champions in need of offensive skill reinforcement.",
      stats: [
        { label: "Points Scored",      value: "371",   rank: 15, good: false, context: "15th in scoring — managed wins despite limited offensive weapons" },
        { label: "Points Allowed",     value: "294",   rank: 5,  good: true,  context: "Elite defense; 5th-fewest points allowed in the NFL" },
        { label: "Yards per Game",     value: "362.8", rank: 11, good: true,  context: "Efficient offense; top-half of the league" },
        { label: "Passing Yards",      value: "4,188", rank: 6,  good: true,  context: "Mahomes threw for 4,183 yards despite suboptimal receiver talent" },
        { label: "Sacks by Defense",   value: "57",    rank: 2,  good: true,  context: "Chris Jones anchored the 2nd-best pass rush in the NFL" },
        { label: "INTs by Defense",    value: "8",     rank: 27, good: false, context: "Defense generated pressure but rarely converted to turnovers" }
      ],
      strengths: [
        "Patrick Mahomes is the best quarterback in football — managed the offense to a title despite thin talent",
        "Chris Jones is the NFL's most dominant interior pass rusher — 57 team sacks ranked 2nd in the NFL",
        "Travis Kelce remains the best tight end in football and the heart of the offense",
        "Elite coaching and situational football — went 4-1 in playoff games decided by one score",
        "Passing yards per game (362.8) ranked 11th despite the league's weakest WR corps among playoff teams"
      ],
      weaknesses: [
        "No legitimate WR1 outside of Kelce — JuJu Smith-Schuster retired, Mecole Hardman inconsistent",
        "Lost Orlando Brown Jr. at left tackle — the offensive line needs a long-term blindside solution",
        "Only 8 interceptions by the defense (27th in NFL) — struggled to generate takeaways",
        "Travis Kelce entering his age-35 season — no viable succession plan at tight end",
        "Ranked 15th in points scored — offensive ceiling was capped by lack of skill talent"
      ]
    },
    needs: [
      {
        position: "WR",
        priority: "High",
        description: "The Chiefs finished 15th in points scored with essentially no wide receiver threat outside of Kelce. JuJu Smith-Schuster retired, Hardman was inconsistent, and Rashee Rice's emergence was the one bright spot. Adding a legitimate vertical threat who can create separation and give Mahomes a true outside target would make this offense exponentially harder to defend.",
        scarcity: "Excellent — the 2024 WR class is the deepest in years with multiple Day-1 options."
      },
      {
        position: "OL",
        priority: "High",
        description: "Orlando Brown Jr. departed in free agency, leaving a significant hole at left tackle. Kansas City allowed only 28 sacks in 2023 (31st in league — meaning they gave up few), but without Brown anchoring the blindside, protecting Mahomes becomes a priority. A true left tackle who can start Week 1 is essential.",
        scarcity: "Good — legitimate OL talent in the first two rounds of this class."
      },
      {
        position: "TE",
        priority: "Medium",
        description: "Travis Kelce is a future Hall of Famer entering his age-35 season. The Chiefs have no developmental option behind him. Adding a move tight end who can learn the system and eventually absorb Kelce's role in the passing game is a long-term investment the organization must begin now.",
        scarcity: "Average — the 2024 TE class is modest outside of Brock Bowers."
      },
      {
        position: "EDGE",
        priority: "Medium",
        description: "Frank Clark's release leaves the Chiefs without a proven complement to Chris Jones. The pass rush ranked 2nd despite the personnel loss, but depth is thin. A young edge rusher who can develop behind Jones and add another dimension to the defensive front prevents a dangerous drop-off when Jones faces double teams.",
        scarcity: "Average — solid EDGE depth available on Day 2, elite options gone by pick 20."
      },
      {
        position: "DB",
        priority: "Low",
        description: "Trent McDuffie has emerged as a CB1, but L'Jarius Sneed's future is uncertain as a free agent. The safety position also has questions. Adding a versatile defensive back in the mid-rounds who can play multiple positions provides flexibility and long-term depth behind the starters.",
        scarcity: "Strong — the 2024 class is loaded with versatile defensive backs across all rounds."
      }
    ],
    picks: [
      { round: 1, pick: 28,  needPosition: "WR"   },
      { round: 2, pick: 63,  needPosition: "OL"   },
      { round: 4, pick: 131, needPosition: "TE"   },
      { round: 4, pick: 133, needPosition: "DB"   },
      { round: 5, pick: 159, needPosition: "OL"   },
      { round: 6, pick: 211, needPosition: "DB"   },
      { round: 7, pick: 248, needPosition: "OL"   }
    ]
  },

  /* ----------------------------------------------------------
     Buffalo Bills — Highest pick: #33 (Round 2, no 1st-round pick)
     ---------------------------------------------------------- */
  {
    id: "bills",
    name: "Bills",
    city: "Buffalo",
    abbreviation: "BUF",
    draftPick: 33,
    colors: {
      primary:    "#00338D",
      secondary:  "#101820",
      accent:     "#C60C30",
      primaryRgb: "0, 51, 141",
      accentRgb:  "198, 12, 48"
    },
    season: {
      record: "11-6",
      playoffResult: "Divisional Round — lost to Kansas City Chiefs 27–24",
      summary: "Josh Allen and the Bills had one of the NFL's most dominant regular seasons in 2023 — 451 points scored (6th in the NFL), 383.4 yards per game (6th), and an 11-6 record. The defense generated 54 sacks (4th in league) and 18 interceptions (3rd in league) despite losing Von Miller for most of the year. Buffalo entered the playoffs as the AFC's 2nd seed and defeated the Steelers 31-17 before falling to the Chiefs 27-24 in the Divisional round — a familiar ending. Heading into the 2024 draft without a first-round pick, the Bills must be efficient in restocking a roster dealing with looming departures at receiver and safety.",
      stats: [
        { label: "Points Scored",      value: "451",   rank: 6,  good: true,  context: "6th in NFL; Josh Allen posted a 92.2 QB rating" },
        { label: "Points Allowed",     value: "311",   rank: 8,  good: true,  context: "Solid defense — 8th-fewest points allowed in the NFL" },
        { label: "Yards per Game",     value: "383.4", rank: 6,  good: true,  context: "One of the NFL's most explosive offenses" },
        { label: "Passing Yards",      value: "4,154", rank: 8,  good: true,  context: "Josh Allen's 4,306 passing yards, 29 TDs on the season" },
        { label: "Sacks by Defense",   value: "54",    rank: 4,  good: true,  context: "4th-most sacks in the NFL — elite pass rush despite injuries" },
        { label: "INTs by Defense",    value: "18",    rank: 3,  good: true,  context: "3rd-most interceptions in the NFL — turnover-generating unit" }
      ],
      strengths: [
        "Josh Allen is a top-3 QB in football — 451 points, 383 yards/game, and 92.2 passer rating",
        "Defense generated 54 sacks (4th) and 18 interceptions (3rd) despite losing Von Miller",
        "Stefon Diggs had another dominant regular season before his relationship with the team frayed",
        "18 rushing TDs (5th in NFL) — Allen's dual-threat ability makes the run game uniquely effective",
        "Beat the Steelers 31-17 in Wild Card — showed the offense can dominate in big games"
      ],
      weaknesses: [
        "No first-round pick — traded to the Vikings in 2022; must build through Day 2-3 efficiency",
        "Stefon Diggs' relationship with the team became a major distraction; trade is likely",
        "Jordan Poyer released, Micah Hyde retired — the veteran safety duo that defined the defense is gone",
        "Von Miller's suspension and injury limited him to 3 games — pass rush depth is razor thin",
        "Lost another potential Super Bowl run to the Chiefs — the window is open but closing"
      ]
    },
    needs: [
      {
        position: "WR",
        priority: "High",
        description: "With Stefon Diggs' trade imminent, the Bills need a wide receiver who can eventually emerge as WR1 or form a reliable WR2 pairing. Josh Allen can elevate any talent, but without a legitimate outside threat, opposing defenses will simplify their coverage. A physical receiver who can win on the outside and create after the catch is the top offensive priority.",
        scarcity: "Excellent — the 2024 WR class is historically deep with multiple first-round options."
      },
      {
        position: "SAF",
        priority: "High",
        description: "Both Jordan Poyer and Micah Hyde — the veteran safety tandem that anchored Buffalo's defense for years — are gone. The Bills need a starting-quality safety who can communicate in the back end, cover deep halves, and provide the range Hyde brought to the position for nearly a decade. This is the most urgent defensive need.",
        scarcity: "Average — some quality safety options but the elite tier goes quickly."
      },
      {
        position: "EDGE",
        priority: "High",
        description: "Von Miller's availability for 2024 is uncertain following suspension and injury. Greg Rousseau is the only established pass rusher on the roster behind him. A versatile edge defender who can generate pressure from multiple alignments and work alongside Rousseau is essential to sustaining one of the league's better pass-rush units.",
        scarcity: "Average — quality EDGE talent available in rounds 2-3 of this class."
      },
      {
        position: "RB",
        priority: "Medium",
        description: "Devin Singletary signed with the Houston Texans. James Cook is a dynamic weapon in space, but the Bills lack a between-the-tackles option who can handle short yardage and provide a physical dimension to the run game. Adding a power runner to complement Cook diversifies an already dangerous Josh Allen offense.",
        scarcity: "Good — the 2024 RB class has solid Day 2-3 options."
      },
      {
        position: "CB",
        priority: "Low",
        description: "Tre'Davious White's effectiveness has declined. Behind him, cornerback depth is thin. Adding a developmental corner who can compete for a starting role and provide insurance ensures the Bills aren't exposed in the secondary if White continues to decline or misses time.",
        scarcity: "Strong — deep CB class with options available in rounds 2 through 4."
      }
    ],
    picks: [
      { round: 2, pick: 33,  needPosition: "WR"   },
      { round: 2, pick: 60,  needPosition: "SAF"  },
      { round: 3, pick: 95,  needPosition: "DL"   },
      { round: 4, pick: 128, needPosition: "RB"   },
      { round: 5, pick: 141, needPosition: "OL"   },
      { round: 5, pick: 160, needPosition: "LB"   },
      { round: 5, pick: 168, needPosition: "EDGE" },
      { round: 6, pick: 204, needPosition: "OL"   },
      { round: 6, pick: 219, needPosition: "CB"   },
      { round: 7, pick: 221, needPosition: "OL"   }
    ]
  }

]; // end TEAMS
