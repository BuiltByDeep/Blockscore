import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/home/Header';

export default function TournamentDetailPage({ 
  account, 
  balance, 
  onConnect, 
  onRefreshBalance,
  tournaments,
  onUpdateTournament
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tournament = tournaments.find(t => t.id === id);

  const [newTeamName, setNewTeamName] = useState('');
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [newMatch, setNewMatch] = useState({
    title: '',
    teamA: '',
    teamB: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00'
  });

  if (!tournament) {
    return (
      <div className="min-h-screen bg-surface">
        <Header account={account} balance={balance} onConnect={onConnect} onRefreshBalance={onRefreshBalance} />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-dark mb-4">Tournament not found</h1>
          <button onClick={() => navigate('/')} className="text-primary hover:text-primary-dark">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isAdmin = account && account.toLowerCase() === tournament.adminWallet.toLowerCase();

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    
    const updatedTournament = {
      ...tournament,
      teams: [...tournament.teams, { id: `TEAM${Date.now()}`, name: newTeamName.trim() }]
    };
    onUpdateTournament(updatedTournament);
    setNewTeamName('');
  };

  const handleAddMatch = (e) => {
    e.preventDefault();
    if (!newMatch.title || !newMatch.teamA || !newMatch.teamB) {
      alert('Please fill in all match fields');
      return;
    }

    const match = {
      ...newMatch,
      id: `M${Date.now()}`,
      tournamentId: tournament.id,
      tournamentName: tournament.name,
      status: 'not-started',
      scorecard: null,
      txHash: null
    };

    const updatedTournament = {
      ...tournament,
      matches: [...tournament.matches, match]
    };
    onUpdateTournament(updatedTournament);
    setShowAddMatch(false);
    setNewMatch({
      title: '',
      teamA: '',
      teamB: '',
      date: new Date().toISOString().split('T')[0],
      time: '14:00'
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header account={account} balance={balance} onConnect={onConnect} onRefreshBalance={onRefreshBalance} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <button onClick={() => navigate('/')} className="text-primary hover:text-primary-dark flex items-center gap-2">
            ← Back to Home
          </button>
        </div>

        {/* Tournament Header */}
        <div className="bg-white rounded-lg border border-border p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-dark mb-2">{tournament.name}</h1>
              <div className="flex gap-4 text-secondary text-sm">
                <span>📍 {tournament.location}</span>
                <span>🏟️ {tournament.venue}</span>
                <span>📅 {new Date(tournament.startDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
              <span className="text-primary font-semibold text-sm">Admin</span>
            </div>
          </div>
          
          {tournament.description && (
            <p className="text-secondary mt-4">{tournament.description}</p>
          )}
          
          <div className="mt-4 text-xs text-secondary font-mono">
            Admin: {tournament.adminWallet.slice(0, 10)}...{tournament.adminWallet.slice(-6)}
          </div>
        </div>

        {!isAdmin && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-8">
            Only the tournament admin wallet can update this tournament.
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Teams Section */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h2 className="text-2xl font-bold text-dark mb-4">Teams</h2>
            
            {isAdmin && (
              <form onSubmit={handleAddTeam} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Team name"
                    className="flex-1 border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!isAdmin}
                  />
                  <button
                    type="submit"
                    disabled={!isAdmin}
                    className="bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Add Team
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {tournament.teams.length === 0 ? (
                <p className="text-secondary text-sm">No teams added yet</p>
              ) : (
                tournament.teams.map((team) => (
                  <div key={team.id} className="bg-surface px-4 py-3 rounded-lg border border-border">
                    <span className="font-semibold text-dark">{team.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Matches Section */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">Matches</h2>
              {isAdmin && !showAddMatch && (
                <button
                  onClick={() => setShowAddMatch(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  + Add Match
                </button>
              )}
            </div>

            {showAddMatch && isAdmin && (
              <form onSubmit={handleAddMatch} className="mb-4 p-4 bg-surface rounded-lg border border-border">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newMatch.title}
                    onChange={(e) => setNewMatch({ ...newMatch, title: e.target.value })}
                    placeholder="Match title (e.g., Semi Final 1)"
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newMatch.teamA}
                      onChange={(e) => setNewMatch({ ...newMatch, teamA: e.target.value })}
                      className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Team A</option>
                      {tournament.teams.map(team => (
                        <option key={team.id} value={team.name}>{team.name}</option>
                      ))}
                    </select>
                    <select
                      value={newMatch.teamB}
                      onChange={(e) => setNewMatch({ ...newMatch, teamB: e.target.value })}
                      className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Team B</option>
                      {tournament.teams.map(team => (
                        <option key={team.id} value={team.name}>{team.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={newMatch.date}
                      onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                      className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="time"
                      value={newMatch.time}
                      onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                      className="border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Add Match
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddMatch(false)}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {tournament.matches.length === 0 ? (
                <p className="text-secondary text-sm">No matches scheduled yet</p>
              ) : (
                tournament.matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => navigate(`/matches/${match.id}`)}
                    className="bg-surface px-4 py-3 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-dark">{match.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        match.status === 'completed' ? 'bg-primary/10 text-primary' :
                        match.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {match.status === 'not-started' ? 'Not Started' :
                         match.status === 'in-progress' ? 'In Progress' :
                         'Completed'}
                      </span>
                    </div>
                    <div className="text-sm text-secondary">
                      {match.teamA} vs {match.teamB}
                    </div>
                    <div className="text-xs text-secondary mt-1">
                      {new Date(match.date).toLocaleDateString()} • {match.time}
                    </div>
                    {match.txHash && (
                      <div className="mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          On-chain ✅
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
