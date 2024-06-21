import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SocialLoginHandler from "./pages/SocialLoginHandler";
import HelloComponent from "./pages/HelloPage";

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
    element: <div>register</div>,
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
