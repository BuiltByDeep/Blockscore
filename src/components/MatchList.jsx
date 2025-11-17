export default function MatchList({ matches, onSelectMatch, selectedMatchId }) {
  if (matches.length === 0) {
    return (
      <div className="bg-surface rounded-lg p-6 text-center text-gray-400">
        <p>No matches created yet. Create your first match above!</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Active Matches</h2>
      
      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            onClick={() => onSelectMatch(match.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedMatchId === match.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{match.title}</h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                {match.sport.toUpperCase()}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-4">
                <span className="text-gray-300">{match.teamA}</span>
                <span className="text-gray-500">vs</span>
                <span className="text-gray-300">{match.teamB}</span>
              </div>
              
              {match.scorecard ? (
                <span className="text-green-400 text-xs flex items-center gap-1">
                  ✓ Scorecard Submitted
                </span>
              ) : (
                <span className="text-yellow-400 text-xs">
                  Pending
                </span>
              )}
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              Match ID: {match.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
