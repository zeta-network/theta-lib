/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */

import browserEnv from 'browser-env';

// mock browser window
browserEnv(['window']);

const eth_engine = {
  request: ({ method, params }: any) => {
    return new Promise((resolve, reject) => {
      if (method === 'eth_requestAccounts') {
        resolve(['0x0', '0x1']);
      }
      if (method === 'eth_chainId') {
        resolve('0x169');
      }
      if (
        method === 'wallet_addEthereumChain' &&
        params[0].chainId === '0x169'
      ) {
        resolve('0x169');
      }
      if (
        method === 'wallet_switchEthereumChain' &&
        params[0].chainId === '0x169'
      ) {
        resolve('0x169');
      }
      reject(new Error('unknown method'));
    });
  },
};

(window as any).ethereum = eth_engine;
