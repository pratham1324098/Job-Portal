import React, { useState } from "react";
import axios from "axios";

const JobDetailsForm = ({ onClose }) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workType, setWorkType] = useState(""); // Added workType state
  const [workLocation, setWorkLocation] = useState(""); // Added workLocation state

  const handleSubmit = async () => {
    // Validate form fields if needed
    if (!company || !position || !workType || !workLocation) {
       alert("Please Provide all Fields")
      return;
    }

    // Form data
    const formData = {
      company: company,
      position: position,
      workType: workType, // Added workType
      workLocation: workLocation, // Added workLocation
      createdBy: localStorage.getItem("userId"), // Added createdBy
    };

    try {
      // Make a POST request to your server
      const response = await axios.post("/api/v1/job/create-job", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Handle the response as needed
      console.log("Job created:", response.data.job);
    } catch (error) {
      // Handle errors
      console.error("Error creating job:", error.response.data.message);
    }

    // Close the form
    onClose();
  };

  return (
    <div className="job-details-form-container">
      <div className="job-details-form">
        <h2>Add Job Details</h2>
        <form style={{ borderRadius: "10px" }}>
          <div style={{ borderRadius: "10px", display: "flex", flexDirection: "column", marginBottom: "10px" }}>
            <label>
              Company:
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "12px" }}
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "12px" }}
              />
            </label>
            {/* Added workType and workLocation input fields */}
            <label>
              Work Type:
              <input
                type="text"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "12px" }}
              />
            </label>
            <label>
              Work Location:
              <input
                type="text"
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "12px" }}
              />
            </label>
          </div>
          {/* Add more form fields as needed */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#ddd",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "12px",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "12px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobDetailsForm;
