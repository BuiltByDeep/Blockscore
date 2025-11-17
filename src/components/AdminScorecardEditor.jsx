import { useState } from 'react';
import {
  createEmptyMatchScorecard,
  createEmptyBatter,
  createEmptyBowler,
  createEmptyFallOfWicket,
  calculateStrikeRate,
  calculateEconomy,
  calculateTotalExtras,
  MATCH_TYPES,
  DISMISSAL_TYPES
} from '../types/scorecard';

export default function AdminScorecardEditor({ match, onSubmitScorecard, isSubmitting }) {
  const [scorecard, setScorecard] = useState(() => {
    // Initialize with match data if available
    const initial = createEmptyMatchScorecard();
    if (match) {
      initial.matchId = match.id;
      initial.title = match.title;
      initial.innings[0].teamName = match.teamA;
      initial.innings[1].teamName = match.teamB;
    }
    return initial;
  });

  const [activeInnings, setActiveInnings] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Update match details
  const updateMatchDetail = (field, value) => {
    setScorecard({ ...scorecard, [field]: value });
  };

  // Update innings data
  const updateInnings = (inningsIndex, field, value) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex] = { ...newInnings[inningsIndex], [field]: value };
    setScorecard({ ...scorecard, innings: newInnings });
  };

  // Batter operations
  const addBatter = (inningsIndex) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].batters.push(createEmptyBatter());
    setScorecard({ ...scorecard, innings: newInnings });
  };

  const updateBatter = (inningsIndex, batterIndex, field, value) => {
    const newInnings = [...scorecard.innings];
    const batter = { ...newInnings[inningsIndex].batters[batterIndex] };
    batter[field] = value;
    
    // Auto-calculate strike rate
    if (field === 'runs' || field === 'balls') {
      batter.strikeRate = calculateStrikeRate(
        field === 'runs' ? value : batter.runs,
        field === 'balls' ? value : batter.balls
      );
    }
    
    newInnings[inningsIndex].batters[batterIndex] = batter;
    setScorecard({ ...scorecard, innings: newInnings });
  };

  const removeBatter = (inningsIndex, batterIndex) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].batters.splice(batterIndex, 1);
    setScorecard({ ...scorecard, innings: newInnings });
  };

  // Bowler operations
  const addBowler = (inningsIndex) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].bowlers.push(createEmptyBowler());
    setScorecard({ ...scorecard, innings: newInnings });
  };


  const updateBowler = (inningsIndex, bowlerIndex, field, value) => {
    const newInnings = [...scorecard.innings];
    const bowler = { ...newInnings[inningsIndex].bowlers[bowlerIndex] };
    bowler[field] = value;
    
    // Auto-calculate economy
    if (field === 'runs' || field === 'overs') {
      bowler.economy = calculateEconomy(
        field === 'runs' ? value : bowler.runs,
        field === 'overs' ? value : bowler.overs
      );
    }
    
    newInnings[inningsIndex].bowlers[bowlerIndex] = bowler;
    setScorecard({ ...scorecard, innings: newInnings });
  };

  const removeBowler = (inningsIndex, bowlerIndex) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].bowlers.splice(bowlerIndex, 1);
    setScorecard({ ...scorecard, innings: newInnings });
  };

  // Extras operations
  const updateExtras = (inningsIndex, field, value) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].extras[field] = value;
    setScorecard({ ...scorecard, innings: newInnings });
  };

  // Fall of wickets operations
  const addFallOfWicket = (inningsIndex) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].fallOfWickets.push(createEmptyFallOfWicket());
    setScorecard({ ...scorecard, innings: newInnings });
  };

  const updateFallOfWicket = (inningsIndex, fowIndex, field, value) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].fallOfWickets[fowIndex][field] = value;
    setScorecard({ ...scorecard, innings: newInnings });
  };

  const removeFallOfWicket = (inningsIndex, fowIndex) => {
    const newInnings = [...scorecard.innings];
    newInnings[inningsIndex].fallOfWickets.splice(fowIndex, 1);
    setScorecard({ ...scorecard, innings: newInnings });
  };

  const handleSubmit = () => {
    if (!scorecard.title || !scorecard.venue) {
      alert('Please fill in at least Match Title and Venue');
      return;
    }
    onSubmitScorecard(scorecard);
  };

  const currentInnings = scorecard.innings[activeInnings];

  return (
    <div className="space-y-6">
      {/* Match Details Section */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Match Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Match Title *</label>
            <input
              type="text"
              value={scorecard.title}
              onChange={(e) => updateMatchDetail('title', e.target.value)}
              placeholder="e.g., India vs Australia, 1st T20I"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Series / Tournament</label>
            <input
              type="text"
              value={scorecard.series}
              onChange={(e) => updateMatchDetail('series', e.target.value)}
              placeholder="e.g., ICC T20 World Cup 2024"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Match Type</label>
            <select
              value={scorecard.matchType}
              onChange={(e) => updateMatchDetail('matchType', e.target.value)}
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            >
              {Object.values(MATCH_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Venue *</label>
            <input
              type="text"
              value={scorecard.venue}
              onChange={(e) => updateMatchDetail('venue', e.target.value)}
              placeholder="e.g., Rajiv Gandhi International Stadium"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              value={scorecard.city}
              onChange={(e) => updateMatchDetail('city', e.target.value)}
              placeholder="e.g., Hyderabad"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={scorecard.date}
              onChange={(e) => updateMatchDetail('date', e.target.value)}
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <input
              type="time"
              value={scorecard.startTime}
              onChange={(e) => updateMatchDetail('startTime', e.target.value)}
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Toss</label>
            <input
              type="text"
              value={scorecard.toss}
              onChange={(e) => updateMatchDetail('toss', e.target.value)}
              placeholder="e.g., Hyderabad won the toss and chose to bat"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Result</label>
            <input
              type="text"
              value={scorecard.result}
              onChange={(e) => updateMatchDetail('result', e.target.value)}
              placeholder="e.g., Hyderabad won by 5 runs"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>


      {/* Innings Tabs */}
      <div className="bg-surface rounded-lg p-6">
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
          {scorecard.innings.map((innings, index) => (
            <button
              key={index}
              onClick={() => setActiveInnings(index)}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeInnings === index
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Innings {index + 1} - {innings.teamName}
            </button>
          ))}
        </div>

        {/* Innings Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Total Runs</label>
            <input
              type="number"
              value={currentInnings.runs}
              onChange={(e) => updateInnings(activeInnings, 'runs', parseInt(e.target.value) || 0)}
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Wickets</label>
            <input
              type="number"
              value={currentInnings.wickets}
              onChange={(e) => updateInnings(activeInnings, 'wickets', parseInt(e.target.value) || 0)}
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Overs</label>
            <input
              type="text"
              value={currentInnings.overs}
              onChange={(e) => updateInnings(activeInnings, 'overs', e.target.value)}
              placeholder="20.0"
              className="w-full bg-white border-2 border-border text-dark rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Batting Table */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">Batting</h3>
            <button
              onClick={() => addBatter(activeInnings)}
              className="bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add Batter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-border">
                <tr>
                  <th className="px-3 py-2 text-left text-dark font-semibold">Batter</th>
                  <th className="px-3 py-2 text-left text-dark font-semibold">Dismissal</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">R</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">B</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">4s</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">6s</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">SR</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentInnings.batters.map((batter, index) => (
                  <tr key={index} className="border-b border-gray-200 bg-white hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={batter.name}
                        onChange={(e) => updateBatter(activeInnings, index, 'name', e.target.value)}
                        placeholder="Player name"
                        className="w-full bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={batter.dismissal}
                        onChange={(e) => updateBatter(activeInnings, index, 'dismissal', e.target.value)}
                        placeholder="not out"
                        className="w-full bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={batter.runs}
                        onChange={(e) => updateBatter(activeInnings, index, 'runs', parseInt(e.target.value) || 0)}
                        className="w-16 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={batter.balls}
                        onChange={(e) => updateBatter(activeInnings, index, 'balls', parseInt(e.target.value) || 0)}
                        className="w-16 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={batter.fours}
                        onChange={(e) => updateBatter(activeInnings, index, 'fours', parseInt(e.target.value) || 0)}
                        className="w-12 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={batter.sixes}
                        onChange={(e) => updateBatter(activeInnings, index, 'sixes', parseInt(e.target.value) || 0)}
                        className="w-12 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2 text-center text-gray-400">
                      {batter.strikeRate}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeBatter(activeInnings, index)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Bowling Table */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">Bowling</h3>
            <button
              onClick={() => addBowler(activeInnings)}
              className="bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add Bowler
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b-2 border-border">
                <tr>
                  <th className="px-3 py-2 text-left text-dark font-semibold">Bowler</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">O</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">M</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">R</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">W</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">NB</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">WD</th>
                  <th className="px-3 py-2 text-center text-dark font-semibold">Econ</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentInnings.bowlers.map((bowler, index) => (
                  <tr key={index} className="border-b border-gray-200 bg-white hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={bowler.name}
                        onChange={(e) => updateBowler(activeInnings, index, 'name', e.target.value)}
                        placeholder="Bowler name"
                        className="w-full bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={bowler.overs}
                        onChange={(e) => updateBowler(activeInnings, index, 'overs', e.target.value)}
                        placeholder="4.0"
                        className="w-16 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={bowler.maidens}
                        onChange={(e) => updateBowler(activeInnings, index, 'maidens', parseInt(e.target.value) || 0)}
                        className="w-12 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={bowler.runs}
                        onChange={(e) => updateBowler(activeInnings, index, 'runs', parseInt(e.target.value) || 0)}
                        className="w-16 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={bowler.wickets}
                        onChange={(e) => updateBowler(activeInnings, index, 'wickets', parseInt(e.target.value) || 0)}
                        className="w-12 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={bowler.noBalls}
                        onChange={(e) => updateBowler(activeInnings, index, 'noBalls', parseInt(e.target.value) || 0)}
                        className="w-12 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={bowler.wides}
                        onChange={(e) => updateBowler(activeInnings, index, 'wides', parseInt(e.target.value) || 0)}
                        className="w-12 bg-white border-2 border-border text-dark rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2 text-center text-gray-400">
                      {bowler.economy}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => removeBowler(activeInnings, index)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Extras */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Extras</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm mb-1">Byes (b)</label>
              <input
                type="number"
                value={currentInnings.extras.byes}
                onChange={(e) => updateExtras(activeInnings, 'byes', parseInt(e.target.value) || 0)}
                className="w-full bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Leg Byes (lb)</label>
              <input
                type="number"
                value={currentInnings.extras.legByes}
                onChange={(e) => updateExtras(activeInnings, 'legByes', parseInt(e.target.value) || 0)}
                className="w-full bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Wides (w)</label>
              <input
                type="number"
                value={currentInnings.extras.wides}
                onChange={(e) => updateExtras(activeInnings, 'wides', parseInt(e.target.value) || 0)}
                className="w-full bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">No Balls (nb)</label>
              <input
                type="number"
                value={currentInnings.extras.noBalls}
                onChange={(e) => updateExtras(activeInnings, 'noBalls', parseInt(e.target.value) || 0)}
                className="w-full bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Penalty (p)</label>
              <input
                type="number"
                value={currentInnings.extras.penalty}
                onChange={(e) => updateExtras(activeInnings, 'penalty', parseInt(e.target.value) || 0)}
                className="w-full bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Total Extras</label>
              <div className="bg-gray-700 rounded px-3 py-2 text-sm font-bold text-center">
                {calculateTotalExtras(currentInnings.extras)}
              </div>
            </div>
          </div>
        </div>

        {/* Fall of Wickets */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">Fall of Wickets</h3>
            <button
              onClick={() => addFallOfWicket(activeInnings)}
              className="bg-primary hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add Wicket
            </button>
          </div>

          <div className="space-y-2">
            {currentInnings.fallOfWickets.map((fow, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={fow.batter}
                  onChange={(e) => updateFallOfWicket(activeInnings, index, 'batter', e.target.value)}
                  placeholder="Batter name"
                  className="flex-1 bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={fow.score}
                  onChange={(e) => updateFallOfWicket(activeInnings, index, 'score', e.target.value)}
                  placeholder="20-1"
                  className="w-24 bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={fow.over}
                  onChange={(e) => updateFallOfWicket(activeInnings, index, 'over', e.target.value)}
                  placeholder="2.4"
                  className="w-20 bg-white border-2 border-border text-dark rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={() => removeFallOfWicket(activeInnings, index)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {showPreview ? 'Hide Preview' : '👁️ Preview Scorecard'}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-primary hover:bg-pink-600 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {isSubmitting ? '⏳ Submitting to Blockchain...' : '🚀 Submit Scorecard to Blockchain'}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-4 text-dark">Scorecard Preview</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-xs text-dark border border-border">
            {JSON.stringify(scorecard, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
