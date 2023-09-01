import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";

export const AuthGuard = (props) => {
  const { children } = props;
  //const { isAuthenticated } = useAuthContext();
  const [checked, setChecked] = useState(false);
  let location= useLocation();
    const { isLoggedIn , user } = useSelector((state) => state.auth);
  
    const navigate = useNavigate();
    const ignore = useRef(false);

  
  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(
    () => {
      if (ignore.current) {
        return;
      }
      ignore.current = true;

      if (!isLoggedIn) {
        console.log('Not authenticated, redirecting');
        navigate('/login');   
      } else {
        console.log(' authenticated, children1',user);

        setChecked(true);
      }
    },
    [location]
  );

  if (!checked) {
    console.log(' authenticated, children2');
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.
  console.log(' authenticated, children3');

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
