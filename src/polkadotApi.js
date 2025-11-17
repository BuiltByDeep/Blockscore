// src/polkadotApi.js
import { ApiPromise, WsProvider } from "@polkadot/api";

// Paseo Asset Hub RPC endpoints (matching Talisman configuration)
const RPC_ENDPOINTS = [
  "wss://sys.ibp.network/asset-hub-paseo",
  "wss://asset-hub-paseo.dotters.network",
  "wss://pas-rpc.stakeworld.io/assethub",
  "wss://sys.turboflakes.io/asset-hub-paseo"
];

let apiPromise = null;
let currentEndpointIndex = 0;

export function getApi() {
  if (!apiPromise) {
    const endpoint = RPC_ENDPOINTS[currentEndpointIndex];
    console.log('Connecting to Paseo RPC:', endpoint);
    
    const provider = new WsProvider(endpoint, 1000, {}, 10000);
    
    // Add connection event listeners
    provider.on('connected', () => {
      console.log('✅ WebSocket connected to:', endpoint);
    });
    
    provider.on('disconnected', () => {
      console.log('❌ WebSocket disconnected from:', endpoint);
    });
    
    provider.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
    
    apiPromise = ApiPromise.create({ provider })
      .catch(err => {
        console.error('Failed to connect to', endpoint, err);
        // Try next endpoint
        apiPromise = null;
        currentEndpointIndex = (currentEndpointIndex + 1) % RPC_ENDPOINTS.length;
        throw err;
      });
  }
  return apiPromise;
}

export function resetApi() {
  apiPromise = null;
}
