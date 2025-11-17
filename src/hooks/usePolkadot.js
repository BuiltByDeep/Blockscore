import { useState, useEffect } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { getApi } from '../polkadotApi';

export function usePolkadot() {
  const [api, setApi] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountObj, setAccountObj] = useState(null); // Full account object with meta
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    connectToChain();
    
    // Set a timeout to show error if connection takes too long
    const timeout = setTimeout(() => {
      if (!isApiReady) {
        console.warn('Connection taking longer than expected...');
        setError('Connection is taking longer than expected. The RPC endpoint might be slow or down. Please refresh the page to try again.');
      }
    }, 35000); // 35 seconds
    
    return () => clearTimeout(timeout);
  }, []);

  const connectToChain = async () => {
    try {
      console.log('🔄 Connecting to Paseo blockchain...');
      
      const apiInstance = await getApi();
      
      // Wait for API to be ready with timeout
      console.log('⏳ Waiting for API to be ready...');
      await Promise.race([
        apiInstance.isReady,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('API ready timeout')), 30000)
        )
      ]);
      
      setApi(apiInstance);
      setIsApiReady(true);
      
      const chain = await apiInstance.rpc.system.chain();
      console.log('✅ Connected to Paseo successfully!');
      console.log('📡 Chain:', chain.toString());
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error('❌ Failed to connect to chain:', err);
      setError('Failed to connect to blockchain. Please refresh the page and try again.');
      setIsApiReady(false);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Enable extension
      const extensions = await web3Enable('BlockScore');
      
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      // Get accounts
      const accounts = await web3Accounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please create an account in your wallet.');
      }

      const selectedAccount = accounts[0];
      setAccount(selectedAccount.address);
      setAccountObj(selectedAccount); // Store full account object

      // Get balance with retry
      if (api) {
        try {
          await api.isReady;
          const accountInfo = await api.query.system.account(selectedAccount.address);
          console.log('Account info:', accountInfo.toHuman());
          
          const { data: { free } } = accountInfo;
          // Paseo uses 10 decimals
          const freeBalance = free.toString();
          const balanceInPAS = (Number(freeBalance) / 1e10).toFixed(4);
          setBalance(balanceInPAS);
          console.log('✅ Balance loaded:', balanceInPAS, 'PAS', 'Raw:', freeBalance);
        } catch (balanceErr) {
          console.error('❌ Failed to fetch balance:', balanceErr);
          // Set a placeholder but don't fail
          setBalance('?.????');
        }
      }

      console.log('Wallet connected:', selectedAccount.address);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshBalance = async () => {
    if (api && account) {
      try {
        const accountInfo = await api.query.system.account(account);
        console.log('Account info (refresh):', accountInfo.toHuman());
        
        const { data: { free } } = accountInfo;
        const balanceInPAS = (Number(free.toString()) / 1e10).toFixed(4);
        setBalance(balanceInPAS);
        console.log('Balance refreshed:', balanceInPAS, 'PAS', 'Raw:', free.toString());
      } catch (err) {
        console.error('Failed to refresh balance:', err);
      }
    }
  };

  return {
    api,
    account,
    accountObj, // Export full account object for minting
    balance,
    error,
    loading,
    isApiReady,
    connectWallet,
    refreshBalance
  };
}
