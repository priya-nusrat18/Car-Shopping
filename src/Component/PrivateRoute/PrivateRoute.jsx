
import React , { useContext} from "react";
import { Route , Redirect} from "react-router-dom";
import { UserContext } from '../../App';
const PrivateRoute = ({ children, ...rest }) => {

    const [ loggedInUser] =useContext(UserContext)
    console.log(loggedInUser);
    const {email}= loggedInUser;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
