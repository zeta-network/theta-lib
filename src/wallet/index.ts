/**
 * A sample function to test the project structure
 *
 * ### Example (es imports)
 * ```js
 * import { connect } from 'theta-lib/wallet';
 * console.log(connect())
 * // => "connected"
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var connect = require('theta-lib').connect;
 * console.log(connect());
 * // => "connected"
 * ```
 *
 * @returns "connected"
 */
export const connect = async () => {
  return 'connected';
};
