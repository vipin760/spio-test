import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { showMessage } from "app/store/fuse/messageSlice";
import { logoutUser, selectUser, setUser } from "app/store/userSlice";
import jwtService from "./services/jwtService";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    jwtService.on("onAutoLogin", () => {
      dispatch(showMessage({ message: "Signing in with JWT" }));
      // success(user, 'Signed in with JWT');
      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, "Signed in with JWT");
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on("onSignup", (msg) => {
      dispatch(showMessage({ message: msg }));
      //success(user, 'Signed in');
    });
    jwtService.on("generateOtp", (msg) => {
      dispatch(showMessage({ message: msg }));
      //success(user, 'Signed in');
    });
    jwtService.on("onLogin", () => {
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, "Signed in with JWT");
        })
        .catch((error) => {
          pass(error.message);
        });
      //success(user, 'Signed in');
    });

    jwtService.on("onLogout", () => {
      pass("Signed out");
      localStorage.removeItem("institutionMasterId")
      localStorage.removeItem("institutionBranchId")
      dispatch(logoutUser());
    });

    jwtService.on("onNoGateway", () => {
      pass("Gateway Not Found");
      dispatch(logoutUser());
    });

    jwtService.on("onAutoLogout", (message) => {
      pass(message);
      dispatch(logoutUser());
    });

    jwtService.on("onNoAccessToken", () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      //console.log("user", user)
      if (message) {
        dispatch(showMessage({ message }));
      }
      //console.log("user", user)

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  // console.log('isAtuth', isAuthenticated)

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
