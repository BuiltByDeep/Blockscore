import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import RecentMatches from '../components/home/RecentMatches';
import TournamentsList from '../components/home/TournamentsList';
import SportsGrid from '../components/home/SportsGrid';
import HowItWorks from '../components/home/HowItWorks';
import FAQ from '../components/home/FAQ';

export default function HomePage({ 
  account, 
  balance, 
  onConnect, 
  onRefreshBalance,
  matches,
  tournaments 
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header 
        account={account}
        balance={balance}
        onConnect={onConnect}
        onRefreshBalance={onRefreshBalance}
      />
      
      <Hero />
      <TournamentsList tournaments={tournaments} />
      <RecentMatches matches={matches} />
      <SportsGrid />
      <HowItWorks />
      <FAQ />
      
      <footer className="bg-primary text-white py-12">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">BlockScore</h3>
            <p className="text-white/80 mb-6">
              Built on Polkadot Paseo · Made for local cricket communities 🏏
            </p>
            <div className="flex justify-center gap-6 text-sm text-white/60">
              <a href="https://faucet.polkadot.io/paseo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Get Testnet Tokens
              </a>
              <span>•</span>
              <a href="https://assethub-paseo.subscan.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                View Explorer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
