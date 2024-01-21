import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
function Updateuser() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    const handleUpdateUser = async () => {
      try {
        const res = await axios.put(
          "/api/v1/user/update-user",
          {
            userId: localStorage.getItem("userId"),
            name,lastName,email,location
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error in handling update", error);
        // Handle error appropriately
      }
    };
    

    return (
        <Layout >
            <div >
            <h2>Update Your Profile</h2>
    <form>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" class="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" class="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <button type="button" class="btn btn-primary" onClick={handleUpdateUser} style={{marginTop:"10px",textAlign:"center",justifyContent:"center"}}>
        Update User
      </button>
    </form>
            </div>
        </Layout>
    );
}

export default Updateuser;