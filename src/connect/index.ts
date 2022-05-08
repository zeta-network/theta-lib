import { WalletEngine, WalletEngines, WalletNames } from './wallet-engine';

const LOCAL_STORAGE_KEY = '_wallet_connection';

export interface AccountBalance {
  tfuel: string;
  theta: string;
}
export interface Account {
  accountId: string;
  balance: AccountBalance;
  networkId: string;
}

export class WalletConnection {
  /** @hidden */
  _walletId: string;

  /** @hidden */
  _networkId: string;

  /** @hidden */
  _userAccount: Account | null;

  /** @hidden */
  _engine: WalletEngine;

  constructor(walletId: WalletNames, networkId: string) {
    this._walletId = walletId;
    this._networkId = networkId;
    this._engine = new WalletEngines[walletId]();

    const storedAccount = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    this._userAccount = storedAccount ? JSON.parse(storedAccount) : null;
  }

  /**
   * Returns true, if the user authorized the wallet connection.
   * @example
   * ```ts
   * const wallet = new WalletConnection("metamask", 'testnet');
   * wallet.isSignedIn();
   * ```
   */
  isSignedIn(): boolean {
    return !!this._userAccount?.accountId;
  }

  /**
   * Returns authorized Account ID.
   * @example
   * ```ts
   * const wallet = new WalletConnection("metamask", 'testnet');
   * wallet.getAccountId();
   * ```
   */
  getAccountId(): string {
    return this._userAccount?.accountId || '';
  }

  /**
   * Requests the user accounts from the wallet.
   * @example
   * ```ts
   * const wallet = new WalletConnection("metamask", "testnet");
   * wallet.requestSignIn();
   * ```
   */
  //   TODO: needs work
  async requestSignIn() {
    const accounts = await this._engine.getAccounts();
    if (accounts.length > 0) {
      this._userAccount = {
        accountId: accounts[0],
        balance: {
          tfuel: await this._engine.getBalance(accounts[0]),
          theta: 'unknown',
        },
        networkId: this._networkId,
      };
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this._userAccount)
      );
      return this._userAccount;
    } else {
      return null;
    }
  }

  /**
   * Requests the user to sign a transaction.
   */
  //   async _requestSignTransaction({
  //     transactions,
  //     meta,
  //     callback,
  //   }: any): Promise<void> {}

  /**
   * Sign out from the current account
   * @example
   * wallet.signOut();
   */
  signOut(): void {
    this._userAccount = null;
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  /**
   * Returns the current connected wallet account
   */
  account(): Account | null {
    return this._userAccount;
  }
}
