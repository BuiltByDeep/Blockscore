import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Who can update a match scorecard?',
      answer: 'Only the tournament admin (the wallet that created the tournament) can update scorecards for matches in that tournament. This ensures data integrity and prevents unauthorized changes.'
    },
    {
      question: 'Which blockchain does BlockScore use?',
      answer: 'BlockScore uses Polkadot\'s Paseo AssetHub testnet. All scorecards are stored permanently on-chain using the system.remark extrinsic, making them tamper-proof and verifiable.'
    },
    {
      question: 'Do I need real money to use this?',
      answer: 'No! BlockScore runs on the Paseo testnet, which uses free test tokens (PAS). You can get PAS tokens from the Paseo faucet at faucet.polkadot.io/paseo. Each transaction costs a tiny amount of PAS.'
    },
    {
      question: 'Why focus on local and village cricket?',
      answer: 'Millions of talented players in villages and small towns have no permanent record of their performances. BlockScore gives them the same quality stats as professional players, stored forever on the blockchain. This helps with talent discovery and gives players proof of their achievements.'
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[900px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">Frequently Asked Questions</h2>
        <p className="text-center text-secondary mb-12">Everything you need to know about BlockScore</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-cream/50 rounded-2xl border-2 border-border overflow-hidden hover:border-accent hover:shadow-md transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-cream/50 transition-colors"
              >
                <span className="font-bold text-primary pr-8">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-accent transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-secondary leading-relaxed bg-cream/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
