import { useNavigate } from 'react-router-dom';

export default function RecentMatches({ matches }) {
  const navigate = useNavigate();
  
  // Get last 5 matches with scorecards
  const recentMatches = matches
    .filter(m => m.scorecard)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  if (recentMatches.length === 0) {
    return (
      <section id="recent-matches" className="bg-surface py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Elevated Card Container */}
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">Recently Updated Matches</h2>
            <div className="bg-cream rounded-xl border-2 border-accent/20 p-16 text-center">
              <div className="text-6xl mb-4">🏏</div>
              <p className="text-secondary text-lg">No matches recorded yet. Create a tournament to get started!</p>
              <button
                onClick={() => navigate('/tournaments/new')}
                className="mt-6 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Create Your First Tournament
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="recent-matches" className="bg-surface py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Elevated Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Recently Updated Matches</h2>
          
          <div className="space-y-4">
          {recentMatches.map((match) => {
            const scorecard = match.scorecard;
            const innings1 = scorecard.innings[0];
            const innings2 = scorecard.innings[1];
            
            return (
              <div
                key={match.id}
                onClick={() => navigate(`/matches/${match.id}`)}
                className="bg-cream/50 rounded-xl border-2 border-border p-6 hover:shadow-md hover:border-accent hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {match.tournamentName && (
                        <span className="text-xs text-secondary font-medium">{match.tournamentName}</span>
                      )}
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                        {scorecard.matchType}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">
                      {scorecard.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm text-secondary mb-1 font-medium">{innings1.teamName}</div>
                      <div className="text-3xl font-bold text-primary">{innings1.runs}/{innings1.wickets}</div>
                    </div>
                    <div className="text-accent font-bold text-xl">vs</div>
                    <div className="text-right">
                      <div className="text-sm text-secondary mb-1 font-medium">{innings2.teamName}</div>
                      <div className="text-3xl font-bold text-primary">{innings2.runs}/{innings2.wickets}</div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-8">
                    <div className="text-xs text-secondary font-medium">
                      {new Date(match.submittedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-secondary mt-1">
                      {scorecard.venue}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
