//  This page belongs to tender page
import React, { useEffect, useState } from "react";

const Memos = ({ state, userEmail }) => {
  const [memos, setMemos] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      if (contract && userEmail) {
        try {
          const memos = await contract.getMemo(userEmail);
          setMemos(memos);
        } catch (error) {
          console.error("Error fetching memos:", error);
        }
      }
    };
    fetchMemos();
  }, [contract, userEmail]);

  const handlePasswordConfirmation = async (e) => {
    sessionStorage.setItem("Verified", "false");
    e.preventDefault();

    const hashedPassword = await contract.getPassword(userEmail);
    const inputPassword = e.target.password.value;
    if (hashedPassword === inputPassword) {
      setShowDetails(true);
      sessionStorage.setItem("Verified", "true");
      document.getElementById("PV").style.display = "none";
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleDetailsClick = () => {
    sessionStorage.setItem("buttonClicked", "true");
  };

  return (
    <div>
      <div id="PV">
        <form onSubmit={handlePasswordConfirmation}>
          <label style={{ color: "white", margin: "1vh" }}>
            Confirm Yourself
            <input type="password" name="password" style={{ margin: "15px" }} />
          </label>
          <button
            className="btn btn-warning"
            type="submit"
            style={{ margin: "15px" }}
          >
            Submit
          </button>
        </form>
      </div>
      {showDetails && (
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
              </tr>
            </thead>
            <tbody>
              {memos.map(
                (memo, index) =>
                  memo.accepted.toString() === "false" && (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ padding: "8px" }}>
                          {memo.tenderid.toString()}
                        </td>

                        <td style={{ padding: "8px" }}>
                          {memo.status}
                        </td>
                       
                        <td style={{ padding: "8px" }}>{memo.title}</td>
                        <td style={{ padding: "8px" }}>
                          <a
                            href={`contract/${memo.tenderid}`}
                            onClick={handleDetailsClick}
                          >
                            Details
                          </a>
                        </td>
                        <td style={{ padding: "8px" }}>{memo.DeployedTime}</td>
                        <td style={{ padding: "8px" }}>{memo.Startdate}</td>
                        <td style={{ padding: "8px" }}>{memo.Lastdate}</td>
                        <td style={{ padding: "8px" }}>
                          {memo.BidopeningDate}
                        </td>
                        <td style={{ padding: "8px" }}>
                          {memo.minimumBiddingPrice.toString()}
                        </td>
                        <td style={{ padding: "8px" }}>
                          {memo.OrganizationName}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan="11"
                          style={{ borderBottom: "2px solid #000" }}
                        ></td>
                      </tr>
                    </React.Fragment>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Memos;
