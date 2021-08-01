import React, { useContext }  from 'react';
import {  Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import fakeData from '../../FakeData/data.json'
import CarDetails from '../CarDetails/CarDetails';
import  {useHistory} from 'react-router-dom'
import { UserContext } from '../../App';

const Home = () => {
    const [carInfo , setCarInfo] = useContext(UserContext)
    let carNewInfo = {...carInfo}
    let history = useHistory ()
    const handleClick = (name, id ) => {
        history.push( `/info/${name}/${id}`)
        carNewInfo.name = name;
        carNewInfo.id = id;
        setCarInfo(carNewInfo)
    }
    console.log(carInfo);
    return (
        <div style={{backgroundColor:'#fafafa', minHeight:'100vh'}}>
            <Header></Header>
            <Container>
            <Row>
            {
                fakeData.map( car => <CarDetails handleClick={handleClick} car={car} key={car.id}></CarDetails>)
            }
            </Row>
            </Container>
        </div>
    );
};

export default Home;