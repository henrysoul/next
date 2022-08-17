import React from "react";

export default function Block() {
  const Web3 = require("web3");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://polygon-mainnet.g.alchemy.com/v2/LcfKaT0ZD6deXCwZhHuo5QOIOV0NbWpz"
    )
  );

  let blockNum = 0;
  let positiveAddresses = [];
  let run = async () => {
    let addresses = {};

    while (positiveAddresses.length <= 1000) {
      let blck = blockNum++;
      let block = await web3.eth.getBlock(blck);
      if (!block) break;

      for (let i = 0; i < block.transactions.length; i++) {
        let tx = await web3.eth.getTransaction(block.transactions[i]);
        if (parseInt(tx.value) > 0) {
          addresses[tx.to] = true;
        }
      }
    }

    for (let address in addresses) {
      try {
        let balance = await web3.eth.getBalance(address);
        if (balance >= 1000) {
          positiveAddresses.push(address);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (positiveAddresses.length === 1000) {
      console.log("The address are" + positiveAddresses);
    }
  };

  run();
  return <div>block</div>;
}
