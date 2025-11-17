# BlockScore 🏏

**Complete cricket scorecards, stored forever on the blockchain.**

BlockScore is a comprehensive Web3 cricket scorecard platform that allows match organizers to create professional Cricbuzz-style scorecards and submit them to the Polkadot blockchain for permanent, tamper-proof storage.

## 🎯 Problem Statement

Millions of local village athletes play cricket, football, kabaddi, and other sports every day, but:
- None of their match scores or player stats are recorded
- Scorebooks get lost or damaged
- Records can be manipulated
- No digital proof of performance
- Zero visibility for local talent

## 💡 Solution

BlockScore creates **verified digital sports history** for players who never had stats before by:
- Storing scores permanently on the Polkadot blockchain
- Validating authorized scorers through wallet signatures
- Creating tamper-proof, timestamped match records
- Providing transparent and accessible match history

## ✨ Features

### Complete Scorecard System
- ✅ **Tournament Management**: Create tournaments and organize teams
- ✅ **Match Creation**: Schedule matches with full details (venue, city, date, time)
- ✅ **Authorized Scorers**: Assign wallet addresses for verified score submission
- ✅ **Professional Scorecard Editor**:
  - Full batting table (runs, balls, 4s, 6s, strike rate, dismissals)
  - Full bowling table (overs, maidens, runs, wickets, economy, extras)
  - Extras breakdown (byes, leg byes, wides, no balls, penalty)
  - Fall of wickets tracking
  - Match details (toss, result, series, venue)
- ✅ **Blockchain Submission**: Submit entire scorecard to blockchain in one transaction
- ✅ **Beautiful Display**: Cricbuzz-inspired scorecard viewing experience
- ✅ **Auto-calculations**: Strike rates, economy rates, and totals calculated automatically
- ✅ **Transaction Verification**: View all submissions on Paseo blockchain explorer

### Supported Sports
- **Cricket**: Complete scorecard with all statistics
- **Football, Kabaddi, Volleyball**: Coming soon with full stats

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Blockchain**: Polkadot Paseo AssetHub (Testnet)
- **Wallet Integration**: Talisman / SubWallet
- **API**: Polkadot.js
- **Storage**: On-chain (system.remark) + Local storage for metadata

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- Polkadot wallet extension (Talisman or SubWallet)
- PAS testnet tokens from [Paseo Faucet](https://faucet.polkadot.io/paseo)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd blockscore

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Quick Start Guide

1. **Connect Wallet**
   - Install Talisman or SubWallet extension
   - Get PAS testnet tokens from the faucet
   - Click "Connect Wallet" in the header

2. **Create Tournament**
   - Click "Create Tournament" button
   - Fill in tournament name, sport, and dates
   - Add participating teams

3. **Schedule Match**
   - Select teams from your tournament
   - Set match date, time, and venue
   - Assign authorized scorer wallet address

4. **Fill Scorecard**
   - Click on a match to open the scorecard editor
   - Enter match details (toss, result, series)
   - Add batting statistics for both innings
   - Add bowling figures for both innings
   - Enter extras and fall of wickets

5. **Submit to Blockchain**
   - Review your scorecard
   - Click "Submit Scorecard to Blockchain"
   - Sign the transaction with your wallet
   - View confirmation on Paseo explorer

6. **View & Share**
   - Beautiful Cricbuzz-style scorecard display
   - Share match link with players and fans
   - All data permanently stored on blockchain

## 🔒 Security & Validation

- **Authorized Scorers**: Only designated wallet addresses can submit official scores
- **Wallet Signatures**: All transactions require wallet signature verification
- **Tamper-Proof**: Once submitted, scorecards cannot be altered
- **Transparent**: All submissions visible on public blockchain explorer
- **Verification Status**: Unverified submissions are clearly marked

## 🌐 Blockchain Details

- **Network**: Polkadot Paseo AssetHub (Testnet)
- **RPC Endpoint**: wss://paseo-asset-hub-rpc.polkadot.io
- **Explorer**: https://assethub-paseo.subscan.io
- **Storage Method**: `system.remark` extrinsic for on-chain data
- **Transaction Format**: JSON-encoded scorecard data

## 📱 User Interface

- **Modern Landing Page**: Hero section, features, and recent matches
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Theme**: Clean, professional color scheme
- **Intuitive Navigation**: Easy-to-use interface for all users
- **Real-time Updates**: Live transaction status and confirmations

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Complete cricket scorecard system
- ✅ Tournament management
- ✅ Blockchain integration

### Phase 2 (Coming Soon)
- [ ] Player profiles and career statistics
- [ ] Tournament brackets and standings
- [ ] Multi-sport support (Football, Kabaddi, Volleyball)
- [ ] Advanced analytics and insights

### Phase 3 (Future)
- [ ] AI-powered match commentary
- [ ] NFT trophies and achievements
- [ ] Mobile app (iOS & Android)
- [ ] Live scoring during matches
- [ ] Social features and player networking

## 🤝 Contributing

BlockScore is built for the Polkadot Hackathon 2025. We welcome contributions!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built on Polkadot blockchain technology
- Inspired by Cricbuzz scorecard design
- Created for local athletes and sports communities

## 📞 Support

For questions, issues, or feedback:
- Open an issue on GitHub
- Contact the development team

---

**BlockScore** - Giving local athletes the recognition they deserve 🏆

*Powered by Polkadot Blockchain*
