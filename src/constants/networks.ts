export const Mainnet = {
  id: 'mainnet',
  chainId: '0x169',
  name: 'Theta Mainnet',
  currency: { name: 'Theta Fuel', symbol: 'TFUEL', decimals: 18 },
  rpcUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
  explorerUrl: 'https://explorer.thetatoken.org/',
};

export const Testnet = {
  id: 'testnet',
  chainId: '0x16d',
  name: 'Theta Testnet',
  currency: { name: 'Theta Fuel', symbol: 'TFUEL', decimals: 18 },
  rpcUrl: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
  explorerUrl: 'https://beta-explorer.thetatoken.org',
};

export const networks = {
  [Mainnet.chainId]: Mainnet,
  [Testnet.chainId]: Testnet,
};

export const chainIds = Object.keys(networks);
