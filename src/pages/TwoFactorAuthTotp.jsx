import React, { useState } from "react";
import { baseApiUrl } from "../constants/baseApiUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function TwoFactorTotpVerification() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleVerifyCode = () => {
    axios
      .post(
        `${baseApiUrl}/api/v1/auth/login/totp-verification/verify`,
        { code },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
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
          alert("인증 코드 검증 중 문제가 발생했습니다.");
        }
      });
  };

  return (
    <div>
      <h2>Totp 2차 인증을 해주세요 해주세요!</h2>
      <div>
        <label htmlFor="code">Verification Code:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button onClick={handleVerifyCode}>Verify Code</button>
    </div>
  );
}
