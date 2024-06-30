import React from "react";
import api from "../api/axiosInterceptor";
import { useState } from "react";

const HelloPage = () => {

  const [qrCode, setQrCode] = useState(null);

  const handleGetRequest = async () => {
    try {
      const response = await api.get("/api/v1/hello");
      console.log("GET response:", response.data);
    } catch (error) {
      if (error.response) {
        const { code, msg } = error.response.data;
        alert(`code: ${code}, msg: ${msg}`);
      } else {
        alert("Get Hello 처리 중 문제가 발생했습니다.");
      }
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await api.post("/api/v1/hello");
      console.log("POST response:", response.data);
    } catch (error) {
      if (error.response) {
        const { code, msg } = error.response.data;
        alert(`code: ${code}, msg: ${msg}`);
      } else {
        console.log(error);
        alert("Post Hello 처리 중 문제가 발생했습니다.");
      }
    }
  };

  const getQrCode = async () => {
    try {
      const response = await api.post("/api/v1/auth/totp-verification/qr", {
        email: "jinyhehe@gmail.com",
      });
      setQrCode(response.data);
    } catch (error) {
      if (error.response) {
        const { code, msg } = error.response.data;
        alert(`code: ${code}, msg: ${msg}`);
      } else {
        console.log(error);
        alert("QR코드 생성 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <button onClick={handleGetRequest}>GET /api/v1/hello</button>
      <button onClick={handlePostRequest}>POST /api/v1/hello</button>
      <button onClick={getQrCode}>Activate TOTP</button>
      {qrCode && <img src={qrCode} alt="TOTP QR Code" />}
    </div>
  );
};

export default HelloPage;
