import React from "react";
import api from "../api/axiosInterceptor";

const HelloPage = () => {
  const handleGetRequest = async () => {
    try {
      const response = await api.get("/api/v1/hello");
      console.log("GET response:", response.data);
    } catch (error) {
      console.error("GET request failed:", error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await api.post("/api/v1/hello", {
        message: "Hello, world!",
      });
      console.log("POST response:", response.data);
    } catch (error) {
      console.error("POST request failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGetRequest}>GET /api/v1/hello</button>
      <button onClick={handlePostRequest}>POST /api/v1/hello</button>
    </div>
  );
};

export default HelloPage;
