import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { slug } = useParams();
  const [cars, setCars] = useState([]);
  const [singleCarItem, setSingleCarItem] = useState(null);

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
      setSingleCarItem(foundCar);
    }
  },[cars, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <>
    {singleCarItem ?(
    <Helmet title={singleCarItem.title}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imageurl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.title}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                   Rs.{singleCarItem.price}.00 / Day
                  </h6>
                </div>

                <p className="section__description">
                  {singleCarItem.overview}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.brand}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.transmisson}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.fulecom}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  {/* <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.gps}
                  </span> */}

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.capacity}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.fuel}
                  </span>
                </div>
              </div>
            </Col>

            {/* <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
    ):( <h1>Car Not Found</h1>
    )}
    </>
  );
};

export default CarDetails;
