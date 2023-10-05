import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import LoginVerifyPage from "./pages/Login/Verify";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ForgotPasswordChangePage from "./pages/ForgotPassword/Change";
import TermsPage from "./pages/Terms";
import UnauthenticatedCatchPage from "./pages/UnauthenticatedCatch";
import AuthenticatedCatchPage from "./pages/AuthenticatedCatch";
import { useSession } from "./context/AuthenticationState";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AccountSettings from "./pages/Settings/Account";
import DeviceSettings from "./pages/Settings/Devices";
import SettingsLayout from "./pages/Settings/SettingsLayout";

export default function Navigation() {
  const { session } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          Component={session.isLoggedIn ? MainLayout : UnauthenticatedLayout}
        >
          <Route
            index
            Component={() => (
              <Navigate to={session.isLoggedIn ? "/feed" : "/login"} />
            )}
          />
        </Route>
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/login" Component={LoginPage} />
          <Route path="/login/verify" Component={LoginVerifyPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/forgot-password" Component={ForgotPasswordPage} />
          <Route
            path="/forgot-password/change"
            Component={ForgotPasswordChangePage}
          />
        </Route>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/feed" Component={HomePage} />
          <Route path="/settings" Component={SettingsLayout}>
            <Route
              index
              Component={() => <Navigate to="/settings/account" replace />}
            />
            <Route path="account" Component={AccountSettings} />
            <Route path="devices" Component={DeviceSettings} />
          </Route>
        </Route>
        <Route path="/terms" Component={UnauthenticatedLayout}>
          <Route index Component={TermsPage} />
        </Route>
        <Route
          path="*"
          Component={session.isLoggedIn ? MainLayout : UnauthenticatedLayout}
        >
          <Route
            path="*"
            Component={
              session.isLoggedIn
                ? AuthenticatedCatchPage
                : UnauthenticatedCatchPage
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
