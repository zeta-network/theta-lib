import { ChainId } from '../constants/networks';
import { MetamaskEngine } from './metamask-engine';

export interface WalletEngine {
  isInstalled: () => Promise<boolean>;
  getAccounts: () => Promise<Address[]>;
  getBalance: (address: Address) => Promise<string>;
  getChainId: () => Promise<ChainId>;
  switchChain: (chainId: ChainId) => Promise<void>;
}

export const WalletEngines = {
  metamask: MetamaskEngine,
};

export type WalletNames = keyof typeof WalletEngines;
