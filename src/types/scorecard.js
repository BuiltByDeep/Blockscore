/**
 * BlockScore Scorecard Type Definitions
 * Complete cricket scorecard structure
 */

export const MATCH_TYPES = {
  T20: 'T20',
  ODI: 'ODI',
  TEST: 'Test',
  LOCAL: 'Local'
};

export const DISMISSAL_TYPES = [
  'not out',
  'bowled',
  'caught',
  'lbw',
  'run out',
  'stumped',
  'hit wicket',
  'retired hurt',
  'obstructing the field',
  'timed out'
];

// Default empty structures
export const createEmptyBatter = () => ({
  name: '',
  dismissal: 'not out',
  runs: 0,
  balls: 0,
  fours: 0,
  sixes: 0,
  strikeRate: 0
});

export const createEmptyBowler = () => ({
  name: '',
  overs: '0.0',
  maidens: 0,
  runs: 0,
  wickets: 0,
  noBalls: 0,
  wides: 0,
  economy: 0
});

export const createEmptyExtras = () => ({
  byes: 0,
  legByes: 0,
  wides: 0,
  noBalls: 0,
  penalty: 0
});

export const createEmptyFallOfWicket = () => ({
  batter: '',
  score: '',
  over: ''
});

export const createEmptyInnings = (teamName = '') => ({
  teamName,
  runs: 0,
  wickets: 0,
  overs: '0.0',
  batters: [createEmptyBatter()],
  bowlers: [createEmptyBowler()],
  extras: createEmptyExtras(),
  fallOfWickets: []
});

export const createEmptyMatchScorecard = () => ({
  matchId: '',
  title: '',
  series: '',
  matchType: MATCH_TYPES.T20,
  venue: '',
  city: '',
  date: new Date().toISOString().split('T')[0],
  startTime: '14:00',
  toss: '',
  result: '',
  innings: [createEmptyInnings('Team A'), createEmptyInnings('Team B')]
});

// Calculation helpers
export const calculateStrikeRate = (runs, balls) => {
  if (balls === 0) return 0;
  return ((runs / balls) * 100).toFixed(2);
};

export const calculateEconomy = (runs, overs) => {
  const oversFloat = parseFloat(overs);
  if (oversFloat === 0) return 0;
  return (runs / oversFloat).toFixed(2);
};

export const calculateTotalExtras = (extras) => {
  return extras.byes + extras.legByes + extras.wides + extras.noBalls + extras.penalty;
};
