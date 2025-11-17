import { useState } from 'react';

export default function CreateMatch({ onMatchCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    sport: 'cricket',
    teamA: '',
    teamB: '',
    scorerWallet: '',
    venue: '',
    city: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.teamA || !formData.teamB || !formData.scorerWallet) {
      alert('Please fill in all required fields');
      return;
    }

    const matchId = `M${Date.now()}`;
    const match = {
      id: matchId,
      ...formData,
      createdAt: new Date().toISOString(),
      scorecard: null,
      txHash: null
    };

    onMatchCreated(match);
    
    // Reset form
    setFormData({
      title: '',
      sport: 'cricket',
      teamA: '',
      teamB: '',
      scorerWallet: '',
      venue: '',
      city: ''
    });
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Match</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Match Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Village Cup Finals"
            className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sport Type</label>
          <select
            value={formData.sport}
            onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          >
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
            <option value="kabaddi">Kabaddi</option>
            <option value="volleyball">Volleyball</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Team A Name</label>
            <input
              type="text"
              value={formData.teamA}
              onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
              placeholder="Team A"
              className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Team B Name</label>
            <input
              type="text"
              value={formData.teamB}
              onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
              placeholder="Team B"
              className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Venue</label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="e.g., Stadium Name"
              className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="e.g., Mumbai"
              className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Authorized Scorer Wallet Address *</label>
          <input
            type="text"
            value={formData.scorerWallet}
            onChange={(e) => setFormData({ ...formData, scorerWallet: e.target.value })}
            placeholder="5..."
            className="w-full bg-dark border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            Only this wallet can submit the official scorecard to blockchain
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          🏏 Create Match
        </button>
      </form>
    </div>
  );
}
