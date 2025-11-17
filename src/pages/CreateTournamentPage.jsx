import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/home/Header';
import { createEmptyTournament } from '../types/tournament';

export default function CreateTournamentPage({ 
  account, 
  balance, 
  onConnect, 
  onRefreshBalance,
  onCreateTournament 
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const tournament = createEmptyTournament();
    tournament.adminWallet = account || '';
    return tournament;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.name || !formData.location || !formData.venue) {
      alert('Please fill in all required fields');
      return;
    }

    const tournamentId = `T${Date.now()}`;
    const tournament = {
      ...formData,
      id: tournamentId,
      adminWallet: account,
      createdAt: new Date().toISOString()
    };

    onCreateTournament(tournament);
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header 
        account={account}
        balance={balance}
        onConnect={onConnect}
        onRefreshBalance={onRefreshBalance}
      />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-dark flex items-center gap-2"
          >
            ← Back to Home
          </button>
        </div>

        <div className="bg-white rounded-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Create a Tournament</h1>
          <p className="text-secondary mb-8">Set up a new cricket tournament and start recording matches.</p>

          {!account && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              Please connect your wallet to create a tournament
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Tournament Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Village Cup 2024"
                className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Location (City/Village) *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Hyderabad"
                  className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Ground / Venue *
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g., Village Cricket Ground"
                  className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us about this tournament..."
                rows="4"
                className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="bg-surface border border-border rounded-lg p-4">
              <label className="block text-sm font-semibold text-dark mb-2">
                Tournament Admin Wallet
              </label>
              <div className="font-mono text-sm text-secondary bg-white px-4 py-3 rounded border border-border">
                {account || 'Not connected'}
              </div>
              <p className="text-xs text-secondary mt-2">
                Only this wallet will be allowed to update scores for this tournament.
              </p>
            </div>

            <button
              type="submit"
              disabled={!account}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Create Tournament
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
