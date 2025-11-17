import { web3FromSource } from "@polkadot/extension-dapp";
import { getApi } from "../polkadotApi";

/**
 * Submit score update to Paseo blockchain using system.remark
 * This stores the score update permanently on-chain
 */
export async function submitScoreToBlockchain(account, matchId, scoreData) {
  const api = await getApi();
  await api.isReady;

  // Get signer from the extension
  const injector = await web3FromSource(account.meta.source);
  api.setSigner(injector.signer);

  // Prepare score metadata
  const metadata = {
    type: "SCORE_UPDATE",
    version: "1.0",
    matchId: matchId,
    teamAScore: scoreData.teamAScore || "",
    teamBScore: scoreData.teamBScore || "",
    scorer: scoreData.scorer || "",
    comment: scoreData.comment || "",
    timestamp: Date.now(),
    submitter: account.address,
    appVersion: "1.0.0"
  };

  // Create remark with metadata
  const remarkData = `BLOCKSCORE:${JSON.stringify(metadata)}`;
  const tx = api.tx.system.remark(remarkData);

  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await tx.signAndSend(
        account.address,
        { signer: injector.signer },
        ({ status, txHash, events, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(
                dispatchError.asModule
              );
              const { section, name } = decoded;
              reject(new Error(`${section}.${name}`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
            unsub();
            return;
          }

          if (status.isInBlock) {
            const blockHash = status.asInBlock.toString();
            
            // Get block number
            api.rpc.chain.getBlock(blockHash).then(block => {
              const blockNumber = block.block.header.number.toNumber();
              
              resolve({
                txHash: txHash.toHex(),
                blockHash,
                blockNumber,
                metadata
              });
              
              unsub();
            });
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
