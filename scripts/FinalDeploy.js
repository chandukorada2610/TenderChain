const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const App = await hre.ethers.getContractFactory("DeployerApplication");
    const contract = await App.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  

