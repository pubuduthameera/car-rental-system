import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import Rentcar from "../loginhome/Rentcarlist";

import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import axios from "axios";

const CarListing = () => {
const [cardata,setcardata]=useState([])

  useEffect(()=>{
  axios.get('http://localhost:5001/getcarslist')
  .then((response)=> setcardata(response.data))
  .catch((error)=> console.log(error))
  })

  return (
    <>
    <Header/>
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
  <div class="container">
    <div class="row">
      {/* <div class="col-lg-12">
        <div class="d-flex align-items-center gap-3 mb-5">
          <span class="d-flex align-items-center gap-2">
            <i class="ri-sort-asc"></i> Sort By
          </span>

          <select>
            <option>Select</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div> */}

      {cardata.map((item) => (
        <div class="col-lg-4 col-md-4 col-sm-6 mb-5">
          <div class="car__item">
            <div class="car__img">
              <img src={item.imageurl} alt="" class="w-100" />
            </div>

            <div class="car__item-content mt-4">
              <h4 class="section__title text-center">{item.brand}</h4>
              <h6 class="rent__price text-center mt-">
              {item.price}.00 <span>/ Day</span>
              </h6>

              <div class="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                <span class="d-flex align-items-center gap-1">
                  <i class="ri-car-line"></i>{item.title}
                </span>
                <span class="d-flex align-items-center gap-1">
                  <i class="ri-settings-2-line"></i>{item.transmisson}
                </span>
                <span class="d-flex align-items-center gap-1">
                  <i class="ri-timer-flash-line"></i>{item.fulecom}
                </span>
              </div>

              {/* <button class="w-50 car__item-btn car__btn-rent">
                <a href="/cars/$item['carName']">Rent</a>
              </button>  */}

              <button class="w-100 car__item-btn car__btn-details">
              <Link to={`/cars/${item.title}`}>Details</Link>
              </button>
            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


      {/* <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.map((item) => (
              <Col lg="4" md="4" sm="6" className="mb-5" key={item.id}>
              <div className="car__item">
                <div className="car__img">
                  <img src={item.imgUrl} alt="" className="w-100" />
                </div>
        
                <div className="car__item-content mt-4">
                  <h4 className="section__title text-center">{item.carName}</h4>
                  <h6 className="rent__price text-center mt-">
                    ${item.price}.00 <span>/ Day</span>
                  </h6>
        
                  <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                    <span className=" d-flex align-items-center gap-1">
                      <i class="ri-car-line"></i> {item.model}
                    </span>
                    <span className=" d-flex align-items-center gap-1">
                      <i class="ri-settings-2-line"></i> {item.automatic}
                    </span>
                    <span className=" d-flex align-items-center gap-1">
                      <i class="ri-timer-flash-line"></i> {item.speed}
                    </span>
                  </div>
        
                   <button className=" w-50 car__item-btn car__btn-rent">
                    <Link to={`/cars/${carName}`}>Rent</Link>
                  </button>
        
                  <button className=" w-100 car__item-btn car__btn-details">
                    <Link to={`/cars/${item.carName}`}>Details</Link>
                  </button>
                </div>
              </div>
            </Col>
            ))}
          
          </Row>
        </Container>
      </section>  */}
    </Helmet>
    </>
  );
};

export default CarListing;
