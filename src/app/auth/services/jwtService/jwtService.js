import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";
import { Auth } from "aws-amplify";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import { getCompanies } from "../../../store/companiesSlice";
import history from "@history";

// import { getCompanies, selectCompanies } from "../store/companiesSlice";

/* eslint-disable camelcase */

export const NODE_BASE_URL = process.env.REACT_APP_BASEURL_REVIEWS;
  
class JwtService extends FuseUtils.EventEmitter {
  init() {
    axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
    this.setInterceptors();
    this.handleAuthentication();

    // axios.defaults.headers.common.Authorization = this.getAccessToken()
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      axios.defaults.headers.common.Authorization = access_token;
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };
  generateOtp = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.generateOtp, data).then((response) => {
        if (response.data) {
          //this.setSession(response.data.access_token)
          resolve(response.data);
          this.emit("generateOtp", response.data.response);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
  checkOtp = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.checkOtp, data).then((response) => {
        if (response.data) {
          //this.setSession(response.data.access_token)
          resolve(response.data);
          this.emit("generateOtp", response.data.response);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
  changePassword = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.changePassword, data).then((response) => {
        if (response.data) {
          //this.setSession(response.data.access_token)
          resolve(response.data);
          this.emit("generateOtp", response.data.response);
        } else {
          reject(response.data.error);
        }
      });
    });
  };
  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        // if (response?.statusCode == 200) {
        //   resolve(response.data);
        //   this.emit(
        //     "onSignup",
        //     "Registered Successfully! Verify Email ID & Login to access the portal"
        //   );
        // } else {
        //   resolve(response.data);
        //   this.emit(
        //     "onSignup",
        //     "User already exist!!! "
        //   );
        // }
        if (response.data) {
          //this.setSession(response.data.access_token)
          resolve(response.data);
          this.emit("onSignup", response.data.status);
        } else {
          reject(response.data);
          this.emit("onSignup", "User already exist!!! ");
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password, remember) => {
    const errors = [];
    const params = {
      userName: email,
      password: password,
      remember: remember ? 1 : 0,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.accessToken, params)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("remember", remember ? 1 : 0);
            this.setSession(response.data.token);
            if (response.data.user2faStatus !== 1) {
              this.emit("onLogin");
            }

            resolve(response.data);
          } else {
            errors.push(
              { type: "email", message: "" },
              { type: "password", message: "Invalid Email/Password" }
            );
            reject(errors);
          }
        })
        .catch((error) => {
          errors.push(
            { type: "email", message: "" },
            { type: "password", message: "Invalid Email/Password" }
          );
          reject(errors);
        });
    });
  };
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("gateway");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const logindata = {
        userName: localStorage.getItem("email"),
        password: localStorage?.getItem("password"),
        remember: localStorage?.getItem("remember"),
      };

      axios
        .post(jwtServiceConfig.signIn, {
          userLoginName: localStorage.getItem("email"),
          userLoginPassword: localStorage?.getItem("password"),
          termsAndConditions: localStorage?.getItem("remember"),
        })
        .then((response) => {
          localStorage.setItem(
            "institutionMasterId",
            response?.data?.content?.institutionMasterId
          );
          localStorage.setItem(
            "institutionBranchId",
            response?.data?.content?.institutionBranchId
          );
          localStorage.setItem("userId", response?.data?.content?.userId);
          if (response.data.statusCode == 200) {
            const data = {
              role: "read_only",
              authRole:
                response?.data?.content?.userTypeName === "Super Admin"
                  ? "super_admin"
                  : "admin",
              data: {
                ...response?.data,
                userId: response?.data?.content?.userId,
                institutionMasterId:
                  response?.data?.content?.institutionMasterId,
                userType: response?.data?.content?.userType,
                userTypeName: response?.data?.content?.userTypeName,
                institutionType: response?.data?.content?.institutionType,
                institutionBranchId:
                  response?.data?.content?.institutionBranchId,
                // ...user?.data,
                given_name: response?.data?.content?.userProfileName,
                photoURL: "assets/images/avatars/brian-hughes.jpg",
                settings: {
                  layout: {},
                  theme: {},
                },
                shortcuts: ["apps.calendar", "apps.mailbox", "apps.contacts"],
              },
            };
            //////to check  institution had gateway or not
            if (response?.data?.content?.institutionMasterId) {
              const params = {
                startIndex: 0,
                lastIndex: 0,
                institutionMasterId:
                  response?.data?.content?.institutionMasterId,
              };
              axios
                .post(jwtServiceConfig.companyList, { ...params })
                .then((response) => {
                  if (response?.data?.content.length <= 0) {
                    history.push({ pathname: `/gateway` });
                    // resolve(data);
                  }
                  if (response?.data?.content.length >= 1) {
                    localStorage.removeItem("institutionMasterId");
                    localStorage.removeItem("institutionBranchId");

                    resolve(data);
                    // const loginData = {
                    //   userName: localStorage.getItem("email"),
                    //   password: localStorage?.getItem("password"),
                    //   remember: localStorage?.getItem("remember"),
                    // };
                    // axios
                    //   .post(jwtServiceConfig.accessToken, loginData)
                    //   .then((response) => {

                    //     if (response.data.token) {
                    //       localStorage.setItem("email", email);
                    //       localStorage.setItem("password", password);
                    //       localStorage.setItem("remember", remember ? 1 : 0);
                    //       this.setSession(response.data.token);
                    //       if (response.data.user2faStatus !== 1) {
                    //         this.emit("onLogin");
                    //         resolve(data);
                    //       }

                    //       resolve(response.data);
                    //     } else {
                    //       errors.push(
                    //         { type: "email", message: "" },
                    //         {
                    //           type: "password",
                    //           message: "Invalid Email/Password",
                    //         }
                    //       );
                    //       reject(errors);
                    //     }
                    //   });
                  } else {
                    setTimeout(() => {
                      this.setSession(null);
                      history.push({ pathname: `/sign-in` });
                    }, 90000);
                  }
                });
            }
            // resolve(data);
            // resolve(response.data);
            // this.emit('onLogin', response.data)
          } else {
            reject(response.data.status);
          }
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };
  updateUserGatewayData = (gateWayId) => {
    return axios.get(jwtServiceConfig.gateWayDetails + gateWayId);
  };
  getCompanyListData = (data) => {
    return axios.post(jwtServiceConfig.companyList, data);
  };
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("institutionMasterId");
      localStorage.removeItem("institutionBranchId");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    localStorage.clear()
    window.location.reload()
    // this.setSession(null);
    // this.emit("onLogout", "Logged out");
  };

  gateWayNotFound = () => {
    this.setSession(null);
    this.emit("onNoGateway", "Logged out");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
  getList = (url) => {
    return axios.get(url);
  };
  post = (url, params) => {
    return axios.post(url, params);
  };
}

const instance = new JwtService();

export default instance;