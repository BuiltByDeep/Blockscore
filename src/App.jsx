import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateTournamentPage from './pages/CreateTournamentPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import MatchDetailPage from './pages/MatchDetailPage';
import { usePolkadot } from './hooks/usePolkadot';
import { submitScoreToBlockchain } from './onchain/submitScoreToPaseo';

function App() {
  const [tournaments, setTournaments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { account, accountObj, balance, isApiReady, connectWallet, refreshBalance } = usePolkadot();

  // Load tournaments from localStorage
  useEffect(() => {
    const savedTournaments = localStorage.getItem('blockscore_tournaments');
    if (savedTournaments) {
      setTournaments(JSON.parse(savedTournaments));
    }
  }, []);

  // Save tournaments to localStorage
  useEffect(() => {
    if (tournaments.length > 0) {
      localStorage.setItem('blockscore_tournaments', JSON.stringify(tournaments));
    }
  }, [tournaments]);

  const handleCreateTournament = (tournament) => {
    setTournaments([...tournaments, tournament]);
  };

  const handleUpdateTournament = (updatedTournament) => {
    setTournaments(tournaments.map(t => 
      t.id === updatedTournament.id ? updatedTournament : t
    ));
  };

  const handleSubmitScorecard = async (matchId, scorecard) => {
    if (!accountObj) {
      alert('Please connect your Polkadot wallet first!');
      return;
    }

    if (!isApiReady) {
      alert('Blockchain connection not ready. Please wait a moment and try again.');
      return;
    }

    // Find the match and tournament
    let match = null;
    let tournament = null;
    
    for (const t of tournaments) {
      const m = t.matches.find(m => m.id === matchId);
      if (m) {
        match = m;
        tournament = t;
        break;
      }
    }

    if (!match || !tournament) {
      alert('Match not found!');
      return;
    }

    // Verify authorization
    const isAuthorized = account.toLowerCase() === tournament.adminWallet.toLowerCase();
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting complete scorecard to Paseo blockchain...');
      
      // Submit the entire scorecard as one transaction
      const result = await submitScoreToBlockchain(accountObj, matchId, {
        type: 'FULL_SCORECARD',
        tournamentId: tournament.id,
        tournamentName: tournament.name,
        scorecard: scorecard
      });
      
      // Update match with the complete scorecard
      const updatedMatch = {
        ...match,
        scorecard: scorecard,
        submittedAt: new Date().toISOString(),
        submitter: account,
        verified: isAuthorized,
        txHash: result.txHash,
        blockNumber: result.blockNumber,
        status: 'completed'
      };

      // Update tournament with updated match
      const updatedTournament = {
        ...tournament,
        matches: tournament.matches.map(m => 
          m.id === matchId ? updatedMatch : m
        )
      };

      setTournaments(tournaments.map(t => 
        t.id === tournament.id ? updatedTournament : t
      ));
      
      alert(
        `🎉 Complete scorecard stored on blockchain!\n\n` +
        `Transaction Hash: ${result.txHash}\n` +
        `Block Number: ${result.blockNumber}\n\n` +
        `Your scorecard is now permanently on-chain!`
      );
      
    } catch (error) {
      console.error('Scorecard submission failed:', error);
      
      let errorMessage = error.message || 'Unknown error';
      
      if (errorMessage.includes('1010') || errorMessage.includes('balance too low')) {
        errorMessage = 
          'Insufficient balance to pay transaction fees.\n\n' +
          'Get free testnet tokens from:\n' +
          'https://faucet.polkadot.io/paseo\n\n' +
          'Your address: ' + account;
      } else if (errorMessage.includes('Cancelled')) {
        errorMessage = 'Transaction was cancelled by user.';
      }
      
      alert(`Blockchain submission failed:\n\n${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get all matches from all tournaments for home page
  const allMatches = tournaments.flatMap(t => 
    t.matches.map(m => ({ ...m, tournamentName: t.name }))
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage
              account={account}
              balance={balance}
              onConnect={connectWallet}
              onRefreshBalance={refreshBalance}
              matches={allMatches}
              tournaments={tournaments}
            />
          } 
        />
        <Route 
          path="/tournaments/new" 
          element={
            <CreateTournamentPage
              account={account}
              balance={balance}
              onConnect={connectWallet}
              onRefreshBalance={refreshBalance}
              onCreateTournament={handleCreateTournament}
            />
          } 
        />
        <Route 
          path="/tournaments/:id" 
          element={
            <TournamentDetailPage
              account={account}
              balance={balance}
              onConnect={connectWallet}
              onRefreshBalance={refreshBalance}
              tournaments={tournaments}
              onUpdateTournament={handleUpdateTournament}
            />
          } 
        />
        <Route 
          path="/matches/:id" 
          element={
            <MatchDetailPage
              account={account}
              balance={balance}
              onConnect={connectWallet}
              onRefreshBalance={refreshBalance}
              tournaments={tournaments}
              onSubmitScorecard={handleSubmitScorecard}
              isSubmitting={isSubmitting}
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
