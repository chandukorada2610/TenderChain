import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import YourComponent from "./YourComponent";
// cabin number 32 2nd floor

function Body({ contract }) {
  const [alert, setalert] = useState(false);
  const [existemail, setexistemail] = useState(false);
  const [ispasswordworng, setispasswordworng] = useState(false);
  const [islogin, setlogin] = useState(false);
  const [isSignup, setsignup] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  async function deploycontract(e) {
    e.preventDefault();
    try {
      console.log("Entered");
      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const Cpassword = document.querySelector("#Cpassword").value;
      const Country = document.querySelector("#country").value;
      const phone = document.querySelector("#phone").value;

      // Assuming `contract` is passed as a prop to the component
      if (password !== null) {
        if (password !== Cpassword) {
          setalert(true);
        } else {
          const transaction = await contract.addUser(
            name,
            email,
            Country,
            password,
            phone
          );
          await transaction.wait();
          setsignup(true);
        }
      } else {
        console.log("Password is null");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Retrieve hashed password from the contract
    const hashedPassword = await contract.getPassword(email);

    // Validate if the email exists in the mapping
    if (hashedPassword === null) {
      console.log("Email does not exist");
      setexistemail(true);
      console.log(existemail);
    }
    if (hashedPassword === password) {
      console.log("Login Success");
      setUserEmail(email);
      setlogin(true);
      sessionStorage.setItem("islogin", true);
      console.log(sessionStorage.getItem("islogin"));
    } else {
      console.log("Incorrect password");
      setispasswordworng(true);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [formName, setFormName] = useState("login-form");
  const showForm = (formName) => {
    setFormName(formName);
  };

  return (
    <div>
      <React.Fragment>
        <div>
          <header id="header" className="header d-flex align-items-center">
            <div className="displayFlex container-fluid container-xl d-flex align-items-center justify-content-between">
             
                <YourComponent isLogin={islogin} page={1} />
            </div>
          </header>

          <section id="hero" className="hero">
            <div className="info d-flex align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 text-center">
                    <motion.h2 data-aos="fade-down" data-aos-once="true">
                      Welcome to <span>TenderChain</span>
                    </motion.h2>

                    <motion.p data-aos="fade-up" data-aos-once="true">
                      Experience efficiency and security like never before with
                      our blockchain-powered platform. Explore tamper-proof
                      contract storage, automated execution, and decentralized
                      access control for streamlined contract management. Join
                      us as we revolutionize the way contracts are handled.
                      Welcome!
                    </motion.p>

                    <motion.div
                      data-aos="slide-left"
                      data-aos-once="true"
                      data-aos-duration="1500"
                    >
                      <input
                        type="text"
                        placeholder="Search Tenders"
                        className="search-input btn-get-started"
                      />
                      <a href="./tenders">
                        <button
                          type="submit"
                          className="button_icon"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="hero-carousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              <div
                className="carousel-item active"
                style={{
                  backgroundImage:
                    "url(assets/img/hero-carousel/hero-carousel-1.jpg)",
                }}
              ></div>
              <div
                className="carousel-item"
                style={{
                  backgroundImage:
                    "url(assets/img/hero-carousel/hero-carousel-2.jpg)",
                }}
              ></div>
              <div
                className="carousel-item"
                style={{
                  backgroundImage:
                    "url(assets/img/hero-carousel/hero-carousel-3.jpg)",
                }}
              ></div>
              <div
                className="carousel-item"
                style={{
                  backgroundImage:
                    "url(assets/img/hero-carousel/hero-carousel-4.jpg)",
                }}
              ></div>
              <div
                className="carousel-item"
                style={{
                  backgroundImage:
                    "url(assets/img/hero-carousel/hero-carousel-5.jpg)",
                }}
              ></div>

              <a
                className="carousel-control-prev"
                href="#hero-carousel"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bi bi-chevron-left"
                  aria-hidden="true"
                ></span>
              </a>

              <a
                className="carousel-control-next"
                href="#hero-carousel"
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bi bi-chevron-right"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </section>
          <main id="main">
            <section id="get-started" className="get-started section-bg">
              <div className="container">
                <div className="row justify-content-between gy-4">
                  <div className="col-lg-6 d-flex align-items-center">
                    <motion.div data-aos="fade-up" data-aos-once="true">
                      <h3 style={{ color: "#52565e", marginBottom: "5%" }}>
                        Blockchain-Powered Contract Management: Enhanced
                        Efficiency and Security.
                      </h3>
                      <p>
                        Blockchain-powered contract management systems provide a
                        flexible method of transaction with immutable contracts
                        that ensure data is protected from tampering. With smart
                        contracts, contracts can be executed once preconditions
                        are met, thus simplifying the contract lifecycle and
                        reducing the impact of guidance. Decentralized access
                        control mechanisms increase security and privacy, while
                        timestamping and auditing capabilities provide an audit
                        trail for compliance and resolution. Seamless
                        integration with external systems, automated compliance
                        and multi-party collaboration ensure efficiency and
                        transparency. Additionally, tokenizing assets on the
                        blockchain increases ownership and facilitates asset
                        transfers. Overall, these features work together to
                        reduce costs, increase security, and increase the
                        efficiency of contract management.
                      </p>
                    </motion.div>
                  </div>
                  <motion.div
                    id="logindiv"
                    layoutId="underline"
                    className="col-lg-5 form"
                  >
                    <div className="form-content">
                      <h2 style={{ color: "#ffbb00", marginBottom: "8%" }}>
                        <span
                          id="signup-heading"
                          onClick={() => showForm("signup-form")}
                        >
                          Sign Up
                        </span>
                        /
                        <span
                          id="login-heading"
                          onClick={() => showForm("login-form")}
                        >
                          Log In
                        </span>
                      </h2>
                      <p id="form-type">
                        {formName === "signup-form" ? "Sign Up" : "Log In"}
                      </p>
                      <div
                        id="signup-form"
                        style={{
                          display:
                            formName === "signup-form" ? "block" : "none",
                        }}
                      >
                        <form
                          onSubmit={deploycontract}
                          className="php-email-form"
                        >
                          <div className="row gy-3">
                            <div className="col-md-12">
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Name"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              <input
                                type="password"
                                className="form-control"
                                id="Cpassword"
                                placeholder="Conform Password"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              <input
                                type="text"
                                className="form-control"
                                id="country"
                                placeholder="Country"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              <input
                                type="text"
                                className="form-control"
                                id="phone"
                                placeholder="Phone"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              {alert ? (
                                <div style={{ color: "red" }}>
                                  Password doesn't match
                                </div>
                              ) : isSignup ? (
                                <div style={{ color: "green" }}>
                                  Signup Success
                                </div>
                              ) : existemail ? (
                                <div style={{ color: "red" }}>
                                  Email already exist
                                </div>
                              ) : null}
                            </div>
                            <div className="col-md-12 text-center">
                              <button
                                style={{ borderRadius: "50px" }}
                                type="submit"
                              >
                                Sign Up
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div
                        id="login-form"
                        style={{
                          display: formName === "login-form" ? "block" : "none",
                        }}
                      >
                        <form
                          action="/tender"
                          onSubmit={onSubmit}
                          className="php-email-form"
                        >
                          <div className="row gy-3">
                            <div className="col-md-12 ">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="email"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-md-12">
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                required
                                style={{ borderRadius: "30px" }}
                                autoComplete="off"
                              />
                            </div>
                            <div id="loginidform">
                              {islogin ? (
                                <h3 style={{ color: "yellow" }}>
                                  Login Success
                                  {sessionStorage.setItem(
                                    "userEmail",
                                    userEmail
                                  )}
                                </h3>
                              ) : existemail ? (
                                <h3 style={{ color: "red" }}>
                                  Email does not exist
                                </h3>
                              ) : ispasswordworng ? (
                                <h3 style={{ color: "red" }}>Password wrong</h3>
                              ) : null}
                            </div>
                            <div className="col-md-12 text-center">
                              <button
                                style={{ borderRadius: "30px" }}
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section id="alt-services" className="alt-services">
              <div className="container">
                <div className="row justify-content-around gy-4">
                  <div
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-duration="1500"
                    className="col-lg-6 img-bg"
                    style={{
                      backgroundImage: "url(assets/img/alt-services.jpg)",
                    }}
                  ></div>

                  <div className="col-lg-5 d-flex flex-column justify-content-center">
                    <h3>Key Features Overview</h3>
                    <p>
                      Explore the core functionalities driving our contract
                      management system.
                    </p>

                    <motion.div
                      className="icon-box d-flex position-relative"
                      data-aos="fade-up"
                      data-aos-once="true"
                    >
                      <i className="bi bi-easel flex-shrink-0"></i>
                      <div>
                        <h3>
                          <a href="google.com" className="stretched-link">
                            Secure Blockchain Storage
                          </a>
                        </h3>
                        <p>
                          {" "}
                          Immutable contracts enhance transparency and security.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="icon-box d-flex position-relative"
                      data-aos="fade-up"
                      data-aos-once="true"
                    >
                      <i className="bi bi-patch-check flex-shrink-0"></i>
                      <div>
                        <h3>
                          <a href="google.com" className="stretched-link">
                            Decentralized Data Control
                          </a>
                        </h3>
                        <p>
                          Ensures privacy, limits unauthorized access, enhances
                          security.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="icon-box d-flex position-relative"
                      data-aos="fade-up"
                      data-aos-once="true"
                    >
                      <i className="bi bi-brightness-high flex-shrink-0"></i>
                      <div>
                        <h3>
                          <a href="google.com" className="stretched-link">
                            Verified Audit Trail
                          </a>
                        </h3>
                        <p>
                          Timestamps provide transparent, trackable contract
                          histories.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="icon-box d-flex position-relative"
                      data-aos="fade-up"
                      data-aos-once="true"
                    >
                      <i className="bi bi-brightness-high flex-shrink-0"></i>
                      <div>
                        <h3>
                          <a href="google.com" className="stretched-link">
                            Regulatory Compliance Automation
                          </a>
                        </h3>
                        <p>Enforces legal standards, minimizing risks.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            <section id="features" className="features section-bg">
              <div className="container">
                <ul className="nav nav-tabs row g-2 d-flex">
                  <li className="nav-item col-4">
                    <a
                      href="google.com"
                      className="nav-link active show"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-1"
                    >
                      <h3>Immutable Contract Storage</h3>
                    </a>
                  </li>
                  <li className="nav-item col-4">
                    <a
                      className="nav-link"
                      href="google.com"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-2"
                    >
                      <h3>Smart Contract Execution</h3>
                    </a>
                  </li>
                  <li className="nav-item col-4">
                    <a
                      className="nav-link"
                      href="google.com"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-3"
                    >
                      <h3>Decentralized Access Control</h3>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active show" id="tab-1">
                    <div className="row">
                      <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                        <h3>Security and Transparency</h3>
                        <p className="fst-italic">
                          Immutable contract storage refers to the practice of
                          storing contracts on a blockchain network, where they
                          are recorded in a tamper-proof and transparent manner.
                        </p>
                        <ul>
                          <li>
                            <i className="bi bi-check2-all"></i> Contracts
                            stored on the blockchain are immutable, ensuring
                            that they remain unchanged and secure over time.
                          </li>
                          <li>
                            <i className="bi bi-check2-all"></i> All
                            contract-related activities are recorded on the
                            blockchain, providing a transparent and auditable
                            record of events.
                          </li>
                          <li>
                            <i className="bi bi-check2-all"></i> Immutable
                            contract storage minimizes the risk of fraud,
                            manipulation, or unauthorized alterations, promoting
                            trust and reliability in contractual agreements.
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 order-1 order-lg-2 text-center">
                        <img
                          src="assets/img/features-1.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-2">
                    <div className="row">
                      <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                        <h3>Efficiency Through Automation</h3>
                        <p className="fst-italic">
                          Smart contract execution revolutionizes traditional
                          contract processes by leveraging blockchain technology
                          to automate contract execution. These self-executing
                          contracts contain predefined rules and conditions
                          encoded into smart contract code.
                        </p>
                        <ul>
                          <li>
                            <i className="bi bi-check2-all"></i> Smart contracts
                            execute predefined actions automatically, based on
                            predetermined conditions, without human
                            intervention.
                          </li>
                          <li>
                            <i className="bi bi-check2-all"></i> By removing
                            intermediaries, smart contracts reduce costs and
                            streamline processes, leading to faster and more
                            secure transactions.
                          </li>
                          <li>
                            <i className="bi bi-check2-all"></i> The automation
                            of contract execution reduces the risk of human
                            error and minimizes the potential for disputes,
                            enhancing trust and reliability in contractual
                            agreements.
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 order-1 order-lg-2 text-center">
                        <img
                          src="assets/img/features-2.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-3">
                    <div className="row">
                      <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                        <h3>
                          Enhanced Collaboration for Effective Contract
                          Management
                        </h3>
                        <p>
                          Multi-party collaboration is facilitated through a
                          shared space within the platform, allowing all
                          involved parties to collaborate in real-time. This
                          feature promotes transparency, communication, and
                          decision-making, thereby enhancing the efficiency of
                          contract negotiations and execution.
                        </p>
                        <ul>
                          <li>
                            <i className="bi bi-check2-all"></i> The platform
                            enables real-time communication and collaboration
                            among all parties involved in the contract,
                            facilitating swift decision-making.
                          </li>
                          <li>
                            <i className="bi bi-check2-all"></i> Users can track
                            changes made to the contract document, ensuring
                            transparency and accountability throughout the
                            negotiation process.
                          </li>
                          <li>
                            <i className="bi bi-check2-all"></i> Through
                            collaborative discussions and feedback, parties can
                            work towards consensus on contract terms and
                            conditions, fostering trust and agreement.
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 order-1 order-lg-2 text-center">
                        <img
                          src="assets/img/features-3.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </React.Fragment>
    </div>
  );
}

export default Body;
