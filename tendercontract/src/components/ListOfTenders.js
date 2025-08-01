import React, { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  const ApplyforContract = async () => {
    const TenderID = document.querySelector("#TenderID").value.toString();
    const PhoneNo = document.querySelector("#phoneno").value.toString();
    const BiddingPrice = document
      .querySelector("#BiddingPrice")
      .value.toString();
    const Name = document.querySelector("#Name").value.toString();
    const email = document.querySelector("#email").value.toString();

    if (contract) {
      try {
        const transaction = await contract.Apply(
          TenderID,
          Name,
          PhoneNo,
          BiddingPrice,
          email
        );
        console.log("Entered ApplyforContract function");
        await transaction.wait();
      } catch (error) {
        console.error(error);
        document.querySelector(
          "#result"
        ).innerHTML = `<h3>Error: ${error.message}</h3>`;
      }
    }
  };

  useEffect(() => {
    const fetchMemos = async () => {
      if (contract) {
        const memos = await contract.listOfContracts();
        setMemos(memos);
      }
    };
    fetchMemos();
  }, [contract]);

  const showPopup = (index) => {
    let popup = document.getElementById(`popup-${index}`);
    if (popup) {
      popup.classList.add("open-popup");
    }
  };

  const hidePopup = (index) => {
    let popup = document.getElementById(`popup-${index}`);
    if (popup) {
      popup.classList.remove("open-popup");
    }
  };

  return (
    <div
      style={{
        borderRadius: "15px",
        margin: "15px 35px",
        overflowX: "auto",
        backgroundColor: "#e5e5e5",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "8px" }}>Tender ID</th>
            <th style={{ padding: "8px" }}>Status</th>
            <th style={{ padding: "8px" }}>Title</th>
            <th style={{ padding: "8px" }}>Details</th>
            <th style={{ padding: "8px" }}>Deployed Time</th>
            <th style={{ padding: "8px" }}>Start Date</th>
            <th style={{ padding: "8px" }}>Last Date</th>
            <th style={{ padding: "8px" }}>Bid Opening Date</th>
            <th style={{ padding: "8px" }}>Minimum Bidding Amount</th>
            <th style={{ padding: "8px" }}>Organisation Name</th>
            <th style={{ padding: "8px" }}>Apply</th>
          </tr>
        </thead>
        <tbody>
          {memos.map(
            (memo, index) =>
              !memo.accepted && (
                <React.Fragment key={index}>
                  <tr
                    colSpan="10"
                    style={{
                      textAlign: "center",
                      borderBottom: "2px solid #000",
                    }}
                  >
                    <td style={{ padding: "8px" }}>
                      {memo.tenderid.toString()}
                    </td>
                    <td style={{ padding: "8px" }}>{memo.status}</td>
                    <td style={{ padding: "8px" }}>{memo.title}</td>
                    <td style={{ padding: "8px" }}>
                      <a href={`contract/${memo.tenderid}`}>Details</a>
                    </td>
                    <td style={{ padding: "8px" }}>{memo.DeployedTime}</td>
                    <td style={{ padding: "8px" }}>{memo.Startdate}</td>
                    <td style={{ padding: "8px" }}>{memo.Lastdate}</td>
                    <td style={{ padding: "8px" }}>{memo.BidopeningDate}</td>
                    <td style={{ padding: "8px" }}>
                      {memo.minimumBiddingPrice.toString()}
                    </td>
                    <td style={{ padding: "8px" }}>{memo.OrganizationName}</td>
                    <td>
                      <div className="container">
                        <button
                          type="button"
                          className="btn btn-warning"
                          style={{ margin: "8px" }}
                          onClick={() => showPopup(index)}
                        >
                          Apply
                        </button>
                        <div className="popup" id={`popup-${index}`}>
                          <form method="POST" action="/">
                            <label className="poplabel">TENDERID</label>
                            <input
                              className="popinput"
                              id="TenderID"
                              type="number"
                              placeholder="Tender ID"
                            />

                            <label className="poplabel">Name</label>
                            <input
                              className="popinput"
                              id="Name"
                              placeholder="Name"
                            />

                            <label className="poplabel">Phone No</label>
                            <input
                              className="popinput"
                              id="phoneno"
                              placeholder="+91XXXXXXXXXX"
                            />

                            <label className="poplabel">Bidding Price</label>
                            <input
                              className="popinput"
                              id="BiddingPrice"
                              type="number"
                              placeholder="₹"
                            />

                            <label className="poplabel">Email</label>
                            <input
                              className="popinput"
                              type="email"
                              id="email"
                              placeholder="example@example.com"
                            />
                          </form>

                          <button
                            type="button"
                            className="btn btn-warning"
                            style={{ margin: "8px" }}
                            onClick={() => {
                              ApplyforContract();
                              hidePopup(index);
                            }}
                          >
                            OK
                          </button>
                          <div id="result"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Memos;
