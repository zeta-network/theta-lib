if (typeof window == 'undefined') {
  console.error(
    'Warning: theta-lib.wallet is running in a non-browser environment. Most functions will not work.'
  );
}

import { chainIds } from '../constants/networks';

import * as metamask from './metamask';

type logged_user_account = {
  readonly address: string;
  readonly balance: number;
  readonly wallet_name: string;
  readonly chainId: string;
};

const getCachedUser = () => {
  const user = localStorage.getItem('theta_lib_connected_user');
  if (user) {
    return JSON.parse(user);
  }
  return false;
};
const setCachedUser = (user: logged_user_account) => {
  return localStorage.setItem('theta_lib_connected_user', JSON.stringify(user));
};
const removeCachedUser = () => {
  return localStorage.removeItem('theta_lib_connected_user');
};

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

export const connect = async (
  wallet: 'metamask' | 'thetawallet',
  chainId: string = chainIds[0]
) => {
  if (
    wallet.toLowerCase() != 'thetawallet' ||
    wallet.toLowerCase() != 'metamask'
  ) {
    return false;
  }

  // check if wallet is installed
  if (!(await isInstalled())) {
    return false;
  }

  // check if chainId is valid
  if (!((await getNetwork()) != chainId)) {
    // try to switch to chainId
    await setNetwork(chainId);

    // check if chainId is valid again
    if (!((await getNetwork()) != chainId)) {
      return false;
    }
  }

  // get user accounts
  const accounts = await getAccounts();

  // get user balance
  const balance = await getBalance(accounts[0]);

  // user object
  const user: logged_user_account = {
    address: accounts[0],
    balance,
    wallet_name: wallet.toLowerCase(),
    chainId: chainId,
  };

  // save user in localStorage
  setCachedUser(user);

  // return user
  return user;
};

export const disconnect = () => {
  removeCachedUser();
  return true;
};

export const getAccounts = async (): Promise<readonly string[]> => {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.getAccounts();

    case 'thetawallet':
      return [''];
  }
  return [];
};

export const getBalance = async (address?: string): Promise<number> => {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.getBalance(address ?? getCachedUser()?.address);

    case 'thetawallet':
      return 0;
  }
  return 0;
};

export const isInstalled = async (): Promise<boolean> => {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.isInstalled();

    case 'thetawallet':
      return false;
  }
  return false;
};

export const getNetwork = async (): Promise<string> => {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.getNetwork();

    case 'thetawallet':
      return '0x0';
  }
  return '0x0';
};

export const setNetwork = async (chainId: string) => {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.setNetwork(chainId);

    case 'thetawallet':
      return false;
  }
  return false;
};

// get current account signer from the wallet
export const getSigner = async () => {
  return 'signer';
};

// get current account provider from the wallet
export const getProvider = async () => {
  return 'provider';
};
