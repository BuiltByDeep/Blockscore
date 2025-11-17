/**
 * Tournament Type Definitions
 */

export const createEmptyTournament = () => ({
  id: '',
  name: '',
  location: '',
  venue: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  description: '',
  adminWallet: '',
  teams: [],
  matches: [],
  createdAt: new Date().toISOString()
});

export const createEmptyTeam = () => ({
  id: '',
  name: '',
  players: []
});

export const createEmptyMatch = () => ({
  id: '',
  title: '',
  teamA: '',
  teamB: '',
  date: new Date().toISOString().split('T')[0],
  time: '14:00',
  status: 'not-started', // 'not-started', 'in-progress', 'completed'
  scorecard: null,
  txHash: null
});
