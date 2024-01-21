import React, { useCallback, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.css"
import {Link} from "react-router-dom"
function Profile() {
  const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const getUser = useCallback(async () => {
        try {
          dispatch(showLoading());
          
          const { data } = await axios.get("/api/v1/user/getUser", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            user: {
              userId: localStorage.getItem("userId"),
            },
          });
          dispatch(hideLoading());
          if (data.success) {
            dispatch(setUser(data.data));
          } else {
            localStorage.clear();
            <Navigate to="/login" />;
          }
        } catch (error) {
          localStorage.clear();
          dispatch(hideLoading());
          console.log(error);
        }
      },[dispatch]);
      useEffect(() => {
        const fetchData = async () => {
          if (!user) {
            await getUser();
          }
        };
      
        fetchData();
      
        // Include `getUser` and `user` in the dependency array
      }, [getUser,user]);
  return (
    <>
    <Layout>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <Link to="/updateUser">
                  <MDBIcon far icon="edit mb-5" />
                  </Link>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">About</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Location</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">{user.location}</MDBTypography>
                        {/* <MDBCardText className="text-muted">info@example.com</MDBCardText> */}
                      </MDBCol>
                      {/* <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol> */}
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
            
    </Layout>
    </>
  )
}

export default Profile