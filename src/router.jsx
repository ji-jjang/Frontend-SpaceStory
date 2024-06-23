import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import HelloComponent from "./pages/HelloPage";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div>Hello~!</div>
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
  {
    path: "/hello",
    element: (
      <>
        <HelloComponent />
      </>
    ),
  },
]);

export default router;
