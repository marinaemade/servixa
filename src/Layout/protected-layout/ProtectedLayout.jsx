import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/Context'

const ProtectedLayout = ({ allowedRole }) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />

  return <Outlet />
}

export default ProtectedLayout