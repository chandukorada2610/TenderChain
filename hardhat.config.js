require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { SEPOLIA_API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: SEPOLIA_API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.15",
};
