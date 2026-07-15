import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Context";

const ProtectedLayout = ({ allowedRole }) => {
  const { logged, role, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1093ED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role && role.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
