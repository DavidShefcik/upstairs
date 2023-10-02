import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import UnauthenticatedLayout from "./pages/UnauthenticatedLayout";
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

export default function Navigation() {
  const { session } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        {session.isLoggedIn ? (
          <Route path="/" Component={MainLayout}>
            <Route index Component={HomePage} />
            <Route path="*" Component={AuthenticatedCatchPage} />
          </Route>
        ) : (
          <Route path="/" Component={UnauthenticatedLayout}>
            <Route index Component={() => <Navigate to="/login" />} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/login/verify" Component={LoginVerifyPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="/forgot-password" Component={ForgotPasswordPage} />
            <Route
              path="/forgot-password/change"
              Component={ForgotPasswordChangePage}
            />
            <Route path="*" Component={UnauthenticatedCatchPage} />
          </Route>
        )}
        <Route path="/terms" Component={UnauthenticatedLayout}>
          <Route index Component={TermsPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
