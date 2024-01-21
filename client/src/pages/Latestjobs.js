import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import "./Latestjobs.css"

function Latestjobs() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/v1/job/get-job?page=${currentPage}&skip=${(currentPage - 1) * 10}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          user: {
            userId: localStorage.getItem("userId"),
          },
        });
  
        setTotalPages(res.data.numOfPage);
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching total jobs: ", error);
      }
    };
  
    fetchData();
  }, [currentPage]);
   // Empty dependency array ensures the effect runs only once
  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);
  
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);
  const newJob = {
    _id: 'uniqueId', // You can generate a unique ID for the new job
    createdAt: '2023-03-11T02:05:30.000Z',
    createdBy: '655876c0358d93ec574f6e1c',
    workLocation: 'Peru',
    workType: 'full-time',
    status: 'interview',
    position: 'Assistant Professor',
    company: 'Eabox',
  };
  const handleSearch = async () => {
    try {
      // Add your search logic here
      const res = await axios.get(`/api/v1/job/search?term=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        user: {
          userId: localStorage.getItem('userId'),
        },
      });

      setJobs(res.data.jobs);
    } catch (error) {
      console.error('Error searching jobs: ', error);
    }
  };
  return (
    <Layout>
    <img src="https://c0.wallpaperflare.com/preview/330/490/484/business-office-computer-flatlay.jpg" alt="" width={"100%"} height={"50%"} style={{borderRadius:"30px"}} />
        <h2>Current Opportunities</h2>
      {/* Add Search bar here */}
      <MDBCol md="12">
        <MDBFormInline className="md-form mr-auto mb-4">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MDBBtn gradient="aqua" rounded size="sm" type="button" className="mr-auto" onClick={handleSearch}>
            Search
          </MDBBtn>
        </MDBFormInline>
      </MDBCol>
    <MDBCol md="12">
      <MDBFormInline className="md-form mr-auto mb-4">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
        <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto">
          Search
        </MDBBtn>
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
        <MDBBtn outline color="warning" rounded size="sm" type="submit" className="mr-auto">
          Search
        </MDBBtn>
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
        <MDBBtn color="unique" rounded size="sm" type="submit" className="mr-auto">
          Search
        </MDBBtn>
      </MDBFormInline>
    </MDBCol>


      <div className="container"> {/* Apply the container class */}
        <table className="table"> {/* Apply the table class */}
          <thead className='tableheader'>
            <tr>
              <th>Job #</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Position</th>
              <th>Company</th>
              {/* Add other table headers for additional job details */}
            </tr>
          </thead>
          <tbody>
          {jobs.map((job, index, array) => (
              <tr key={index}>
                {((currentPage - 1) * 10 + index + 1) === 11 ? null : (
                  <>
                    {currentPage < totalPages || index < array.length - 1 ? (
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                    ) : null}
                    <td>{job.workLocation}</td>
                    <td>{job.workType}</td>
                    <td>{job.status}</td>
                    <td>{job.position}</td>
                    <td>{job.company}</td>
                    {/* Add other table cells for additional job details */}
                  </>
                )}
              </tr>
            ))}


            {/* Display the new job */}
            <tr>
              <td>{jobs.length + 1}</td>
              <td>{newJob.workLocation}</td>
              <td>{newJob.workType}</td>
              <td>{newJob.status}</td>
              <td>{newJob.position}</td>
              <td>{newJob.company}</td>
              {/* Add other table cells for additional job details */}
            </tr>
          </tbody>
        </table>
        <div>
            {/* <button onClick={handlePrevPage} style={{borderRadius:"5px",color:"black"}}> */}
              <img onClick={handlePrevPage} src="data:image/png;base64,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" alt="" width={"30px"} style={{padding:"0px",margin:"0px",borderRadius:"15px",marginRight:"4px"}}/>
            {/* </button> */}
            <span>{currentPage} of {totalPages}</span>
            {/* <button onClick={handleNextPage} style={{borderRadius:"5px",color:"black"}}> */}
              <img onClick={handleNextPage} src="data:image/png;base64,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" alt="" width={"30px"} style={{padding:"0px",margin:"0px",borderRadius:"15px",marginLeft:"4px"}} />
            {/* </button> */}
          </div>
      </div>
    </Layout>
  );
}


export default Latestjobs;
