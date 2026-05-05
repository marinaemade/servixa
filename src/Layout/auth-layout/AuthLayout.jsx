import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/Context'

const AuthLayout = () => {
  const { user } = useAuth()

  // Already logged in? send them home
  if (user) return <Navigate to="/" replace />

  return <Outlet />
}
export default AuthLayout