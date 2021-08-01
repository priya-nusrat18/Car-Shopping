import React from 'react';
import { Card, Col, } from 'react-bootstrap';
import './CarDetails.css'

const CarDetails = (props ) => {
    const {name, img, price,brand, id } =props.car
    const handleClick = props.handleClick;


    // const formatNumber = num => {
    //     const precision =num.toFixed(2);
    //     return Number(precision);
    // }
    return (
        <Col md={4} sm={6}>
            <Card  className='my-3 shadow' >
                <Card.Body>
                    <Card.Img className='img' variant="top" src={img} />
                    <Card.Title >Car Model : <span style={{color:'#D70504', fontSize:'25px !important'}}> {name}</span></Card.Title>
                    <br />
                    <div className="">
                    <h4 className='pt-2 pb-2'>Price : <span> ${price}</span> </h4>
                    <h5>brand : <span style={{color:'#D70504', fontSize:'25px !important'}}> {brand}</span></h5>
                    </div>
                    <button onClick={()=>handleClick(name, id)} className="login-btn mt-2">Buy Now</button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CarDetails;