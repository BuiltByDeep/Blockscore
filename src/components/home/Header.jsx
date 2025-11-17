import { useNavigate } from 'react-router-dom';

export default function Header({ account, balance, onConnect, onRefreshBalance }) {
  const navigate = useNavigate();

  const scrollToTournaments = () => {
    const tournamentsSection = document.getElementById('tournaments');
    if (tournamentsSection) {
      tournamentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-xl font-bold text-primary tracking-tight">BlockScore</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {account ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-secondary">Connected</div>
                <div className="font-mono text-xs text-primary font-medium">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-cream px-3 py-1.5 rounded-lg border border-accent/20">
                <div className="text-sm font-semibold text-accent">
                  {balance || '0.0000'} PAS
                </div>
                {onRefreshBalance && (
                  <button
                    onClick={onRefreshBalance}
                    className="text-xs text-secondary hover:text-accent transition-colors"
                    title="Refresh balance"
                  >
                    🔄
                  </button>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
