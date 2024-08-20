import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import authService from "./service/authservice";
import { login, logout } from "./slice/authSlice";
import {Header, Footer} from "./components/index"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return isLoading ? null : 
  <> 
    <Header/>
      <Outlet/>
    <Footer/>
  </>;
}

export default App;
