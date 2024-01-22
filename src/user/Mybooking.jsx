import React, { useState, useEffect } from "react";
import "../styles/Mybooking.css";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import Loginheder from "../components/Header/Loginheder";
import { Height } from "@mui/icons-material";

const Mybooking = () => {
  const [booking, setBooking] = useState([]);
  const [whologedin, setWhologedin] = useState("");
  const [useremil, setUseremil] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    
    axios
      .get("http://localhost:5001")
      .then((response) => {
        if (response.data.valid) {
          setWhologedin(response.data.userid);
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("http://localhost:5001/getbooking");
        const filteredBookings = response.data.filter(
          (item) => item.user._id === whologedin
        );
        setBooking(filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    if (whologedin) {
      fetchBookings();
    }
  }, [whologedin]);

  return (
    <>
      <Loginheder />
      <div className="qw">
        <Sidebar />

        <div className="">
          <div className="">
            <div className="">
              <div className="profile_wrap">
                <h5 className="uppercase underline">My Bookings </h5>
                <div className="my_vehicles_list">
                  <ul className="vehicle_listing">
                    {booking.map((item) => (
                      <li key={item._id}>
                        <div className="vehicle_img"></div>
                        <div className="vehicle_title">
                          
                          <div style={{display:'flex'}}>
                            <div>
                              <img
                                height={100}
                                width={250}
                                src={item.car.imageurl}
                                alt="image"
                              />
                            </div>
                            <div style={{margin:'10px'}}>
                              <p>
                                <b>From Date:</b>
                                {item.pickupdate}
                                <br />
                                <b>To Date:</b>
                                {item.returndate}
                                <br />
                                <b>Setle Payment:</b>
                                {item.fullpay==='pending'?(
                                  <span className="text-primary fw-bold text-uppercase p-2">{item.fullpay}</span>
                                ):
                                  <span className="text-success fw-bold text-uppercase p-2">{item.fullpay}</span>
                                }
                                
                               
                              </p>
                            </div>
                          </div>
                        </div>
                        
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mybooking;
