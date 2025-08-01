const { ethers } = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

async function getAddress(Paddress) {
  const address = await ethers.provider.resolveName(Paddress);
  return address;
}

async function consolBalances(addresses) {
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    const balance = await getBalance(address);
    console.log(`Address ${i + 1} Balance of the Contract: ${balance}`);
  }
}

async function consolAddress(addresses) {
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    console.log(`Contract ${i + 1} Address: ${address}`);
  }
}

async function consolMemo(memos) {
  for (let i = 0; i < memos.length; i++) {
    const memo = memos[i];
    console.log("Tender Object:");
    console.log(`Tender ID: ${memo.tenderid}`);
    console.log(`Status: ${memo.status}`);
    console.log(`Title: ${memo.title}`);
    console.log(`Details: ${memo.details}`);
    console.log(`Deployed Time: ${memo.DeployedTime}`);
    console.log(`Start Date: ${memo.Startdate}`);
    console.log(`Last Date: ${memo.Lastdate}`);
    console.log(`Bid Opening Date: ${memo.BidopeningDate}`);
    console.log(`Organisation Name: ${memo.OrgainsationName}`);
    console.log("------------------------");
  }
}

async function main() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hrs = currentDate.getHours();
  const mins = currentDate.getMinutes();
  const sec = currentDate.getSeconds();
  const date = `In DD/MM/YYYY Format\t${day}-${month}-${year} ${(hrs > 12 ? hrs - 12 : hrs)}hrs:${mins}mins:${sec}secs`;
  
  const [owner, from1, from2, from3] = await ethers.getSigners();
  const App = await ethers.getContractFactory("DeployerApplication");
  const contract = await App.deploy(); 
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  
  const addresses = [owner.address, from1.address, from2.address, from3.address];
  console.log("Before contract deployment");
  await consolAddress(addresses);

  await contract.connect(from1).DeployContract(
    1, 'TenderChain', 'Active', 'the best project', date, '17/02/2024', '19/02/2024', '18/02/2024', 'TenderChain'
  );

  console.log("After contract deployment");
  console.log(`Current Date 12hr clock: ${date}`);
  await consolAddress(addresses);

  console.log("Memo of the Contracts");
  const memo = await contract.getMemo();
  await consolMemo(memo);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
