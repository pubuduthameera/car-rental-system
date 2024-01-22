import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import "../styles/booking-form.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormData } from "../assets/data/reduxStore";
import Loginheder from "../components/Header/Loginheder";
import { toast } from "react-toastify";

const Rentcar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [cars, setCars] = useState([]);
  const [carid, setCarid] = useState("");
  const [carurl, setcarutl] = useState("");
  const [cartitle, setcartitle] = useState("");
  const [fuel, setfuel] = useState("");
  const [carprice, setCarprice] = useState("");
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [whologedin,setWhologedin]=useState('');
  const [useremil,setUseremil]=useState('');

  axios.defaults.withCredentials = true;
useEffect(()=>{
  axios.get('http://localhost:5001')
  .then(responce =>{
if (responce.data.valid) {
  setWhologedin(responce.data.userid);
setUseremil(responce.data.email);
}else{
  window.location.href='/';
}
  })
  .catch(err=> console.log(err));
},[])

  useEffect(() => {
    async function fetchdata() {
      {
        const response = await axios.get("http://localhost:5001/getcars");
        setCars(response.data);
      }
    }
    fetchdata();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      const foundCar = cars.find((item) => item.title === slug);
      if (foundCar) {
        setCarid(foundCar._id);
        setcartitle(foundCar.title);
        setcarutl(foundCar.imageurl);
        setCarprice(foundCar.price);
        setfuel(foundCar.fuel)
      }
      setSingleCarItem(foundCar);
    }
  }, [cars, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  {
    /*********************** set booking************* */
  }
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [carname, setCarname] = useState("");
  const [price, setPrice] = useState(0);
  const [carId, setCarId] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cal, setcal] = useState("");
  const [stripetoken, setStripeToken] = useState("");

  useEffect(() => {
    const calculteprice = () => {
      const returnDateTimestamp = new Date(returnDate);
      const pickupDateTimestamp = new Date(pickupDate);
      const calculate =
        (carprice * (returnDateTimestamp - pickupDateTimestamp)) /
        (1000 * 3600 * 24);
      if (calculate <= 0) {
        setcal(carprice);
      } else {
        setcal(calculate);
      }
    };
    calculteprice();
  }, [carprice, returnDate, pickupDate]);


  function onToken(token) {
    setStripeToken(token);
    console.log(token);
  }

  const paynow = async (token) => {
    try {
      const response = await axios.post("http://localhost:5001/booking", {
        carname: cartitle,
        price: carprice,
        totalprice: cal,
        carid: carid,
        pickupdate: pickupDate,
        returndate: returnDate,
        token,
        userid:whologedin
      });
      if (response.data.success) {
        toast.success('Booking is Successfuly');
         navigate("/book");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Loginheder/>
      <div className="container py-4 py-xl-5">
        <div className="row gy-4 gy-md-0">
          <div className="col-md-6">
            <div className="p-xl-5 m-xl-5">
              <img
                className="rounded img-fluid w-100 fit-cover"
                style={{ minHeight: 300, boxShadow: "inset 0px 0px 2px" }}
                src={carurl}
              />
            </div>
          </div>
          <div
            className="col-md-6 offset-lg-0 d-md-flex align-items-md-center"
            style={{ textAlign: "justify" }}
          >
            <div style={{ maxWidth: 350 }}>
              {/* <h2
                className="text-uppercase fw-bold"
                style={{ textAlign: "center" }}
              >
                Car Info
              </h2>
              <p style={{ textAlign: "right", marginBottom: 5 }}>{cartitle}</p>
              <p style={{ textAlign: "right", marginBottom: 8 }}>
                {carprice}
              </p>
              <p style={{ textAlign: "right", marginBottom: 8 }}>{fuel}</p>
              <p style={{ textAlign: "right", marginBottom: 8 }}>car name</p> */}
              <h2
                className="text-uppercase fw-bold"
                style={{
                  textAlign: "center",
                  fontSize: "24.128px",
                  width: 350,
                }}
              >
                select pickdate and return date
              </h2>
              <span
                className="d-inline-block float-start"
                style={{ marginTop: 0, marginLeft: 95 }}
              >
                pickup date
              </span>
              <input
                className="d-inline-block float-end"
                type="date"
                onChange={(e)=>{setPickupDate(e.target.value)}}
                style={{ marginLeft: 0, marginTop: 0 }}
                required
              />
              <span
                className="d-inline-block float-start d-lg-flex justify-content-lg-end"
                style={{ marginTop: 15, marginLeft: 95 }}
              >
                return date
              </span>
              <input
                className="d-inline-block float-end d-lg-flex justify-content-lg-end"
                type="date"
                onChange={(e)=>{setReturnDate(e.target.value)}}
                style={{ marginLeft: 0, marginTop: 10 }}
                required
              />
              <p className="d-inline-block float-start d-lg-flex justify-content-lg-end" style={{ marginTop: 15, marginLeft: 95 }}>car price</p>
              <p className="d-inline-block float-start d-lg-flex justify-content-lg-end"style={{ marginTop: 18, marginLeft: 95 }}>{cal}</p>
              <StripeCheckout
        token={paynow}
        stripeKey="pk_test_51NDJfNGAfkP5ELsBcv5jJUqqHsH1wvx9OacdGtIFUMVtupTSAPuIpnoBRx92cWSlwcfxzqQgXB3pz4Mu3PZHgeK900nqaSoExo"
        amount={cal*100}
        currency="lkr"
        email={useremil}
      >
        <button className="btn btn-primary  me-md-2 justify-content-md-end">Book Now</button>
      </StripeCheckout>
            </div>
          </div>
        </div>

      </div>
     
    </>
  );
};

export default Rentcar;
