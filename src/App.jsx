import { AuthContext } from "./context/Context";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Main-Layout/MainLayout";
import AuthLayout from "./Layout/auth-layout/AuthLayout";
import ClientLayout from "./Layout/client-layout/ClientLayout";
import WorkerLayout from "./Layout/Worker-Layout/WorkerLayout";
import AdminLayout from "./Layout/Admin-Layout/AdminLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import NotFound from "./pages/notFound/NotFound";
import ClientProfile from "./pages/client/Client-Profile/ClientProfile";
import Settings from "./pages/client/Settings/Settings";
import Earnings from "./pages/worker/Earnings/Earnings";
import WorkerProfile from "./pages/worker/Worker-Profile/WorkerProfile";
import Overview from "./pages/admin/Overview/Overview";
import Users from "./pages/admin/Users/Users";
import AccountType from './pages/signup/AccountType';
import PersonalInfo from './pages/signup/PersonalInfo';
import Verification from './pages/signup/Verification';
import EmailVerification from './pages/signup/EmailVerification';
import ScopeOfWork from './pages/signup/ScopeOfWork';
import LastStep from './pages/signup/LastStep';
import ProtectedLayout from "./Layout/protected-layout/ProtectedLayout";

const App = () => {
  return (
    <AuthContext>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/EmailVerification" element={<EmailVerification />} />
          <Route path="/ScopeOfWork" element={<ScopeOfWork />} />
          <Route path="/LastStep" element={<LastStep />} />

        </Route>

        {/* CHANGED: wrapped with ProtectedLayout */}
        <Route element={<ProtectedLayout allowedRole="client" />}>
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<ProtectedLayout allowedRole="worker" />}>
          <Route path="/worker" element={<WorkerLayout />}>
            <Route index element={<WorkerProfile />} />
            <Route path="earnings" element={<Earnings />} />
          </Route>
        </Route>

        <Route element={<ProtectedLayout allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext>
  );
};

export default App;
