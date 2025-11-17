import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const scrollToRecent = () => {
    document.getElementById('recent-matches')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTournaments = () => {
    document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-b from-cream to-white py-24">
      <div className="w-full px-6 text-center">
        <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
          🏏 Blockchain-Powered Cricket Scoring
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight tracking-tight">
          Bring every locally played sport online<br />
          with permanent, verifiable scorecards.
        </h2>
        <p className="text-lg text-secondary mx-auto mb-10">
          Create tournaments, update full scorecards, and give local players permanent, verifiable stats.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate('/tournaments/new')}
            className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold text-base transition-all hover:shadow-xl hover:scale-105"
          >
            Create Tournament
          </button>
          <button
            onClick={scrollToTournaments}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-base transition-all hover:shadow-lg"
          >
            View Tournaments
          </button>
          <button
            onClick={scrollToRecent}
            className="bg-white hover:bg-cream text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-base transition-all hover:shadow-lg"
          >
            View Recent Matches
          </button>
        </div>
      </div>
    </section>
  );
}
