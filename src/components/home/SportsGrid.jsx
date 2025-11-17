export default function SportsGrid() {
  const sports = [
    { name: 'Cricket', status: 'active', icon: '🏏' },
    { name: 'Football', status: 'coming-soon', icon: '⚽' },
    { name: 'Baseball', status: 'coming-soon', icon: '⚾' },
    { name: 'Volleyball', status: 'coming-soon', icon: '🏐' },
    { name: 'Basketball', status: 'coming-soon', icon: '🏀' },
    { name: 'Other', status: 'coming-soon', icon: '🏆' },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Tinted Background Panel */}
        <div className="bg-gradient-to-br from-cream to-surface rounded-2xl p-8 md:p-12 shadow-md">
          <h2 className="text-3xl font-bold text-primary mb-8">Supported Sports</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className={`rounded-2xl border-2 p-8 text-center transition-all ${
                sport.status === 'active'
                  ? 'border-accent bg-white shadow-lg hover:shadow-2xl cursor-pointer hover:scale-105 hover:-translate-y-1'
                  : 'border-border bg-white/60 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="text-4xl mb-3">{sport.icon}</div>
              <h3 className={`font-bold text-base mb-2 ${
                sport.status === 'active' ? 'text-primary' : 'text-secondary'
              }`}>
                {sport.name}
              </h3>
              {sport.status === 'active' ? (
                <span className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Active Now
                </span>
              ) : (
                <span className="text-secondary text-xs font-medium">Coming soon</span>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
