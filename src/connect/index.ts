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

const walletEngines = {
  metamask: metamask,
  thetawallet: null,
};

function getCachedUser() {
  const user = localStorage.getItem('theta_lib_connected_user');
  if (user) {
    return JSON.parse(user);
  }
  return false;
}

function setCachedUser(user: logged_user_account) {
  return localStorage.setItem('theta_lib_connected_user', JSON.stringify(user));
}

function removeCachedUser() {
  return localStorage.removeItem('theta_lib_connected_user');
}

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

async function connect(
  wallet: 'metamask' | 'thetawallet',
  chainId: string = chainIds[0]
) {
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
}

async function disconnect() {
  removeCachedUser();
  return true;
}

async function getAccounts(): Promise<readonly string[]> {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.getAccounts();

    case 'thetawallet':
      return [''];
  }
  return [];
}

async function getBalance(address?: string): Promise<number> {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.getBalance(address ?? getCachedUser()?.address);

    case 'thetawallet':
      return 0;
  }
  return 0;
}

async function isInstalled(): Promise<boolean> {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.isInstalled();

    case 'thetawallet':
      return false;
  }
  return false;
}

async function getNetwork(): Promise<string> {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.getNetwork();

    case 'thetawallet':
      return '0x0';
  }
  return '0x0';
}

async function setNetwork(chainId: string) {
  switch (getCachedUser()?.wallet_name) {
    case 'metamask':
      return metamask.setNetwork(chainId);

    case 'thetawallet':
      return false;
  }
  return false;
}

// get current account signer from the wallet
async function getSigner() {
  return 'signer';
}

// get current account provider from the wallet
async function getProvider() {
  return 'provider';
}

exports = {
  connect,
  disconnect,
  getAccounts,
  getBalance,
  isInstalled,
  getNetwork,
  setNetwork,
  getSigner,
  getProvider,
};
