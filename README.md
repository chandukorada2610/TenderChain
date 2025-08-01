# TenderChain

**TenderChain** is a blockchain-based decentralized tender management system that replaces traditional, opaque tendering processes with a transparent, secure, and immutable solution using smart contracts on the Ethereum network.

---

## 🚀 Features

- Transparent and tamper-proof tender creation
- Smart contract-powered deployment and verification
- Immutable logs of tender data (title, status, dates, etc.)
- Easy interaction via scripts and MetaMask
- Deployment on Ethereum testnet using Hardhat

---

## 🛠 Tech Stack

- **Solidity** – Smart contract language  
- **Hardhat** – Ethereum development framework  
- **ethers.js** – JavaScript library to interact with blockchain  
- **MetaMask** – Wallet for testing and signing transactions  
- **Node.js** – Runtime environment for scripts

---

## 📁 Folder Structure

contracts/ # Contains DeployerApplication.sol
scripts/ # Includes deploy.js and test.js
tendercontract/ # Stores compiled contract artifacts
test/ # Test cases for contract functionality
hardhat.config.js # Hardhat configuration file

----

## ⚙️ Getting Started

1. **Install Dependencies**
   ```bash
   npm install
2. **Compile Smart Contracts**
   ```bash
   npx hardhat compile
4. **Run Deployment Script**
   ```bash
   npx hardhat run scripts/deploy.js --network <your-network>
6. **Interact with Contract**
   Use MetaMask and your script (e.g., test.js) to deploy and log tender data.


## 📌 Project Goal
To provide a secure, auditable, and decentralized platform for publishing and managing tenders, eliminating manipulation and enhancing trust through blockchain transparency.
   
