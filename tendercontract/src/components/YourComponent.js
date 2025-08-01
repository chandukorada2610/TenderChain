import React from "react";
import { motion } from "framer-motion";
import Dropdown from "react-bootstrap/Dropdown";
import "./Drop_Down.css";

function YourComponent({ islogin, page }) {
  return (
    <div style={{ marginBottom: "75px" }}>
      <header id="header" className="header d-flex align-items-center">
        {page !== 1 ? (
          <a href="/" className="logo d-flex align-items-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                textShadow: "0 0 20px rgba(0, 191, 255, 0.8)",
              }}
              transition={{ duration: 1 }}
              style={{
                fontSize: "2rem",
                color: "#FFF",
                fontFamily: "Arial",
                textAlign: "center",
                marginLeft : "40px"
              }}
              data-aos-once="true"
            >
              TenderChain<span>.</span>
            </motion.h1>
          </a>
        ) : (<a href="index.html" className="logo d-flex align-items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              textShadow: "0 0 20px rgba(0, 191, 255, 0.8)",
            }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "2rem",
              color: "#FFF",
              fontFamily: "Arial",
              textAlign: "center",
              marginLeft : "40px"
            }}
            data-aos="fade-right"
            data-aos-once="true"
          >
            TenderChain<span>.</span>
          </motion.h1>
        </a>)}



        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a href="/" className={page === 1 ? "active" : ""}>
                Home
              </a>
            </li>
            <li>
              <a href="/tenders" className={page === 2 ? "active" : ""}>Tenders/Contracts</a>
            </li>
            {islogin || sessionStorage.getItem("islogin") === "true" ? (
              <li>
                <a href="/deployer" className={page === 3 ? "active" : ""}>Contract Posting</a>
              </li>
            ) : (
              <li>
                <a href="#logindiv">Contract Posting</a>
              </li>
            )}
          </ul>
        </nav>

        <BasicButtonExample />
      </header>
    </div>
  );
}

function BasicButtonExample() {
  return (
    <div className="NavBarWithComplete">
      <Dropdown className="dropdown-basic-button" data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" style={{marginRight : "3rem"}} variant="secondary">
        Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/">Home</Dropdown.Item>
          <Dropdown.Item href="/tenders">Tenders/Contracts</Dropdown.Item>
          <Dropdown.Item href="/deployer">Contract Posting</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default YourComponent;

