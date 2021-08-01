import React, { useContext } from "react";
import Header from "../Header/Header";
import { Col, Container, Row, Card } from "react-bootstrap";
import { UserContext } from "../../App";
import fakeData from "../../FakeData/data.json";
import "./Checkoout.css";

import Modal from 'react-modal';
import { useParams } from "react-router-dom";

const Checkoout = () => {
  let {id}  = useParams()
  console.log(id);
  var  uid = parseInt(id)
  
  const [carInfo  ] = useContext(UserContext);
  let { brand, buyerName, name, price, zilla, address } = carInfo;

  
  const findCar = fakeData.find((car) => car.id === uid);
  let img = findCar?.img;
  brand = findCar?.brand;
  name = findCar?.name;
  price = findCar?.price;



  const tax = (price / 10).toFixed(2);
  console.log(tax);

  const grandTotal = (price + tax);
  const amount = parseInt(grandTotal);
  const GrandTotal =Math.round(amount)


  


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = 'green';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md={5} sm={6}>
            <Card className="my-3 shadow">
              <Card.Body>
                <Card.Img className="img" variant="top" src={img} />
                <Card.Title>
                  Car Model :{" "}
                  <span
                    style={{ color: "#D70504", fontSize: "25px !important" }}
                  >
                    {" "}
                    {name}
                  </span>
                </Card.Title>
                <br />
                <div className="">
                  <h4 className="pt-2 pb-2">
                    Price : <span> ${price}</span>{" "}
                  </h4>
                  <h5>
                    brand :{" "}
                    <span
                      style={{ color: "#D70504", fontSize: "25px !important" }}
                    >
                      {" "}
                      {brand}
                    </span>
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={7} sm={6}>
            <div
              className="p-5 mt-3 shadow"
              style={{ backgroundColor: "#fafafa" }}
            >
              <h1>
                Dear{" "}
                <span style={{ color: "#D70504", fontSize: "25px !important" }}>
                  {buyerName}
                </span>
                <br />
                Please Confirm Your Order!
              </h1>
              <div className="d-flex ">
                <div className="single-box  uppercase">
                  <h5>Summary</h5>
                  <p>
                    {" "}
                    Name :{" "}
                    <span
                      style={{ color: "#D70504", fontSize: "25px !important" }}
                    >
                      {name}{" "}
                    </span>
                  </p>
                  <p> Order Date : {new Date().toLocaleString() + ""}</p>

                  <p>Sub-total : $ {price}</p>
                  <p>Tax - 10% : ${tax}</p>
                  <h5>Sub-total : ${GrandTotal}</h5>
                </div>
                <div className="single-box  uppercase">
                  <h5>Shipping Address</h5>
                  <p>
                    {" "}
                    {address} , {zilla} <br />
                    Bangladesh
                  </p>
                </div>
              </div>
              <button className='mt-3 login-btn' onClick={openModal}>Place Order</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Congratulations!</h2>
        <p>Your Order Successfully Placed!</p>
        <button  className=" login-btn" onClick={closeModal}>close</button>
     
        
      </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkoout;
