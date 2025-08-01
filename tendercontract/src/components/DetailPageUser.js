import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

const DetailPage = ({ state }) => {
  const { id } = useParams(); // Get the ID from the URL
  const { contract } = state; // Destructure contract from state
  const [applicants, setApplicants] = useState([]);
  const [memo, setMemo] = useState(null);
  const [stateofbutton, setStateOfButton] = useState("none");

  function showApplicants() {
    var x = document.getElementById("applicantsTable");
    if (x.style.display === "none") {
      x.style.display = "table";
    } else {
      x.style.display = "none";
    }
  }


  async function ContractAccepted(applicant) {
    if (contract && id) {
      try {
        await contract.delete_contract(applicant.TenderID);
        await SendMail(
          applicant.ApplicantEmail,
          applicant.Name,
          memo.title,
          memo.tenderid.toString(),
        );
      } catch (error) {
        console.error("Error deleting contract or sending mail:", error);
      }
    }
  }

  async function SendMail(email, name, title, tenderid) {
    const serviceId = "service_33f8t33";
    const templateId = "template_eibz1cr";
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        tender_title: title,
        tender_id: tenderid,
        to: email,
      });
      alert("Email successfully sent. Check your inbox");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  
  // Initialize EmailJS with your public key
  emailjs.init("Vl-xEdaI-3Q0XDmss");






  useEffect(() => {
    if (sessionStorage.getItem("buttonClicked") === "true") {
      setStateOfButton("table");
    } else {
      setStateOfButton("none");
    }
  }, []);

  useEffect(() => {
    const fetchMemoAndApplicants = async () => {
      if (contract && id) {
        try {
          const memo = await contract.getMemoByID(parseInt(id));
          setMemo(memo);

          const applicants = await contract.getApplicants(parseInt(id));
          setApplicants(applicants);

          // console.log(applicants);
        } catch (error) {
          console.error("Error fetching memo or applicants:", error);
        }
      }
    };
    fetchMemoAndApplicants();
  }, [contract, id]);

  if (!memo) {
    return <div>Loading...</div>;
  }
  sessionStorage.setItem("buttonClicked", "false");

  return (
    <div>
      <h1>Contract Details</h1>
      <table
        style={{
          border: "1px solid #ddd",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Field</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Title</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.title}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Status</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.status}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Tender ID
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.tenderid.toString()}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Details
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.details}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Deployed Time
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.DeployedTime}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Start Date
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.Startdate}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Last Date
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.Lastdate}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Bid Opening Date
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.BidopeningDate}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              Organization Name
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {memo.OrganizationName}
            </td>
          </tr>
        </tbody>
      </table>
  
      <div
        id="applicantblock"
        style={{ display: stateofbutton, marginTop: "2%" }}
      >
        <button
          type="button"
          style={{
            display: "inline-block",
            fontWeight: 400,
            textAlign: "center",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            border: "1px solid transparent",
            padding: "0.375rem 0.75rem",
            fontSize: "1rem",
            lineHeight: 1.5,
            borderRadius: "0.25rem",
            transition:
              "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            color: "#fff",
            backgroundColor: "#ffc107",
            borderColor: "#ffc107",
          }}
          className="custom-btn"
          onClick={showApplicants}
        >
          Show Applicants
        </button>
        <table
          id="applicantsTable"
          style={{
            display: "none",
            border: "1px solid #ddd",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Tender ID
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Phone Number
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Bidding Price
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Applicant Email
              </th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {applicant.TenderID.toString()}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {applicant.PhoneNO}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {applicant.BiddingPrice.toString()}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {applicant.Name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {applicant.ApplicantEmail}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    type="button"
                    style={{
                      display: "inline-block",
                      fontWeight: 400,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                      WebkitUserSelect: "none",
                      MozUserSelect: "none",
                      msUserSelect: "none",
                      userSelect: "none",
                      border: "1px solid transparent",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      borderRadius: "0.25rem",
                      cursor:"pointer",
                      transition:
                        "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      color: "#fff",
                      backgroundColor: "#ffc107",
                      borderColor: "#ffc107",
                    }}
                    onClick={async () => {
                      ContractAccepted(applicant);
                    }
                  }
                    className="custom-btn"
                  >
                    Accept
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};
export default DetailPage;
