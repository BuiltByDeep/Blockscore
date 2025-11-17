import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/home/Header';
import AdminScorecardEditor from '../components/AdminScorecardEditor';
import ScorecardDisplay from '../components/ScorecardDisplay';

export default function MatchDetailPage({ 
  account, 
  balance, 
  onConnect, 
  onRefreshBalance,
  tournaments,
  onSubmitScorecard,
  isSubmitting
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('editor');

  // Find match across all tournaments
  let match = null;
  let tournament = null;
  
  for (const t of tournaments) {
    const m = t.matches.find(m => m.id === id);
    if (m) {
      match = m;
      tournament = t;
      break;
    }
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-surface">
        <Header account={account} balance={balance} onConnect={onConnect} onRefreshBalance={onRefreshBalance} />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-dark mb-4">Match not found</h1>
          <button onClick={() => navigate('/')} className="text-primary hover:text-primary-dark">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isAdmin = account && tournament && account.toLowerCase() === tournament.adminWallet.toLowerCase();

  // Auto-switch to display if scorecard exists
  if (match.scorecard && viewMode === 'editor') {
    setViewMode('display');
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header account={account} balance={balance} onConnect={onConnect} onRefreshBalance={onRefreshBalance} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <button 
            onClick={() => navigate(tournament ? `/tournaments/${tournament.id}` : '/')} 
            className="text-primary hover:text-primary-dark flex items-center gap-2"
          >
            ← Back to Tournament
          </button>
        </div>

        {/* Match Header */}
        <div className="bg-white rounded-xl border-2 border-border p-8 mb-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-3">{match.title}</h1>
              <div className="text-xl text-dark font-semibold mb-2">
                {match.teamA} <span className="text-accent mx-2">vs</span> {match.teamB}
              </div>
              {tournament && (
                <div className="flex items-center gap-3 mt-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {tournament.name}
                  </span>
                  <span className="text-secondary text-sm">
                    {new Date(match.date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
            {match.txHash && (
              <a
                href={`https://assethub-paseo.subscan.io/extrinsic/${match.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg text-sm font-bold transition-all hover:shadow-lg flex items-center gap-2"
              >
                View on Explorer →
              </a>
            )}
          </div>
        </div>

        {!isAdmin && (
          <div className="bg-yellow-50 border-2 border-yellow-400 text-yellow-900 px-6 py-4 rounded-xl mb-6 font-medium">
            ⚠️ Only the tournament admin can update this match scorecard.
          </div>
        )}

        {/* View Mode Toggle */}
        {match.scorecard && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setViewMode('editor')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                viewMode === 'editor'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-primary border-2 border-primary hover:bg-cream'
              }`}
            >
              📝 Edit Scorecard
            </button>
            <button
              onClick={() => setViewMode('display')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                viewMode === 'display'
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-white text-accent border-2 border-accent hover:bg-cream'
              }`}
            >
              👁️ View Scorecard
            </button>
          </div>
        )}

        {/* Content */}
        {viewMode === 'editor' ? (
          <AdminScorecardEditor
            match={match}
            onSubmitScorecard={(scorecard) => onSubmitScorecard(match.id, scorecard)}
            isSubmitting={isSubmitting}
          />
        ) : (
          <ScorecardDisplay scorecard={match.scorecard} />
        )}
      </main>
    </div>
  );
}
