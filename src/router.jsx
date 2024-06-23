import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import HelloComponent from "./pages/HelloPage";
import Register from "./pages/Register";
import Header from "./components/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <HelloComponent />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/social_login_handler",
    element: (
      <>
        <SocialLoginHandler />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
]);

export default router;
