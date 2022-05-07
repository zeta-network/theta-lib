import { networks } from '../constants/networks';

declare const window: any;

export const getAccounts = async (): Promise<readonly string[]> => {
  return await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
};

export const isInstalled = async (): Promise<boolean> => {
  if (typeof window.ethereum !== 'undefined') {
    return true;
  }
  return false;
};

export const getNetwork = async (): Promise<string> => {
  if (typeof window.ethereum !== 'undefined') {
    return window.ethereum.request({ method: 'eth_chainId' });
  }
  return '';
};

export const setNetwork = async (chainId: string): Promise<void> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Try to switching network to chainId
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      });
    } catch (error: any) {
      // If the network doesn't exist, try to add it.
      if (error.code === 4902 || error.message.includes(chainId)) {
        const config = networks[chainId];
        await window.ethereum.request({
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
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }],
        });
      }
    }
  }
};
