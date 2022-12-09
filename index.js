const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
require("dotenv").config();

const { GOERLI_API_KEY, PRIVATE_KEY } = process.env;

const settings = {
  apiKey: GOERLI_API_KEY,
  Network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

let wallet = new Wallet(PRIVATE_KEY);

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let transaction = {
    to: "0x9773d807fc707d0fbd96b15d1e621bd57c038ad0",
    value: Utils.parseEther("0.01"),
    gasLimit: 21000,
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 5,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  console.log("Raw tx: ", rawTransaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
}
main();
