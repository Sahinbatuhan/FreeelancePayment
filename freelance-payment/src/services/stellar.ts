import { Asset } from "@stellar/stellar-sdk";
import Server from "@stellar/stellar-sdk";
import { Keypair, TransactionBuilder, Operation, Networks } from "@stellar/stellar-sdk";



const server = new Server("https://horizon-testnet.stellar.org");

export function createWallet() {
  const keypair = Keypair.random();
  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret()
  };
}

type BalanceLine = {
  balance: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
};

export async function getBalance(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    const balance = account.balances.find((b: BalanceLine) => b.asset_type === "native");
    return balance ? balance.balance : "0";
  } catch (error) {
    return "0";
  }
}


export async function sendPayment(fromSecret: string, toPublic: string, amount: string) {
  try {
    const sourceKeypair = Keypair.fromSecret(fromSecret);
    const account = await server.loadAccount(sourceKeypair.publicKey());

    const fee = await server.fetchBaseFee();
    const transaction = new TransactionBuilder(account, {
      fee,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(Operation.payment({
        destination: toPublic,
        asset: Asset.native(),
        amount,
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);
    return result;
  } catch (error) {
    throw error;
  }
}
