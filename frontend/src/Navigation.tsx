import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import FloatingLayout from "./layouts/FloatingLayout";
import FeedPage from "./pages/Feed";
import LoginPage from "./pages/Login";
import LoginVerifyPage from "./pages/Login/Verify";
import RegisterPage from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ForgotPasswordChangePage from "./pages/ForgotPassword/Change";
import TermsPage from "./pages/Terms";
import UnauthenticatedCatchPage from "./pages/UnauthenticatedCatch";
import AuthenticatedCatchPage from "./pages/AuthenticatedCatch";
import { useSession } from "./context/AuthenticationState";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AccountSettings from "./pages/Settings/Account";
import SecuritySettings from "./pages/Settings/Security";
import DeviceSettings from "./pages/Settings/Devices";
import SettingsLayout from "./pages/Settings/SettingsLayout";
import MainLayout from "./layouts/MainLayout";
import NotificationsPage from "./pages/Notifications";
import NeighborhoodRoute from "./components/NeighborhoodRoute";
import NoNeighborhoodRoute from "./components/NoNeighborhoodRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import AddressPage from "./pages/Neighborhood/Find/Address";

export default function Navigation() {
  const { session } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          Component={session.isLoggedIn ? AuthenticatedLayout : FloatingLayout}
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
        <Route element={<NeighborhoodRoute />}>
          <Route Component={MainLayout}>
            <Route path="/feed" Component={FeedPage} />
            <Route path="/notifications" Component={NotificationsPage} />
          </Route>
        </Route>
        <Route path="/settings" element={<AuthenticatedRoute />}>
          <Route Component={SettingsLayout}>
            <Route
              index
              Component={() => <Navigate to="/settings/account" replace />}
            />
            <Route path="account" Component={AccountSettings} />
            <Route path="security" Component={SecuritySettings} />
            <Route path="devices" Component={DeviceSettings} />
          </Route>
        </Route>
        <Route path="/neighborhood" element={<AuthenticatedRoute />}>
          <Route path="find" element={<NoNeighborhoodRoute />}>
            <Route path="address" Component={AddressPage} />
          </Route>
        </Route>
        <Route
          path="/terms"
          Component={() => <FloatingLayout redirectAuthenticated={false} />}
        >
          <Route index Component={TermsPage} />
        </Route>
        <Route
          path="*"
          Component={session.isLoggedIn ? AuthenticatedLayout : FloatingLayout}
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
