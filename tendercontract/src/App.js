import "./App.css";
import abi from "./contract/DeployerApplication.json";
import React, { useState, useEffect } from "react";
import TenderPage from "./components/Tender_Page.js";
import ListPage from "./components/ListPage.js";
import HomePage from "./components/Home_page.js";
import DetailPage from "./components/DetailPageUser.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const ethers = require("ethers")

function App() {
  const contractAddress = "0xCF0F3B28a3E25759bE739C14414B58611dB4eC72";
  const [walletState, setWalletState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error(
            "Please install MetaMask or another Ethereum-compatible browser extension."
          );
          return;
        }

        await ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi.abi, signer);
  
        setWalletState({ provider, signer, contract });
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    };

    connectWallet();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage contract={walletState.contract} />}
        />
        <Route path="/tenders" element={<ListPage state={walletState} />} />
        <Route
          path = '/deployer'
          element={
            <TenderPage
              state={walletState}
              contract={walletState.contract}
              email={email}
            />
          }
        />

          
        <Route
          path='/contract/:id'
          element={<DetailPage state={walletState} email={email} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
