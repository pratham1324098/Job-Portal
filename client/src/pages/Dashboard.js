import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import "../styles/Dashboard.css";
import JobDetailsForm from "../components/shared/JobDetailsForm";

const Dashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form data submitted:');
    // closeModal(); // Close the modal after submission (you can adjust this as needed)
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/v1/job/get-job", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        user: {
          userId: localStorage.getItem("userId"),
        },
      });
      setTotalJobs(res.data.totalJobs);
    } catch (error) {
      console.error("Error fetching total jobs: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFormVisible]);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  return (
    <Layout>
      <div className="container">
        <h1>User Dashboard</h1>
          <h1>Start Your amazing journey for your future with us.</h1>
        <div className="container_1">
          <p className="container_1_job">Total Jobs <br /> {totalJobs}</p>
          <p className="container_1_user">Wanna Hire Add Job <br />
          <button className="custom-button" onClick={openForm}>
            +
          </button>
          {isFormVisible && (
            <div className="overlay">
              <div className="popup-form">
                <JobDetailsForm onClose={closeForm} onSubmit={handleSubmit} />
              </div>
            </div>
          )}
          </p>
        </div>
      </div>
      
    </Layout>
  );
};

export default Dashboard;
