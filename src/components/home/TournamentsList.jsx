import { useNavigate } from 'react-router-dom';

export default function TournamentsList({ tournaments }) {
  const navigate = useNavigate();

  if (tournaments.length === 0) {
    return (
      <section id="tournaments" className="bg-white py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-8">Active Tournaments</h2>
          <div className="bg-cream rounded-xl border-2 border-primary/20 p-16 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-secondary text-lg mb-6">No tournaments yet. Be the first to create one!</p>
            <button
              onClick={() => navigate('/tournaments/new')}
              className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold transition-all hover:shadow-lg"
            >
              Create Tournament
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tournaments" className="bg-white py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Active Tournaments</h2>
          <button
            onClick={() => navigate('/tournaments/new')}
            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-bold text-sm transition-all hover:shadow-lg"
          >
            + Create Tournament
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => {
            const completedMatches = tournament.matches.filter(m => m.status === 'completed').length;
            const totalMatches = tournament.matches.length;
            const upcomingMatches = tournament.matches.filter(m => m.status === 'not-started').length;
            
            return (
              <div
                key={tournament.id}
                onClick={() => navigate(`/tournaments/${tournament.id}`)}
                className="bg-cream rounded-xl border-2 border-border p-6 hover:shadow-xl hover:border-accent hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-primary group-hover:text-accent transition-colors mb-2">
                      {tournament.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-secondary">
                      <span>📍 {tournament.location}</span>
                    </div>
                  </div>
                  <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold">
                    {tournament.teams.length} Teams
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-secondary">🏟️</span>
                    <span className="text-dark font-medium">{tournament.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-secondary">📅</span>
                    <span className="text-dark font-medium">
                      {new Date(tournament.startDate).toLocaleDateString()}
                      {tournament.endDate && ` - ${new Date(tournament.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>

                {tournament.description && (
                  <p className="text-sm text-secondary mb-4 line-clamp-2">
                    {tournament.description}
                  </p>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-xs text-secondary">Matches</div>
                        <div className="font-bold text-primary">{totalMatches}</div>
                      </div>
                      <div>
                        <div className="text-xs text-secondary">Completed</div>
                        <div className="font-bold text-accent">{completedMatches}</div>
                      </div>
                      {upcomingMatches > 0 && (
                        <div>
                          <div className="text-xs text-secondary">Upcoming</div>
                          <div className="font-bold text-dark">{upcomingMatches}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {totalMatches > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-cream rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-accent h-full transition-all"
                        style={{ width: `${(completedMatches / totalMatches) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-secondary mt-1 text-right">
                      {Math.round((completedMatches / totalMatches) * 100)}% Complete
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
