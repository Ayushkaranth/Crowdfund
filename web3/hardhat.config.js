require("dotenv").config();

module.exports = {
  defaultNetwork: "megaethTestnet",
  networks: {
    hardhat: {},
    megaethTestnet: {
      url: "https://carrot.megaeth.com/rpc",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
