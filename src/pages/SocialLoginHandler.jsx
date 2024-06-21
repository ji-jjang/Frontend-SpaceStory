import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInterceptor";
import Cookies from "js-cookie";

export default function SocialLoginHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isSocialLoginSuccess = searchParams.get("social_login") === "success";

    if (isSocialLoginSuccess) {
      console.log(isSocialLoginSuccess);
      api
        .get("/api/v1/auth/tokens-by-cookie", {
          withCredentials: true,
        })
        .then((response) => {
          const { accessToken, refreshToken } = response.data;

          Cookies.set("accessToken", accessToken, {
            secure: true,
            sameSite: "Strict",
          });
          Cookies.set("refreshToken", refreshToken, {
            secure: true,
            sameSite: "Strict",
          });

          navigate("/");
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your axios operation:",
            error,
          );
        });
    }
  }, [location]);
}
