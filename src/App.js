
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Component/Home/Home';
import Info from './Component/Info/Info';
import { createContext, useState } from 'react';
import Checkoout from './Component/Checkoout/Checkoout';
import Login from './Component/Login/LogIn'
import PrivateRoute from './Component/PrivateRoute/PrivateRoute.jsx'
 export const UserContext = createContext();


function App() {
 const [ loggedInUser, setLoggedInUser] = useState({
   
 })
 console.log(loggedInUser);


  const [carInfo, setCarInfo]= useState({
    id:1,
      name:'avanti',
      price:1020284765,
      brand:'ford',
      img:'https://freepngimg.com/thumb/audi/35-red-audi-png-car-image.png'

  })
  return (
  <UserContext.Provider  value={[carInfo, setCarInfo , loggedInUser, setLoggedInUser]}>
    
    <Router>
    {/* <h3>name :{loggedInUser.displayName}</h3> */}
      <Switch>
     
        <Route path="/home">
          
          <Home></Home>
        </Route>
        <PrivateRoute path="/info/:name/:id">
          <Info></Info>
        </PrivateRoute>
        <PrivateRoute path="/checkout/:name/:id">
          <Checkoout></Checkoout>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
  </Router>
  </UserContext.Provider>
  );
}

export default App;
