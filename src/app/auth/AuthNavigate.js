import { selectUser } from 'app/store/userSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { User_Roles } from '../globalConstants'

// ----------------------------------------------------------------------

AuthNavigate.propTypes = {}

const hostName = window.location.hostname;
const isCpass = cpasshost.includes(hostName);
const isPortal = portalhost.includes(hostName);


export default function AuthNavigate({ children }) {
  const user = useSelector(selectUser)
console.log('user..............',user)
  if ([User_Roles.Owner].includes(user?.role)) {
    return <Navigate to={'/organizations'} />
  }
  if (isPortal) {
    return <Navigate to={'/dashboard'} />;
  }
  if (isCpass) {
    return <Navigate to={'/dash'} />;
  }
}
