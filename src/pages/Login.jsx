import { useState } from "react";
import { baseApiUrl } from "../constants/baseApiUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const onGoogleLogin = () => {
  window.location.href = `${baseApiUrl}/oauth2/authorization/google`;
};

const onNaverLogin = () => {
  window.location.href = `${baseApiUrl}/oauth2/authorization/naver`;
};

const onKakaoLogin = () => {
  window.location.href = `${baseApiUrl}/oauth2/authorization/kakao`;
};

export default function Login() {
  const [loginInputData, setLoginInputData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginInputData;
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInputData({
      ...loginInputData,
      [name]: value,
    });
  };

  const login = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    if (password.length < 4) {
      alert("비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    (async () => {
      try {
        const response = await axios.post(
          `${baseApiUrl}/api/v1/auth/login`,
          loginInputData,
          { withCredentials: true },
        );

        console.log("response data: ", response.data);
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        } else {
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
        }
      } catch (error) {
        if (error.response) {
          const { code, msg } = error.response.data;
          alert(`code: ${code}, msg: ${msg}`);
        } else {
          console.log(error);
          alert("로그인 처리 중 문제가 발생했습니다.");
        }
      }
    })();
  };

  return (
    <div
      style={{
        width: "100vw",
        margin: "60px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          paddingTop: "40px",
        }}
      >
        <h3>로그인</h3>
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={onChange}
        />
        <button onClick={login}>로그인</button>
        <button onClick={onGoogleLogin}>Google Login</button>
        <button onClick={onNaverLogin}>Naver Login</button>
        <button onClick={onKakaoLogin}>Kakao Login</button>
      </div>
    </div>
  );
}
