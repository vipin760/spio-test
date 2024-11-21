import SignInPage from "./SignInPage";
import authRoles from "../../auth/authRoles";
import CreateGateway from "./createGateway";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute(props) {
  const hasToken = localStorage.getItem("institutionMasterId");
  let location = useLocation();
  if (!hasToken) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return props.children;
}
function PublicRoute(props) {
  const hasToken = localStorage.getItem("institutionMasterId");
  let location = useLocation();
  if (hasToken) {
    return <Navigate to="/gateway" state={{ from: location }} replace />;
  }
  return props.children;
}

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "sign-in",
      element: (
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      ),
    },
    {
      path: "gateway",
      element: (
        <PrivateRoute>
          <CreateGateway />
        </PrivateRoute>
      ),
    },
  ],
};

export default SignInConfig;
