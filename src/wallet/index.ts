if (typeof window == 'undefined') {
  console.error(
    'Warning: theta-lib.wallet is running in a non-browser environment. Most functions will not work.'
  );
}

import * as metamask from './metamask';

/**
 * A sample function to test the project structure
 *
 * @note should always be called first
 *
 * ### Example (es imports)
 * ```js
 * import { wallet } from 'theta-lib';
 * console.log(wallet.connect())
 * // => "connected"
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var wallet = require('theta-lib').wallet;
 * console.log(wallet.connect());
 * // => "connected"
 * ```
 *
 * @param {string} wallet - The name of the wallet to connect to
 * @returns "connected"
 */

export const connect = async (wallet: 'metamask' | 'thetawallet') => {
  if (wallet.toLowerCase() == 'metamask') {
    window.localStorage.setItem('last_wallet', 'metamask');

    return 'metamask';
  }
  if (wallet.toLowerCase() == 'thetawallet') {
    return 'thetawallet';
  }
  return '';
};

export const disconnect = async () => {
  window.localStorage.removeItem('last_wallet');
};

export const getAccounts = async (): Promise<readonly string[]> => {
  if (window.localStorage.getItem('last_wallet') == 'metamask') {
    return metamask.getAccounts();
  }
  if (window.localStorage.getItem('last_wallet') == 'thetawallet') {
    return [];
  }
  return [];
};

export const isInstalled = async (): Promise<boolean> => {
  if (window.localStorage.getItem('last_wallet') == 'metamask') {
    return metamask.isInstalled();
  }
  if (window.localStorage.getItem('last_wallet') == 'thetawallet') {
    return false;
  }
  return false;
};

export const getNetwork = async (): Promise<string> => {
  if (window.localStorage.getItem('last_wallet') == 'metamask') {
    return metamask.getNetwork();
  }
  if (window.localStorage.getItem('last_wallet') == 'thetawallet') {
    return 'thetawallet';
  }
  return 'network';
};

export const setNetwork = async (chainId: string) => {
  if (window.localStorage.getItem('last_wallet') == 'metamask') {
    return metamask.setNetwork(chainId);
  }
  if (window.localStorage.getItem('last_wallet') == 'thetawallet') {
    return 'thetawallet';
  }

  return 'set network';
};

// get current account signer from the wallet
export const getSigner = async () => {
  return 'signer';
};

// get current account provider from the wallet
export const getProvider = async () => {
  return 'provider';
};
