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
          if (error.response) {
            const { code, msg } = error.response.data;
            alert(`code: ${code}, msg: ${msg}`);
          } else {
            console.log(error);
            alert("OAuth2.0 로그인 처리 중 문제가 발생했습니다.");
          }
        });
    }
  }, [location]);
}
