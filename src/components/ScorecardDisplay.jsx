import { calculateTotalExtras } from '../types/scorecard';

export default function ScorecardDisplay({ scorecard }) {
  if (!scorecard) {
    return (
      <div className="bg-white rounded-xl border-2 border-border p-12 text-center shadow-sm">
        <p className="text-secondary text-lg">No scorecard data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-3">{scorecard.title}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          {scorecard.series && (
            <div>
              <div className="text-white/70 text-xs mb-1">Series</div>
              <div className="font-semibold">{scorecard.series}</div>
            </div>
          )}
          <div>
            <div className="text-white/70 text-xs mb-1">Match Type</div>
            <div className="font-semibold">{scorecard.matchType}</div>
          </div>
          <div>
            <div className="text-white/70 text-xs mb-1">Venue</div>
            <div className="font-semibold">{scorecard.venue}</div>
          </div>
          {scorecard.city && (
            <div>
              <div className="text-white/70 text-xs mb-1">City</div>
              <div className="font-semibold">{scorecard.city}</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div>
            <div className="text-white/70 text-xs mb-1">Date</div>
            <div className="font-semibold">{new Date(scorecard.date).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-white/70 text-xs mb-1">Start Time</div>
            <div className="font-semibold">{scorecard.startTime}</div>
          </div>
          {scorecard.toss && (
            <div className="md:col-span-1">
              <div className="text-white/70 text-xs mb-1">Toss</div>
              <div className="font-semibold">{scorecard.toss}</div>
            </div>
          )}
        </div>

        {scorecard.result && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 text-lg font-bold bg-accent text-white px-4 py-3 rounded-lg">
              <span className="text-2xl">🏆</span>
              {scorecard.result}
            </div>
          </div>
        )}
      </div>

      {/* Innings */}
      {scorecard.innings.map((innings, inningsIndex) => (
        <div key={inningsIndex} className="bg-white rounded-xl border-2 border-border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-primary/20">
            <h2 className="text-2xl font-bold text-primary">{innings.teamName}</h2>
            <div className="text-right">
              <div className="text-4xl font-bold text-accent">
                {innings.runs}/{innings.wickets}
              </div>
              <div className="text-sm text-secondary font-medium">({innings.overs} overs)</div>
            </div>
          </div>

          {/* Batting Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-xl">🏏</span>
              Batting
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cream border-b-2 border-primary/20">
                    <th className="px-4 py-3 text-left font-bold text-primary">Batter</th>
                    <th className="px-4 py-3 text-left font-bold text-primary">Dismissal</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">R</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">B</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">4s</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">6s</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {innings.batters.filter(b => b.name).map((batter, index) => (
                    <tr key={index} className="border-b border-border hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-dark">{batter.name}</td>
                      <td className="px-4 py-3 text-secondary text-xs">{batter.dismissal}</td>
                      <td className="px-4 py-3 text-center font-bold text-dark">{batter.runs}</td>
                      <td className="px-4 py-3 text-center text-dark">{batter.balls}</td>
                      <td className="px-4 py-3 text-center text-dark">{batter.fours}</td>
                      <td className="px-4 py-3 text-center text-dark">{batter.sixes}</td>
                      <td className="px-4 py-3 text-center text-secondary font-medium">{batter.strikeRate}</td>
                    </tr>
                  ))}
                  {/* Extras Row */}
                  <tr className="border-t-2 border-primary/20 bg-cream/50">
                    <td className="px-4 py-3 font-bold text-primary" colSpan="2">
                      Extras (b {innings.extras.byes}, lb {innings.extras.legByes}, w {innings.extras.wides}, nb {innings.extras.noBalls}, p {innings.extras.penalty})
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-dark" colSpan="5">
                      {calculateTotalExtras(innings.extras)}
                    </td>
                  </tr>
                  {/* Total Row */}
                  <tr className="bg-primary text-white font-bold">
                    <td className="px-4 py-3" colSpan="2">TOTAL</td>
                    <td className="px-4 py-3 text-center text-xl">{innings.runs}</td>
                    <td className="px-4 py-3 text-center" colSpan="4">
                      ({innings.wickets} wkts, {innings.overs} ov)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bowling Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-xl">⚾</span>
              Bowling
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cream border-b-2 border-primary/20">
                    <th className="px-4 py-3 text-left font-bold text-primary">Bowler</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">O</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">M</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">R</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">W</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">NB</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">WD</th>
                    <th className="px-4 py-3 text-center font-bold text-primary">Econ</th>
                  </tr>
                </thead>
                <tbody>
                  {innings.bowlers.filter(b => b.name).map((bowler, index) => (
                    <tr key={index} className="border-b border-border hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-dark">{bowler.name}</td>
                      <td className="px-4 py-3 text-center text-dark">{bowler.overs}</td>
                      <td className="px-4 py-3 text-center text-dark">{bowler.maidens}</td>
                      <td className="px-4 py-3 text-center text-dark">{bowler.runs}</td>
                      <td className="px-4 py-3 text-center font-bold text-accent">{bowler.wickets}</td>
                      <td className="px-4 py-3 text-center text-secondary text-xs">{bowler.noBalls}</td>
                      <td className="px-4 py-3 text-center text-secondary text-xs">{bowler.wides}</td>
                      <td className="px-4 py-3 text-center text-secondary font-medium">{bowler.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fall of Wickets */}
          {innings.fallOfWickets.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="text-xl">📉</span>
                Fall of Wickets
              </h3>
              <div className="flex flex-wrap gap-3">
                {innings.fallOfWickets.map((fow, index) => (
                  <div key={index} className="bg-cream border-2 border-primary/20 px-4 py-3 rounded-lg">
                    <div className="font-bold text-accent text-lg">{fow.score}</div>
                    <div className="text-dark font-medium text-sm">{fow.batter}</div>
                    <div className="text-secondary text-xs">({fow.over} ov)</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
