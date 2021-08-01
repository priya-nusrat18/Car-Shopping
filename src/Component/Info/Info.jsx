import React, { useContext } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import fakeData from "../../FakeData/data.json";
import { useForm } from "react-hook-form";

const Info = () => {
  
  let {id}  = useParams()
  
 var  uid = parseInt(id)
    let history = useHistory()
  const [carInfo, setCarInfo] = useContext(UserContext);
  let { name, price, brand } = carInfo;
   

  const findCar = fakeData.find((car) => car.id === uid);

  let img = findCar?.img;
  brand = findCar?.brand;
  price = findCar?.price;
  name = findCar?.name;
  console.log(name , id);

 
  // const handleCheckOut =  (name, id) => {
  //   history.push( `/checkout/${name}/${id}`)
  //   }
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    const buyerInfo  ={...carInfo};
    console.log(buyerInfo);
    buyerInfo.buyerName = data.buyerName;
    buyerInfo.address = data.address;
    buyerInfo.zilla = data.zilla;
    buyerInfo.email = data.email;
    setCarInfo(buyerInfo);
    history.push( `/checkout/${name}/${id}`)

  };
  console.log(carInfo);
  return (
    <div>
      <Header />

      <Container>
        <Row>
          <Col md={4} sm={6}>
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
                  <h4 className="pt-3  pb-2">
                    Price :  <span> $ {price}</span>{" "}
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
          <Col md={{ span: 7, offset: 1 }} sm={6}>
            <form className="p-5 mt-3 shadow" style={{backgroundColor:'#fafafa'}} onSubmit={handleSubmit(onSubmit)}>
            <h1>
              {" "}
              To Confrim Order For{" "}
              <span
                style={{
                  color: "#D70504",
                  fontSize: "25px !important",
                  paddingRight: "5px",
                }}
              >
                {" "}
                {name}
              </span>
              Please Fill Up:
            </h1>
            <br />
              <input
              name='buyerName'
              className='form-control'
              placeholder="Your Name"
                {...register("buyerName", { required: true})}
              />
              {errors.buyerName && <span className='text-danger'>Name is required</span>}
              <br />
              <input
              name='address'
              className='form-control'
              placeholder="Your Address"
                {...register("address", { required: true})}
              />
              {errors.address && <span className='text-danger'>Address is required</span>}
              <br />
              <input
              name='zilla'
              className='form-control'
              placeholder="Your Zilla"
                {...register("zilla", { required: true})}
              />
              {errors.zilla && <span className='text-danger'>Zilla is required</span>}
              <br />
              <input name='email' className='form-control'  placeholder="Your Email" {...register("email", { required: true,  pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} />
              
              {errors.email && errors.email.type === "required" && <span  className='text-danger'>Email is required</span>}
      {errors.email && errors.email.type === "pattern" && <span  className='text-danger'>Please , type correct email address !</span> }
              
              
              <br />
              <input className='login-btn' type="submit" value='Checkout'  />
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Info;
