import "./input.css";

function generateTenderId() {
  const timestamp = Date.now().toString().slice(-5); // Use last 5 digits of timestamp
  const random = Math.floor(Math.random() * 100000); // Generate a random 5-digit number
  return parseInt(timestamp + random.toString().padStart(5, "0")); // Combine and ensure 10 digits
}
function BodyofTenderPage({ contract }) {
  const handleInput = (e) => {
    const input = e.target;
    input.value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  };

  const currentDate = new Date();

  const deployContract = async (e) => {
    e.preventDefault();
    try {
      const tenderid = generateTenderId();
      const dateTimeString = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const title = document.querySelector("#Title").value;
      const details = document.querySelector("#Details").value;

      const startDate = getDateTime(
        "#startYYYY",
        "#startMM",
        "#startDD",
        "#StartTimeHrs",
        "#StartTimeMins"
      );
      const lastDate = getDateTime(
        "#LastYYYY",
        "#LastMM",
        "#LastDD",
        "#LastTimeHrs",
        "#LastTimeMins"
      );
      const bidOpeningDate = getDateTime(
        "#BiddingYYYY",
        "#BiddingMM",
        "#BiddingDD",
        "#BiddingTimeHrs",
        "#BiddingTimeMins"
      );

      const organisationName =
        document.querySelector("#OrganisationName").value;

      const status =
        startDate <= new Date() && lastDate >= new Date()
          ? "Active"
          : "Inactive";

      const MinimumBiddingAmount = document.querySelector(
        "#MinimumBiddingAmount"
      ).value;

      const transaction = await contract.deployContract(
        tenderid.toString(),
        title.toString(),
        status.toString(),
        details.toString(),
        dateTimeString.toString(),
        startDate.toString(),
        lastDate.toString(),
        bidOpeningDate.toString(),
        MinimumBiddingAmount.toString(),
        organisationName.toString()
      );
      await transaction.wait();
    } catch (error) {
      console.error(error);
      document.querySelector(
        "#result"
      ).innerHTML = `<h3>Error: ${error.message}</h3>`;
    }
  };

  const getDateTime = (yearId, monthId, dayId, hourId, minuteId) => {
    const year = document.querySelector(yearId).value;
    const month = document.querySelector(monthId).value; // Months are zero-based
    const day = document.querySelector(dayId).value;
    const hour = document.querySelector(hourId).value;
    const minute = document.querySelector(minuteId).value;
    const temp = new Date(year, month, day, hour, minute);
    return temp.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="tenderinput">
      <div
        className="container"
        style={{
          backgroundColor: "#e5e5e5",
          padding: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={deployContract} action="/temp">
          <div className="row">
            <h4>Title of the Project</h4>
            <div className="input-group input-group-icon">
              <input
                id="Title"
                type="text"
                placeholder="Title of the Project"
                style={{ borderRadius: "10px" }}
                required
                autoComplete="off"
              />
              <div className="input-icon">
                <i className="fa fa-user" style={{ marginLeft: "15px" }}></i>
              </div>
            </div>
            <h4>Discription</h4>
            <div
              className="input-group input-group-icon"
              style={{ position: "relative" }}
            >
              <input
                id="Details"
                type="text"
                className="form-control"
                placeholder="Description of the Project"
                style={{
                  borderRadius: "10px",
                  // paddingLeft: "50px", // Increased paddingLeft to accommodate the icon
                  textIndent: "30px",
                  height: "100px",
                }}
                required
                autoComplete="off"
              />
              <div
                className="input-icon"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  marginLeft: "17px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "15px",
                }}
              >
                <i
                  className="fa-solid fa-info"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </div>
            </div>

            <div className="col-half">
              <h4>Start Date</h4>
              <div className="input-group">
                <div className="col-third">
                  <input
                    id="startDD"
                    type="text"
                    placeholder="DD"
                    style={{ marginRight: "10px" }}
                    maxLength="2"
                    onInput={handleInput}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="col-third">
                  <input
                    id="startMM"
                    type="text"
                    placeholder="MM"
                    style={{ marginRight: "10px" }}
                    maxLength="2"
                    onInput={handleInput}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="col-third">
                  <input
                    id="startYYYY"
                    type="text"
                    placeholder="YYYY"
                    maxLength="4"
                    onInput={handleInput}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="col-half">
              <h5>Start Time</h5>
              <div className="input-group">
                <div className="col-third">
                  <input
                    id="StartTimeHrs"
                    type="text"
                    placeholder="Hrs"
                    style={{ marginRight: "10px" }}
                    maxLength="2"
                    onInput={handleInput}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="col-third">
                  <input
                    id="StartTimeMins"
                    type="text"
                    placeholder="Mins"
                    style={{ marginRight: "10px" }}
                    maxLength="2"
                    onInput={handleInput}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-half">
            <h4>Last Date</h4>
            <div className="input-group">
              <div className="col-third">
                <input
                  id="LastDD"
                  type="text"
                  placeholder="DD"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="col-third">
                <input
                  id="LastMM"
                  type="text"
                  placeholder="MM"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="col-third">
                <input
                  id="LastYYYY"
                  type="text"
                  placeholder="YYYY"
                  maxLength="4"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="col-half">
            <h5>Last Time</h5>
            <div className="input-group">
              <div className="col-third">
                <input
                  id="LastTimeHrs"
                  type="text"
                  placeholder="Hrs"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="col-third">
                <input
                  id="LastTimeMins"
                  type="text"
                  placeholder="Mins"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="col-half">
            <h4>Bidding Date</h4>
            <div className="input-group">
              <div className="col-third">
                <input
                  id="BiddingDD"
                  type="text"
                  placeholder="DD"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="col-third">
                <input
                  id="BiddingMM"
                  type="text"
                  placeholder="MM"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="col-third">
                <input
                  id="BiddingYYYY"
                  type="text"
                  placeholder="YYYY"
                  maxLength="4"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="col-half">
            <h5>Bidding Time</h5>
            <div className="input-group">
              <div className="col-third">
                <input
                  id="BiddingTimeHrs"
                  type="text"
                  placeholder="Hrs"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="col-third">
                <input
                  id="BiddingTimeMins"
                  type="text"
                  placeholder="Mins"
                  style={{ marginRight: "10px" }}
                  maxLength="2"
                  onInput={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-half">
              <h4>Minimum Bidding Amount</h4>
              <div className="input-group">
                <input
                  id="MinimumBiddingAmount"
                  type="Number"
                  placeholder="₹"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-half">
              <h4>Organisation Name</h4>
              <div className="input-group">
                <input
                  id="OrganisationName"
                  type="text"
                  placeholder="Organisation Name"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <h4>Terms and Conditions</h4>
            <div className="input-group">
              <input
                type="checkbox"
                id="terms"
                required
                autoComplete="off"
                style={{ marginRight: "1%" }}
              />
              <label htmlFor="terms">
                I acknowledge that I have read the privacy policy and that I
                agree to the terms and conditions set out by Organization Name
                for this service.
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-warning">
            Deploy Contract
          </button>
          <div id="result"></div>
        </form>
      </div>
    </div>
  );
}

export default BodyofTenderPage;
