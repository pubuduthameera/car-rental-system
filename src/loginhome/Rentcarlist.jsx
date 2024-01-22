import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import axios from 'axios';
import Loginheder from '../components/Header/Loginheder';

const Rentcar = () => {
  const [cars, setCars] = useState([]);
  const [whologedin,setWhologedin]=useState('');

  axios.defaults.withCredentials = true;
useEffect(()=>{
  axios.get('http://localhost:5001')
  .then(responce =>{
if (responce.data.valid) {
  setWhologedin(responce.data.userid);

}else{
  window.location.href='/';
}
  })
  .catch(err=> console.log(err));
},[])

  useEffect(()=>{
    async function fetchdata() {
   {
            const response= await axios.get('http://localhost:5001/getcars');
            setCars(response.data);
        }
    }
    fetchdata();
},[])

  return (
    <>
    <Loginheder/>
    <Helmet title="Cars">
    <CommonSection title="Availibal Car Listing" />

    <section>
<div class="container">
  <div class="row">
    {cars.map((item) => (
      <div class="col-lg-4 col-md-4 col-sm-6 mb-5" key={item._id}>
        <div class="car__item">
          <div class="car__img">
            <img src={item.imageurl} alt="" class="w-100" />
          </div>

          <div class="car__item-content mt-4">
            <h4 class="section__title text-center">{item.title}</h4>
            <h6 class="rent__price text-center mt-">
            {item.price}.00 <span>/ Day</span>
            </h6>

            <div class="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <span class="d-flex align-items-center gap-1">
                <i class="ri-car-line"></i>{item.brand}
              </span>
              <span class="d-flex align-items-center gap-1">
                <i class="ri-settings-2-line"></i>{item.transmisson}
              </span>
              <span class="d-flex align-items-center gap-1">
                <i class="ri-timer-flash-line"></i>{item.fulecom}
              </span>
            </div>

            <button class="w-50 car__item-btn car__btn-rent">
            <Link to={`/rent/${item.title}`}>Rent</Link>
            </button> 

            <button class="w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${item.title}`}>Details</Link>
            </button>
          </div>
        </div>
      </div>
    ))}

  </div>
</div>
</section>
</Helmet>
</>
  )
}

export default Rentcar
