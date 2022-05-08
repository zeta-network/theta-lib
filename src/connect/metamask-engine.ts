import { ChainId, networks } from '../constants/networks';
import { WalletEngine } from './wallet-engine';

export class MetamaskEngine implements WalletEngine {
  isInstalled(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof window['ethereum'] !== 'undefined') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
  getAccounts(): Promise<Address[]> {
    return window['ethereum'].request({ method: 'eth_requestAccounts' });
  }
  getBalance(account: Address): Promise<string> {
    return window['ethereum'].request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    });
  }
  getChainId(): Promise<ChainId> {
    return window['ethereum'].request({ method: 'eth_chainId' });
  }
  switchChain(chainId: ChainId): Promise<void> {
    return window['ethereum'].request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }],
    });
  }
  addNetwork(chainId: ChainId): Promise<void> {
    const config = networks[chainId];
    return window['ethereum'].request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: config.chainId,
          chainName: config.name,
          rpcUrls: [config.rpcUrl],
          nativeCurrency: config.currency,
          blockExplorerUrls: [config.explorerUrl],
        },
      ],
    });
  }
}
