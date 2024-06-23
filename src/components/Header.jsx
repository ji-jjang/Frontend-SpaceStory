import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import api from "../api/axiosInterceptor";

export default function Header() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    setLogin(!!refreshToken);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/v1/auth/logout", {
        refreshToken: Cookies.get("refreshToken"),
      });
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      setLogin(false);
    } catch (error) {
        if (error.response) {
            const { code, msg } = error.response.data;
            alert(`code: ${code}, msg: ${msg}`);
          } else {
            alert("로그아웃 처리 중 문제가 발생했습니다.");
          }
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#F0EBEB", height: 50 }}>
      <nav style={{ marginLeft: "auto", marginRight: 50 }}>
        <ul>
          {!isLogin ? (
            <>
              <li>
                <a href="/register" style={{ fontSize: 15 }}>
                  회원가입
                </a>
              </li>
              <li>
                <a href="/login" style={{ fontSize: 15 }}>
                  로그인
                </a>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  fontSize: 15,
                  color: "blue",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
