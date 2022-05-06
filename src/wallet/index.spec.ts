import test from 'ava';

import { connect } from './index';

test('getABC', async (t) => {
  t.deepEqual(await connect(), 'connected');
});
