import test from 'ava';
import '../mocks/_metamask-wallet.spec';
import '../mocks/_localstorage.spec';

import { chainIds } from '../constants/networks';

import { getAccounts, getNetwork, isInstalled, setNetwork } from './metamask';

import { connect } from './index';

test('connect & get accounts', async (t) => {
  // connect
  await connect('metamask', chainIds[1]);
  // get accounts
  const accounts = await getAccounts();
  t.deepEqual(accounts, ['0x0', '0x1']);
});

test('check if metamask is installed', async (t) => {
  const res = await isInstalled();
  t.true(res);
});

test('get metamask chainId', async (t) => {
  const chainId = await getNetwork();
  t.deepEqual(chainId, '0x169');
});

test('set metamask network or try to switch', async (t) => {
  t.notThrows(async () => {
    await setNetwork('0x169');
  });
});
